// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.
export interface User {
  id:       number;
  name:     string;
  email:    string;
  role:     "student" | "security_admin";
  isActive: boolean;
}

export interface Item {
  id:          number | string;
  description: string;
  location:    string;
  type:        "lost" | "found";
  reportedBy:  number;
  reportedAt:  Date;
  status:      ItemStatus;    
}

export interface Claim {
  id:          number;
  itemId:      number;
  claimantId:  number;
  submittedAt: Date;
  status:      ClaimStatus;   
}

// ===== TYPE ALIASES =====
// A type alias gives a name to any type -- primitives, unions, functions, objects
// Alias for a union type (string OR number)
export type ID = number | string;
// Alias for an object shape
export type Coordinate = {
x: number;
y: number;
};
// Alias for a function signature
export type Formatter = (value: number) => string;
// Using them
const studentId: ID = "S2026-001";

const formatScore: Formatter = (value) => `${value}%`;
console.log(studentId); // S2026-001
console.log(formatScore(95.5)); // 95.5%

// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive"; // literal union
// Function that accepts a union type
export function printId(id: StringOrNumber): void {
console.log(`ID: ${id}`);
}
printId(101);
printId("S2026-001");

// ===== ENUMS =====
export enum ItemStatus {
  Open,
  Claimed,
  Resolved,
}

export const enum ClaimStatus {
  Pending  = "pending",
  Verified = "verified",
  Rejected = "rejected",
}

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data:    T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type ItemUpdate    = Partial<Item>;
export type ItemPreview   = Pick<Item, "id" | "description" | "status">;
export type PublicItem    = Omit<Item, "reportedBy">;
export type ItemTypeCount = Record<"lost" | "found", number>;



// ===== API TYPES (Over the wire) =====

// For Items: Drop the number 'id' and Date 'reportedAt', replace them with strings
export type ApiItem = Omit<Item, "id" | "reportedAt"> & {
  id: string;
  reportedAt: string;
};

// When creating a new Item, we don't have an ID yet (the server makes it)
export type NewItem = Omit<ApiItem, "id">;

// For Claims: Drop the number 'id' and Date 'submittedAt', replace them with strings
export type ApiClaim = Omit<Claim, "id" | "submittedAt"> & {
  id: string;
  submittedAt: string;
};

// When creating a new Claim, we don't have an ID yet
export type NewClaim = Omit<ApiClaim, "id">;