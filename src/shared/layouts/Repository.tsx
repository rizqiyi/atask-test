import NotFound from "../components/NotFound";
import { Star, User as UserIcon } from "lucide-react";
import Loading from "../components/Loading";
import { useFormContext } from "react-hook-form";
import type { Repository, User } from "../types";
import useSWR from "swr";
import { getUserRepositories } from "../lib/api";

const Repository = ({ user }: { user: User }) => {
  const { watch } = useFormContext();
  const isExpanded = watch("exclude.expandedId").includes(user.id);

  const fetchRepo = () => getUserRepositories(user.login);

  const {
    data: repositories,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(isExpanded ? [`user-repos-${user.login}`] : null, fetchRepo, {
    revalidateOnFocus: false,
    dedupingInterval: 50000,
  });

  if (!isExpanded) return null;

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      {isLoading || isValidating ? (
        <div className="p-6 text-center" data-testid="loading-repo">
          <Loading />
          <p className="text-sm text-gray-500">
            Loading repositories for {user.login}...
          </p>
        </div>
      ) : repositories && repositories.length > 0 ? (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">
              {repositories.length} repositories
            </p>
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await mutate();
              }}
              data-testid="refresh-btn"
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              Refresh
            </button>
          </div>
          {repositories.map((repo: Repository) => (
            <div
              key={repo.id}
              className="p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                window.open(repo.html_url, "_blank");
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {repo.language && (
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {repo.language}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center ml-3 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700 mr-1">
                    {repo.stargazers_count}
                  </span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFound
          Icon={<UserIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />}
          text={`No public repositories found for ${user.login}`}
        />
      )}
    </div>
  );
};

export default Repository;
