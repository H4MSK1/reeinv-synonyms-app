import SynonymCardSet from "@/components/domain/synonym/card-set";
import AppLayout from "@/components/layouts/app-layout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function RootRoute() {
  return (
    <AppLayout>
      <section className="flex flex-col gap-12">
        <SynonymCardSet
          title="The latest synonyms added"
          synonyms={["joyful", "happy", "unhappy", "sad", "crazy", "creative"]}
          isCarousel
        />

        <div className="flex flex-col gap-4">
          <h1 className="flex items-center justify-center gap-1 text-xl font-semibold tracking-tight">
            Discover more
          </h1>

          <div className="relative flex w-full max-w-3xl mx-auto shadow-lg">
            <Search className="absolute left-2.5 top-2.5 md:top-5 h-4 w-4 md:h-6 md:w-6 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Start typing a word.."
              className="pl-8 rounded-lg md:pl-10 md:h-16 bg-background md:text-lg"
              onChange={console.log}
            />
          </div>

          <SynonymCardSet
            synonyms={[]}
            className="flex-row"
            isLoading={false}
          />
        </div>
      </section>
    </AppLayout>
  );
}
