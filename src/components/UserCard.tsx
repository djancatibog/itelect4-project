// src/components/UserCard.tsx
import type { User } from "../types/index";

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  return (
  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
      {user.name}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Role: {user.role}
    </p>
  </div>
);
}

export default UserCard;