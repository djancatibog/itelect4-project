// src/components/ClaimBadge.tsx
import type { Claim } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <p className="text-gray-900 dark:text-white">Claim ID: {claim.id}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Status: {claim.status}</p>
    {children}
  </div>
);
};

export default ClaimBadge;