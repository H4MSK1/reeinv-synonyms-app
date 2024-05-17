import ThemeModeToggle from "./theme-mode-toggle";
import Navbar from "./navbar";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export default function Header() {
  return (
    <section className="border-b shadow bg-background">
      <header className="container sticky top-0 flex items-center justify-between h-16 gap-4 px-4 md:px-6">
        <Navbar />

        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" /> Add new synonym
          </Button>

          <ThemeModeToggle />
        </div>
      </header>
    </section>
  );
}
