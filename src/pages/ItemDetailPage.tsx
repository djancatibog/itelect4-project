import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ApiItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import { fetchItemById } from "../api/client";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch the single item using the ID from the URL
  const { data, isPending, isError, error } = useQuery<ApiItem>({
    queryKey: ["items", id], // The key includes the ID so they don't overwrite each other
    queryFn: () => fetchItemById(id!), // We use an arrow function to pass the ID argument
    enabled: id !== undefined, // Don't run the query if the ID is missing
  });

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-900 dark:text-white">Loading item...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.description}
      </h2>
      <div className="max-w-sm">
        <ItemCard 
          item={{
            ...data,
            reportedAt: new Date(data.reportedAt),
          }} 
          onSelect={() => {}} 
        />
      </div>
      <button
        onClick={() => navigate("/items")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Items
      </button>
    </div>
  );
}

export default ItemDetailPage;