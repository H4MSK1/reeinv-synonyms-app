import { Link } from "react-router-dom";
import Header from "../page/header";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
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
            {import.meta.env.VITE_APP_NAME}
          </Link>
        </div>
      </footer>
    </div>
  );
}
