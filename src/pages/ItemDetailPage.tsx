import { useParams, useNavigate } from "react-router";
import ItemCard from "../components/ItemCard";
import { allItems } from "../data/mockData";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = allItems.find((i) => i.id === Number(id));

  if (item === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No item found with id "{id}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {item.description}
      </h2>
      <div className="max-w-sm">
        <ItemCard item={item} onSelect={() => {}} />
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