import { NavLink } from "react-router-dom";
import { BookA, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const linkStyling =
    "transition-colors text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground";

  return (
    <>
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold border-r md:text-base"
        >
          <BookA className="w-6 h-6" />
          <span className="pr-4 tracking-wider uppercase lg:pr-6">
            {import.meta.env.VITE_APP_NAME}
          </span>
          <span className="sr-only">{import.meta.env.VITE_APP_NAME}</span>
        </NavLink>

        <NavLink to="/" className={linkStyling}>
          Home
        </NavLink>

        <NavLink to="/synonyms" className={linkStyling}>
          Synonyms
        </NavLink>
      </nav>

      {/* Sidebar style navigation for mobile users */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <BookA className="w-6 h-6" />
              <span className="tracking-wider uppercase">
                {import.meta.env.VITE_APP_NAME}
              </span>
              <span className="sr-only">{import.meta.env.VITE_APP_NAME}</span>
            </NavLink>

            <NavLink to="/" className={linkStyling}>
              Home
            </NavLink>

            <NavLink to="/synonyms" className={linkStyling}>
              Synonyms
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
