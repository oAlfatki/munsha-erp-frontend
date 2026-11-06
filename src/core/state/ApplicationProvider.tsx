import { ApiError } from '@/core/api/apiError';
import { useAuth } from '@/core/auth/AuthProvider';
import { canRunCommand } from '@/core/auth/permissions';
import { ROUTES } from '@/core/config/navigation-paths';
import { affectedOwners } from '@/core/query/invalidation';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import type { ApplicationProviderProps } from '@/core/types/props/ApplicationProviderProps';
import type { ApplicationState } from '@/core/types/state/ApplicationState';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useBeforeUnload, useBlocker, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Context = createContext<ApplicationState>(null!);

export function ApplicationProvider({ children, checkSession }: ApplicationProviderProps) {

  const routeView = useLocation().pathname;
  const { user, access } = useAuth();
  const cache = useQueryClient();
  const routerNavigate = useNavigate();
  const [branchId, setBranch] = useState(user?.branchId || '');

  const setBranchId = (value: string) => {

    if (value !== user?.branchId) {
      toast.error('هذا الفرع غير مسموح لهذا الحساب.');
      return;
    }
    setBranch(value);
  };

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

    await Promise.all([
      cache.invalidateQueries({ queryKey: ['access'], refetchType: 'active' }),
      cache.invalidateQueries({ queryKey: ['erp'], refetchType: 'active' }),
    ]);
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
    if (!user || !canRunCommand(access, type, input, branchId)) {
      toast.error('العملية غير مصرح بها أو لم يُعتمد ربط صلاحيتها بعقد API الحالي.');
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
            .filter((query) => query.queryKey[3] === user.userId && query.queryKey[4] === 'aspnet')
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
    if (!user) return;
    const timer = setInterval(() => {
      void checkSession().catch(() => {});
    }, 60000);
    return () => clearInterval(timer);
  }, [user?.userId, checkSession]);

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

        allowed: (view) =>
          !!user &&
          (['dashboard', ROUTES.DASHBOARD, ROUTES.USERS_PASSWORD, ROUTES.USERS_SESSIONS].includes(
            view,
          ) ||
            (access?.status === 'ready' &&
              (view === 'access' || view.startsWith('/users')
                ? access.grants.some(
                    (grant) => grant.module === 'USERS' && grant.branchIds.includes(user.branchId),
                  )
                : access.grants.some((grant) => grant.branchIds.includes(user.branchId))))),

        editingDocument: isEditingDocument,
        setEditingDocument,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useApplication = () => useContext(Context);
