import { Link } from "react-router-dom";
import Header from "../page/header";
import { Toaster } from "../ui/sonner";
import { useEffect } from "react";
import { VITE_APP_NAME } from "@/constants";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function AppLayout({ children, title }: Props) {
  useEffect(() => {
    if (title) {
      document.title = `${title} — ${VITE_APP_NAME}`;
    }
  }, [title]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16)_-_73px)] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <section className="container">{children}</section>
      </main>

      <footer className="shadow bg-background">
        <div className="container p-6 text-center text-muted-foreground">
          <span>Copyright &copy; {new Date().getFullYear()} — </span>
          <Link to="/" className="font-semibold">
            {VITE_APP_NAME}
          </Link>
        </div>
      </footer>

      <Toaster
        theme="light"
        toastOptions={{}}
        duration={5000}
        position="top-right"
        offset={75}
        richColors
      />
    </div>
  );
}
