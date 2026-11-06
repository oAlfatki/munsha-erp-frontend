import { LoaderCircle } from 'lucide-react';

export function LoadingState() {

  return (
    <div className="app-loader" role="status">
      <LoaderCircle className="animate-spin" />
      <p>جارٍ تحميل مساحة العمل…</p>
    </div>
  );
}
