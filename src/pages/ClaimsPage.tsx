import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiClaim } from "../types/index";
import { ClaimStatus } from "../types/index";
import ClaimBadge from "../components/ClaimBadge";
import { fetchClaims, createClaim } from "../api/client";

function ClaimsPage() {
  // Local state just for the input box
  const [itemIdInput, setItemIdInput] = useState<string>("");
  const queryClient = useQueryClient();

  // 1. READ: Fetch the list of claims from the API
  const { data, isPending, isError } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  // 2. WRITE: Set up the mutation to save a new claim
  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      // Tell the cache the old data is stale so it automatically refetches!
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      setItemIdInput(""); // Clear the input box on success
    },
  });

  const handleAdd = (): void => {
    // We call mutate() to actually trigger the POST request
    addClaim.mutate({
      itemId: Number(itemIdInput), // Convert what the user typed into a number
      claimantId: 2, // Hardcoded to our student ID for now
      submittedAt: new Date().toISOString(), // Convert Date to a string for JSON
      status: ClaimStatus.Pending,
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-900 dark:text-white">Loading claims...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load claims.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Claims</h2>
      
      {/* --- ADD NEW CLAIM FORM --- */}
      <div className="mb-6 flex gap-2 max-w-md">
        <input 
          value={itemIdInput}
          onChange={(e) => setItemIdInput(e.target.value)}
          placeholder="Enter Item ID to claim"
          type="number"
          className="w-full rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button 
          onClick={handleAdd}
          disabled={itemIdInput === "" || addClaim.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addClaim.isPending ? "Saving..." : "Add"}
        </button>
      </div>

      {addClaim.isError && (
        <p className="mb-4 text-sm text-red-700">{addClaim.error.message}</p>
      )}

      {/* --- CLAIMS LIST --- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((c) => (
          <ClaimBadge key={c.id} claim={c}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Item ID: {c.itemId}
            </p>
          </ClaimBadge>
        ))}
      </div>
    </div>
  );
}

export default ClaimsPage;