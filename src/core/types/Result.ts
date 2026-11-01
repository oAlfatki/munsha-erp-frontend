export interface Result<TData> {
  isSuccess: true;
  data: TData;
  meta?: { requestId?: string; apiVersion?: string };
}
