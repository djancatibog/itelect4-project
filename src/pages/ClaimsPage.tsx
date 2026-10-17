import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import { fetchItems, createItem } from "../api/client";

function ClaimsPage() {
  const queryClient = useQueryClient();

  // READ: Fetch the list of items from the API
  const { data, isPending, isError, error } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // WRITE: Set up the mutation to save a new item
  const addItem = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");

  const handleAdd = (): void => {
    addItem.mutate({ description: itemName, location, type: "lost" });
    setItemName("");
    setLocation("");
  };

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-900 dark:text-white">Loading items...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load items. Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Items
      </h2>

      {/* --- ADD NEW ITEM FORM --- */}
      <div className="mb-6 flex gap-2 max-w-md">
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          className="w-full rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={handleAdd}
          disabled={itemName === "" || location === "" || addItem.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addItem.isPending ? "Saving..." : "Add"}
        </button>
      </div>

      {addItem.isError && (
        <p className="mb-4 text-sm text-red-700">{addItem.error.message}</p>
      )}

      {/* --- ITEMS LIST --- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((c) => (
          <ItemCard key={c.id} item={{ ...c, reportedAt: new Date(c.reportedAt) }} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default ClaimsPage;
