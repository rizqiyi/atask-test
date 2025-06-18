import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import Loading from "../components/Loading";
import Repository from "./Repository";
import { User } from "../types";

interface UsersProps {
  users: User[];
  loadMore: () => void;
  isLoadingMore: boolean;
  hasMore: boolean;
  size: number;
}

const Users = ({
  users,
  loadMore,
  isLoadingMore,
  hasMore,
  size,
}: UsersProps) => {
  const { watch, setValue } = useFormContext();

  if (!users || users.length < 1) return null;

  const handleUserSelect = async (user: User) => {
    const expandedIds = watch("exclude.expandedId") || [];

    if (expandedIds.includes(user.id)) {
      setValue(
        "exclude.expandedId",
        expandedIds.filter((id: string) => id !== String(user.id))
      );
    } else {
      setValue("exclude.expandedId", [...expandedIds, user.id]);
    }
  };

  return (
    <div className="p-4">
      <p className="text-sm text-gray-600 mb-4">
        Showing users for "
        <span className="font-medium">{watch("searchQuery")}</span>"
        {size > 1 && (
          <span className="ml-2 text-gray-500">(Page {size} loaded)</span>
        )}
      </p>

      <div className="space-y-2">
        {users.map((user: User) => {
          const isExpanded =
            watch("exclude.expandedId")?.includes(user.id) || false;

          return (
            <div
              key={user.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div
                data-testid={`${user.login}-trigger-repo-btn`}
                onClick={() => handleUserSelect(user)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <span className="text-gray-700 font-medium">
                    {user.login}
                  </span>
                  {watch("exclude.repoLoadingStates")?.[user.id] && (
                    <div className="ml-2">
                      <Loading />
                    </div>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              <Repository user={user} />
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            data-testid="load-more-btn"
            disabled={isLoadingMore}
            className="px-6 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-md transition-colors disabled:cursor-not-allowed"
          >
            {isLoadingMore ? <Loading /> : "Load More"}
          </button>
        </div>
      )}

      {isLoadingMore && size > 1 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">Loading more users...</p>
        </div>
      )}
    </div>
  );
};

export default Users;
