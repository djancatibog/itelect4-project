// src/components/ItemCard.tsx
import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  variant?: "default" | "compact";
}

function ItemCard({ item, onSelect, variant = "default" }: ItemCardProps) {
  const isCompact = variant === "compact";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    onSelect(item);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Note:", e.target.value);
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <h3
        className={`font-bold text-gray-900 dark:text-white ${
          isCompact ? "text-sm" : "text-lg"
        }`}
      >
        {item.description}
      </h3>
      {!isCompact && (
        <>
          <p className="text-gray-600 dark:text-gray-300">
            Location: {item.location}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Type: {item.type}
          </p>
        </>
      )}
      <button
        onClick={handleClick}
        className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Select
      </button>
      <input
        onChange={handleNoteChange}
        placeholder="Quick note (demo only)"
        className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
}

export default ItemCard;