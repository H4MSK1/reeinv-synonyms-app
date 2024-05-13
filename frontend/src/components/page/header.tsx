import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThemeModeToggle from "./theme-mode-toggle";
import Navbar from "./navbar";

export default function Header() {
  return (
    <section className="border-b shadow bg-background">
      <header className="container sticky top-0 flex items-center h-16 gap-4 px-4 md:px-6">
        <Navbar />

        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto md:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search words..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </form>

          <ThemeModeToggle />
        </div>
      </header>
    </section>
  );
}
