import { z } from "zod";
import { synonymSchema } from "@/schema";

export type Synonym = z.infer<typeof synonymSchema>;
