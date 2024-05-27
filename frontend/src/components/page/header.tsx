import ThemeModeToggle from "./theme-mode-toggle";
import Navbar from "./navbar";
import { SynonymCreateFormDialogTrigger } from "../domain/synonym/create-form-dialog";

export default function Header() {
  return (
    <section className="border-b shadow bg-background">
      <header className="container sticky top-0 flex items-center justify-between h-16 gap-4 px-4 md:px-6">
        <Navbar />

        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <SynonymCreateFormDialogTrigger />
          <ThemeModeToggle />
        </div>
      </header>
    </section>
  );
}
