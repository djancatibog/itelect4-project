import { z } from "zod";

// The same two limits as aiRequestSchema in itelect4-backend, with the
// same messages, so the browser says it before a request is spent.
// The API checks again anyway: anyone can call it without this page.
export const reportFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe the item in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

export type ReportFormValues = z.infer<typeof reportFormSchema>;