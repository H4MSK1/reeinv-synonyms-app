import { Type } from "@sinclair/typebox";

export const SynonymSchema = Type.Object({
  word: Type.String({ minLength: 1 }),
  synonyms: Type.Array(Type.String(), { minItems: 1 }),
});
