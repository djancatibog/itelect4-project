import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiItem, NewItem } from "../types/index";
import { ItemStatus } from "../types/index";
import ItemCard from "../components/ItemCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchItems, createItem } from "../api/client"; 

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, type ItemFormValues } from "../schemas/itemSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ItemsPage() {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    mode: "onBlur",
    defaultValues: { itemName: "", location: "", reporterEmail: "" },
  });

  const addItem = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      reset(); 
    },
  });

  const onSubmit = (values: ItemFormValues): void => {
    // reporterEmail is validated by the schema (must end in @dlsl.edu.ph)
    // but ApiItem has no email field yet, so only the item fields are sent.
    // reportedBy: 1 is a placeholder until auth user IDs are wired up.
    const payload: NewItem = {
      description: values.itemName,
      location: values.location,
      type: "lost",
      reportedBy: 1,
      reportedAt: new Date().toISOString(),
      status: ItemStatus.Open,
    };
    addItem.mutate(payload);
  };

  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-900 dark:text-white">Loading items...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load items. Is json-server running on port 3001? Error: {error.message}
      </div>
    );
  }

  const filteredItems = data.filter((i) =>
    i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Items</h2>

      {/* --- THIS IS THE FORM THAT WAS MISSING --- */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="mb-8 grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Report a Lost/Found Item</h3>
        
        <div className="grid gap-1.5">
          <Label htmlFor="itemName" className="text-foreground">Item Name</Label>
          <Input 
            id="itemName" 
            {...register("itemName")} 
            aria-invalid={errors.itemName ? true : undefined} 
          />
          {errors.itemName && (
            <p className="text-sm text-red-600">{errors.itemName.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="location" className="text-foreground">Where was it lost/found?</Label>
          <Input 
            id="location" 
            {...register("location")} 
            aria-invalid={errors.location ? true : undefined} 
          />
          {errors.location && (
            <p className="text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="reporterEmail" className="text-foreground">Campus Email</Label>
          <Input 
            id="reporterEmail" 
            {...register("reporterEmail")} 
            aria-invalid={errors.reporterEmail ? true : undefined} 
            placeholder="juan@dlsl.edu.ph"
          />
          {errors.reporterEmail && (
            <p className="text-sm text-red-600">{errors.reporterEmail.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={addItem.isPending} 
          className="mt-2 justify-self-start"
        >
          {addItem.isPending ? "Saving..." : "Report Item"}
        </Button>
      </form>

      <hr className="my-6 border-gray-200 dark:border-gray-700" />

      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items..."
        className="mb-4"
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="mb-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((i) => (
          <Link key={i.id} to={`/items/${i.id}`}>
            <ItemCard 
              item={{
                ...i,
                reportedAt: new Date(i.reportedAt),
              }} 
              onSelect={() => {}} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;