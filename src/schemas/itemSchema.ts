import { z } from "zod";

export const itemSchema = z.object({
  itemName: z.string().min(1, "Please provide the name of the item."),
  
  location: z.string().min(1, "Please specify where it was lost or found."),
  
  reporterEmail: z
    .string()
    .email("Please enter a valid email address.")
    .refine(
      (email) => email.endsWith("@dlsl.edu.ph"), 
      "You must use your campus email address to report an item."
    ),
});

// This automatically builds the TypeScript type based on the rules above!
export type ItemFormValues = z.infer<typeof itemSchema>;