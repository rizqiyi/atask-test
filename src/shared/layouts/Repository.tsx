import NotFound from "../components/NotFound";
import { Star, User } from "lucide-react";
import Loading from "../components/Loading";
import { useFormContext } from "react-hook-form";

const Repository = ({
  user,
  refetch,
}: {
  user: any;
  refetch: (v: any) => void;
}) => {
  const { watch } = useFormContext();
  const isExpanded = watch("exclude.expandedId").includes(user.id);
  const isRepoLoading = watch("exclude.repoLoadingStates")?.[user.id];
  const userRepos = watch("exclude.repositoriesCache")?.[user.id];

  if (!isExpanded) return null;

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      {isRepoLoading ? (
        <div className="p-6 text-center">
          <Loading />
          <p className="text-sm text-gray-500">
            Loading repositories for {user.login}...
          </p>
        </div>
      ) : userRepos && userRepos.length > 0 ? (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">
              {userRepos.length} repositories
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                refetch(user);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              Refresh
            </button>
          </div>
          {userRepos.map((repo) => (
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
          Icon={<User className="w-8 h-8 mx-auto mb-2 text-gray-300" />}
          text={`No public repositories found for ${user.login}`}
        />
      )}
    </div>
  );
};

export default Repository;
