import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AiReportDraft } from "../types/index";
import { askAi } from "../api/client";
import { reportFormSchema } from "../schemas/reportFormSchema";
import type { ReportFormValues } from "../schemas/reportFormSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Record: one entry for every value clarity can have. Add a fourth
// value to AiReportDraft and this object stops compiling until it has
// a colour for it.
const CLARITY_STYLE: Record<AiReportDraft["clarity"], string> = {
  "clear":        "bg-green-100 text-green-800",
  "needs-detail": "bg-yellow-100 text-yellow-800",
  "too-vague":    "bg-red-100 text-red-800",
};

function ReportPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    // No mode: "onBlur" here. The button sits right under the error
    // message, and checking on blur makes the message appear or
    // vanish between pressing the button and letting go, so the
    // click misses. The default checks on submit, then on every
    // keystroke.
    defaultValues: { prompt: "" },
  });

  // A mutation, not a query: it runs when the button is pressed,
  // never on page load, and asking twice is two requests -- two
  // answers that may differ, and two spent from the quota.
  const draft = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: ReportFormValues): void => {
    draft.mutate(values.prompt);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-1 text-2xl font-bold text-gray-900
        dark:text-white">AI Report Assistant</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Describe a lost or found item and get a tidy listing draft.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="prompt" className="text-foreground">
            Item description</Label>
          <textarea id="prompt" rows={6} {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="What it is, where and when it was lost or found..."
            className="rounded-lg border border-input bg-background p-2.5
              text-sm text-foreground" />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button type="submit" disabled={draft.isPending}
          className="justify-self-start">
          {draft.isPending ? "Drafting..." : "Draft my report"}
        </Button>
      </form>

      {/* The API's own sentence: the rate limit, the quota, or a
          refusal from the schema -- never Google's raw error text. */}
      {draft.isError && (
        <p className="mt-4 text-sm text-red-700">{draft.error.message}</p>
      )}

      {draft.data && (
        <div className="mt-6 grid gap-4 rounded-lg border border-gray-200
          bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded px-2 py-0.5 text-sm font-semibold
              ${CLARITY_STYLE[draft.data.clarity]}`}>
              {draft.data.clarity}
            </span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-sm
              text-gray-800 dark:bg-gray-700 dark:text-gray-100">
              {draft.data.category}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900
            dark:text-white">{draft.data.title}</h3>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Tags</h4>
            <ul className="mt-1 flex flex-wrap gap-2">
              {draft.data.tags.map((t) => (
                <li key={t} className="rounded-full bg-blue-100 px-2.5
                  py-0.5 text-xs text-blue-800">{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Add these details</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700
              dark:text-gray-300">
              {draft.data.missingDetails.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportPage;