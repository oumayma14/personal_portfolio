import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-primary text-primary-foreground px-4 py-2 rounded shadow-md animate-[fade-in]"
        >
          <strong>{t.message.title}</strong>
          <p>{t.message.description}</p>
        </div>
      ))}
    </div>
  );
}
