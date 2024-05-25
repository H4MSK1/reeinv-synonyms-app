import { Static } from "@sinclair/typebox";
import { SynonymSchema } from "@/schema";
import { Optional } from ".";

export type Synonyms = Record<string, string[]>;
export type SynonymMap = Map<string, Set<string>>;
export type Synonym = Static<typeof SynonymSchema>;
export type SynonymsFilter = { search?: string };

export interface SynonymServiceInterface {
  clearSynonyms(): void;
  addSynonyms(synonym: Synonym): void;
  getSynonyms(filter: SynonymsFilter): Optional<Synonyms>;
  getSynonymsByWord(word: string): Optional<Synonyms>;
}
