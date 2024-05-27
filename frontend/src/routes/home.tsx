import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "@/components/layouts/app-layout";
import SynonymSearchInput from "@/components/domain/synonym/search-input";
import SynonymCard from "@/components/domain/synonym/card";
import { useSynonym } from "@/api/synonym/get-synonym";

export default function HomeRoute() {
  const { word } = useParams();
  const navigate = useNavigate();

  const synonymQuery = useSynonym(word);

  function handleSelectSynonym(synonym: string) {
    navigate(`/${synonym}`);
  }

  return (
    <AppLayout title={word}>
      <section className="flex flex-col gap-12">
        <div className="flex flex-col w-full max-w-3xl gap-2 mx-auto">
          <h1 className="text-2xl font-medium tracking-tight text-center uppercase">
            Discover <span className="text-primary">synonyms</span>
          </h1>

          <SynonymSearchInput onSelectSynonym={handleSelectSynonym} />
        </div>

        {word && (
          <SynonymCard
            word={word}
            synonyms={synonymQuery.data?.synonyms}
            isLoading={synonymQuery.isLoading}
          />
        )}
      </section>
    </AppLayout>
  );
}
