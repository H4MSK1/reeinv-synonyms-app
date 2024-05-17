import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  synonym: string;
  relatedSynonyms: string[];
};

export function SynonymCardPlaceholder() {
  return (
    <Card>
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

export default function SynonymCard({ synonym, relatedSynonyms }: Props) {
  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle>
          Synonyms for{" "}
          <i className="text-primary" data-testid="synonym">
            {synonym}
          </i>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap gap-2 overflow-x-auto">
        {relatedSynonyms.map((relatedSynonym, index) => (
          <Badge variant="secondary" key={index}>
            <Link
              to="/"
              className="text-base transition-colors text-muted-foreground hover:text-foreground"
            >
              {relatedSynonym}
            </Link>
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
