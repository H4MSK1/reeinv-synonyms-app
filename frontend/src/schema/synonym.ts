import { z } from "zod";

export const synonymSchema = z.object({
  word: z.string().min(1, {
    message: "Word is required",
  }),

  synonyms: z.array(z.string()).min(1, {
    message: "At least 1 synonym is required",
  }),
});
