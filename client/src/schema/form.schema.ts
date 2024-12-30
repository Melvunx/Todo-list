import { z } from "zod";

export const formSchema = z.object({
  list: z.string().min(4, {
    message: "List must be at least 4 characters long",
  }),
  important: z.number().min(0).max(1),
});
