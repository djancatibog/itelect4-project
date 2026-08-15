# Campus Lost & Found Tracker

A simple TypeScript project for tracking lost and found items on campus. Students and security admins can report items, track their status through a lifecycle (Open -> Claimed -> Resolved), and manage claims made by students trying to recover their belongings.

This project was built for ITELECT4 as part of GT1 (Parts 1 and 2) and GT2 (React + TypeScript components), demonstrating TypeScript fundamentals -- interfaces, type aliases, unions, generics, utility types, and enums -- along with typed React components.

## Interfaces & Types

**Interfaces**
- `User` -- a student or security admin, with a `role` field restricting values to `"student" | "security_admin"`
- `Item` -- a lost or found item report, including its `status` (tracked via the `ItemStatus` enum)
- `Claim` -- a student's claim on an item, including its `status` (tracked via the `ClaimStatus` enum)
- `ApiResponse<T>` -- a generic wrapper for API-style responses, reusable for any data type

**Type Aliases**
- `ID` -- a union of `number | string`
- `Coordinate` -- a simple `{ x, y }` object shape
- `Formatter` -- a function signature type
- `StringOrNumber` -- a union of `string | number`
- `Status` -- a literal union: `"pending" | "active" | "inactive"`

**Enums**
- `ItemStatus` -- regular enum: `Open`, `Claimed`, `Resolved`
- `ClaimStatus` -- const enum: `Pending`, `Verified`, `Rejected`

**Utility Types**
- `ItemUpdate` -- `Partial<Item>`, used for partial updates to an item
- `ItemPreview` -- `Pick<Item, "id" | "description" | "status">`, used for list views
- `PublicItem` -- `Omit<Item, "reportedBy">`, hides the reporter's identity
- `ItemTypeCount` -- `Record<"lost" | "found", number>`, used for dashboard-style counts

## How to Install & Run

1. Clone the repository:
   ```
   git clone https://github.com/djancatibog/itelect4-project.git
   cd itelect4-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the dev server:
   ```
   npm run dev
   ```
   Then open the local URL shown in the terminal (usually `http://localhost:5173/`).

4. Check for TypeScript errors (should show zero):
   ```
   npx tsc --noEmit
   ```
