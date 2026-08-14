import type { User, Item, Claim } from "../types/index";
import { ItemStatus, ClaimStatus } from "../types/index";

export const admin: User = {
  id: 1, name: "Security Office", email: "security@campus.edu",
  role: "security_admin", isActive: true,
};

export const student: User = {
  id: 2, name: "Juan dela Cruz", email: "juan@example.com",
  role: "student", isActive: true,
};

export const allItems: Item[] = [
  { id: 1, description: "Black umbrella left in Room 302", location: "Room 302", type: "found", reportedBy: admin.id, reportedAt: new Date(), status: ItemStatus.Open },
  { id: 2, description: "Blue water bottle", location: "Library", type: "found", reportedBy: admin.id, reportedAt: new Date(), status: ItemStatus.Open },
  { id: 3, description: "Lost student ID card", location: "Canteen", type: "lost", reportedBy: student.id, reportedAt: new Date(), status: ItemStatus.Claimed },
];

export const allClaims: Claim[] = [
  { id: 1, itemId: 1, claimantId: student.id, submittedAt: new Date(), status: ClaimStatus.Pending },
  { id: 2, itemId: 3, claimantId: student.id, submittedAt: new Date(), status: ClaimStatus.Verified },
];