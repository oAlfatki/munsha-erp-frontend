import { useAuth } from '@/core/auth/AuthProvider';
import { canRunCommand } from '@/core/auth/permissions';
import { affectedOwners } from '@/core/query/invalidation';
import { ApiError } from '@/core/api/apiError';
import type { ApplicationProviderProps } from '@/core/types/ApplicationProviderProps';
import type { ApplicationState } from '@/core/types/ApplicationState';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import {
  authAction as authRequest,
  submitStatus as checkSession,
} from '@/features/auth/api/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useBeforeUnload, useBlocker, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
const Context = createContext<ApplicationState>(null!);
export function ApplicationProvider({ children }: ApplicationProviderProps) {
  const routeView = useLocation().pathname;
  const { user } = useAuth();
  const cache = useQueryClient();
  const routerNavigate = useNavigate();
  const [branchId, setBranchId] = useState('');
  const [isEditingDocument, setEditing] = useState(false);
  const editingRef = useRef(false);
  const setEditingDocument = (isValue: boolean) => {
    editingRef.current = isValue;
    setEditing(isValue);
  };
  const retry = useRef<{
    signature: string;
    id: string;
    revision: number;
  } | null>(null);
  const lock = useRef(false);
  const blocker = useBlocker(() => editingRef.current);
  useEffect(() => {
    if (blocker.state === 'blocked') {
      toast.info('احفظ التغييرات أو اختر تراجع قبل الانتقال إلى قسم آخر.');
      blocker.reset();
    }
  }, [blocker]);
  useBeforeUnload(
    useCallback(
      (event) => {
        if (editingRef.current) {
          event.preventDefault();
          event.returnValue = '';
        }
      },
      [isEditingDocument],
    ),
  );
  const refresh = async () => {
    await cache.invalidateQueries({ queryKey: ['erp'], refetchType: 'active' });
  };
  const mutation = useMutation({
    mutationFn: async ({
      data: input,
      id,
      revision: expected,
      action,
    }: {
      type: string;
      data: unknown;
      id: string;
      revision: number;
      action: (
        input: unknown,
        context: {
          id: string;
          revision: number;
        },
      ) => Promise<CommandReceipt>;
    }) => {
      return action(input, { id, revision: expected });
    },
  });
  const runCommand = async <TInput,>(
    type: string,
    input: TInput,
    action: (
      input: TInput,
      context: {
        id: string;
        revision: number;
      },
    ) => Promise<CommandReceipt>,
  ) => {
    if (lock.current || mutation.isPending) return false;
    if (!user || !canRunCommand(user.role, type, input)) {
      toast.error('ليس لهذا الحساب صلاحية تنفيذ العملية');
      return false;
    }
    lock.current = true;
    const signature = JSON.stringify({ type, data: input });
    if (retry.current?.signature !== signature)
      retry.current = {
        signature,
        id: crypto.randomUUID(),
        revision: Math.max(
          0,
          ...cache
            .getQueryCache()
            .findAll({ queryKey: ['erp'], type: 'active' })
            .filter((query) => query.queryKey[3] === user.userId && query.queryKey[4] === user.kind)
            .map(
              (query) =>
                (
                  query.state.data as
                    | {
                        scope?: {
                          revision: number;
                        };
                      }
                    | undefined
                )?.scope?.revision || 0,
            ),
        ),
      };
    try {
      await mutation.mutateAsync({
        type,
        data: input,
        id: retry.current.id,
        revision: retry.current.revision,
        action: (data, context) => action(data as TInput, context),
      });
      retry.current = null;
      const owners = affectedOwners(type);
      await cache.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'erp' && (!owners || owners.includes(String(query.queryKey[1]))),
        refetchType: 'active',
      });
      toast.success('حُفظت العملية');
      return true;
    } catch (e) {
      if (e instanceof ApiError && e.status) {
        retry.current = null;
        if (e.status === 409) await refresh();
      }
      toast.error(e instanceof Error ? e.message : 'تعذر الحفظ');
      return false;
    } finally {
      lock.current = false;
    }
  };
  useEffect(() => {
    if (user?.kind !== 'local') return;
    let last = Date.now();
    let isPending = false;
    const activity = async () => {
      if (isPending || Date.now() - last < 60000) return;
      isPending = true;
      last = Date.now();
      try {
        await authRequest({ action: 'heartbeat' });
      } catch {
        /* Central client updates the session on 401. */
      } finally {
        isPending = false;
      }
    };
    const timer = setInterval(() => {
      void checkSession().catch(() => {});
    }, 60000);
    window.addEventListener('pointerdown', activity);
    window.addEventListener('keydown', activity);
    return () => {
      clearInterval(timer);
      window.removeEventListener('pointerdown', activity);
      window.removeEventListener('keydown', activity);
    };
  }, [user?.kind]);
  const navigate = (view: string) => {
    if (editingRef.current) {
      toast.info('احفظ التغييرات أو اختر تراجع قبل الانتقال إلى قسم آخر.');
      return;
    }
    routerNavigate(view);
  };
  return (
    <Context.Provider
      value={{
        user,
        busy: mutation.isPending,
        branchId,
        setBranchId,
        refresh,
        runCommand,
        navigate,
        view: routeView,
        allowed: (view) => view !== '/users' || !!user,
        editingDocument: isEditingDocument,
        setEditingDocument,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useApplication = () => useContext(Context);
