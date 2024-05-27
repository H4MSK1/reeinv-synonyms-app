import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SynonymTextToSpeech from "./text-to-speech";
import { Optional } from "@/types";

type Props = {
  word: string;
  synonyms: Optional<string[]>;
  isLoading?: boolean;
};

export function SynonymCardPlaceholder() {
  return (
    <Card data-testid="synonym-card-placeholder">
      <CardHeader className="bg-muted/50">
        <CardTitle>
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap gap-2 overflow-x-auto">
        <Skeleton className="h-4 w-[40px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[80px]" />
      </CardContent>
    </Card>
  );
}

export default function SynonymCard({ word, synonyms, isLoading }: Props) {
  if (isLoading) {
    return <SynonymCardPlaceholder />;
  }

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center justify-between gap-4 text-lg">
          <span>
            Synonyms for{" "}
            <i className="text-primary" data-testid="synonym">
              {word}
            </i>
          </span>

          <SynonymTextToSpeech word={word} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap gap-2 overflow-x-auto">
        {synonyms?.map((synonym, index) => (
          <Badge variant="secondary" key={index}>
            <Link
              to={`/${synonym}`}
              className="text-base transition-colors text-muted-foreground hover:text-foreground"
              data-testid="synonym-link"
            >
              {synonym}
            </Link>
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
