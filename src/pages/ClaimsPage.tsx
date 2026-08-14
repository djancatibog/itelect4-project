import ClaimBadge from "../components/ClaimBadge";
import { allClaims } from "../data/mockData";

function ClaimsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Claims</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allClaims.map((c) => (
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