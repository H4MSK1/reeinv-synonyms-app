import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SynonymCard, { SynonymCardPlaceholder } from "../card";
import { BookText } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  synonyms: string[];
  title?: string;
  isLoading?: boolean;
  isCarousel?: boolean;
  className?: string;
};

function CarouselCardSet({
  synonyms,
  isLoading,
}: Pick<Props, "synonyms" | "isLoading">) {
  const CardComponent = isLoading ? SynonymCardPlaceholder : SynonymCard;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {synonyms.map((synonym, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <CardComponent synonym={synonym} relatedSynonyms={synonyms} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function SynonymCardSet({
  synonyms,
  title,
  isCarousel,
  isLoading,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-4 flex-wrap", className)}>
      {title && (
        <h1 className="flex items-center justify-center gap-1 text-xl font-semibold tracking-tight ">
          <BookText /> {title}
        </h1>
      )}

      {isLoading &&
        Array(4)
          .fill(null)
          .map((_, index) => <SynonymCardPlaceholder key={index} />)}

      {isCarousel ? (
        <CarouselCardSet synonyms={synonyms} />
      ) : (
        synonyms.map((synonym, index) => (
          <SynonymCard
            key={index}
            synonym={synonym}
            relatedSynonyms={synonyms}
          />
        ))
      )}
    </div>
  );
}
