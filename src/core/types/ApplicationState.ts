import type { CommandReceipt } from '@/core/types/CommandReceipt';
import type { Identity } from '@/core/types/Identity';
export interface ApplicationState {
  user: Identity | null;
  busy: boolean;
  branchId: string;
  setBranchId: (s: string) => void;
  refresh: () => Promise<void>;
  runCommand: <TInput>(
    type: string,
    data: TInput,
    action: (
      input: TInput,
      context: {
        id: string;
        revision: number;
      },
    ) => Promise<CommandReceipt>,
  ) => Promise<boolean>;
  navigate: (s: string) => void;
  view: string;
  allowed: (view: string) => boolean;
  editingDocument: boolean;
  setEditingDocument: (isV: boolean) => void;
}
