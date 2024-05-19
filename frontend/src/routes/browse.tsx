import SynonymCardSet from "@/components/domain/synonym/card-set";
import SynonymSearchInput from "@/components/domain/synonym/search-input";
import AppLayout from "@/components/layouts/app-layout";
import { Badge } from "@/components/ui/badge";

function BrowseByLetter() {
  const letters = [..."abcdefghijklmnopqrstuvwxyz"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 ">
      {letters.map((letter) => (
        <Badge
          key={letter}
          className="justify-center w-10 text-2xl uppercase shadow"
        >
          {letter}
        </Badge>
      ))}
    </div>
  );
}
export default function BrowseRoute() {
  return (
    <AppLayout>
      <section className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative flex flex-col w-full max-w-3xl gap-4 mx-auto">
            <SynonymSearchInput />

            <h1 className="flex items-center justify-center gap-1 text-xl font-semibold tracking-tight">
              Browse by letter
            </h1>
            <BrowseByLetter />
          </div>

          <SynonymCardSet
            synonyms={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]}
            className="flex-row"
          />
        </div>
      </section>
    </AppLayout>
  );
}
