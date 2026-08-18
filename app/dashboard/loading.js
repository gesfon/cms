export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-slate-300" />
        <p className="text-sm text-slate-400">
          Loading...
        </p>
      </div>
    </div>
  );
}