import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ApiItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchItems } from "../api/client";

function ItemsPage() {
  // Use TanStack Query to fetch items from our backend api
  const { data, isPending, isError, error } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // Search term now lives in uiStore so it's globally managed
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

  // Filter items based on description or location matching the search term
  const filteredItems = data.filter((i) =>
    i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Items</h2>
      
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items..."
        className="w-full rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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