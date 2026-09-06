import type { ApiItem, ApiClaim, NewClaim } from "../types/index";

export const API_URL = "http://localhost:3001";

// ===== ITEMS API =====

// GET /items - Get the whole list of items
export async function fetchItems(): Promise<ApiItem[]> {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) {
    throw new Error("Could not load items");
  }
  return res.json();
}
// Sends a POST request to add a new item to db.json
export const createItem = async (newItem: Omit<ApiItem, "id">): Promise<ApiItem> => {
  const response = await fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  if (!response.ok) {
    throw new Error("Failed to save the new item.");
  }

  return response.json();
};

// GET /items?id=X - Get a single item by its ID
export async function fetchItemById(id: string): Promise<ApiItem> {
  const res = await fetch(`${API_URL}/items?id=${id}`);
  if (!res.ok) {
    throw new Error("Could not load that item");
  }
  const matches: ApiItem[] = await res.json();
  if (matches.length === 0) {
    throw new Error(`No item found with id "${id}".`);
  }
  return matches[0];
}

// ===== CLAIMS API =====

// GET /claims - Get the whole list of claims
export async function fetchClaims(): Promise<ApiClaim[]> {
  const res = await fetch(`${API_URL}/claims`);
  if (!res.ok) {
    throw new Error("Could not load claims");
  }
  return res.json();
}

// POST /claims - Save a new claim to the server
export async function createClaim(newClaim: NewClaim): Promise<ApiClaim> {
  const res = await fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClaim),
  });
  if (!res.ok) {
    throw new Error("Could not save the claim");
  }
  return res.json();
}