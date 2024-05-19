import SynonymCardSet from "@/components/domain/synonym/card-set";
import SynonymSearchInput from "@/components/domain/synonym/search-input";
import AppLayout from "@/components/layouts/app-layout";

export default function HomeRoute() {
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

          <div className="relative flex w-full max-w-3xl mx-auto">
            <SynonymSearchInput />
          </div>

          <SynonymCardSet synonyms={[]} className="flex-row" />
        </div>
      </section>
    </AppLayout>
  );
}
