import { ChangeEvent, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Search, User } from "lucide-react";
import useSWRInfinite from "swr/infinite";
import { searchUsers } from "./shared/lib/api";
import NotFound from "./shared/components/NotFound";
import Error from "./shared/components/Error";
import Users from "./shared/layouts/Users";

const App = () => {
  const methods = useForm<Form>({
    defaultValues: {
      searchQuery: "",
      exclude: {
        expandedId: [],
        shouldFetch: false,
        expandedRepository: "",
        swrKey: "",
        currentPage: 1,
      },
    },
  });

  const { handleSubmit, watch, setValue, reset, getValues } = methods;

  const searchQuery = watch("searchQuery");
  const shouldFetch = watch("exclude.shouldFetch");

  const getSearchKey = useCallback(
    (pageIndex: number, previousPageData: Record<string, any>) => {
      const formValues = getValues();
      if (!formValues.exclude.swrKey) return null;
      if (previousPageData && !previousPageData.hasMore) return null;

      return ["search-users", formValues.exclude.swrKey, pageIndex + 1];
    },
    [getValues]
  );

  const {
    data: pagesData,
    error: searchError,
    isLoading: isSearchLoading,
    isValidating: isSearchValidating,
    size,
    setSize,
  } = useSWRInfinite(
    getSearchKey,
    async ([, query, page]) =>
      await searchUsers(query as string, page as number),
    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
    }
  );

  const users = pagesData ? pagesData.flatMap((page) => page.users) : [];
  const hasMore = pagesData ? pagesData[pagesData.length - 1]?.hasMore : false;
  const error = searchError;
  const isLoading = isSearchLoading && size === 1;

  const onSubmit = async (data: Form) => {
    if (!data.searchQuery?.trim()) return;

    setValue("exclude.shouldFetch", true);
    setValue("exclude.expandedId", []);
    setValue("exclude.currentPage", 1);

    setSize(1);
    setValue("exclude.swrKey", data.searchQuery);
  };

  const loadMore = useCallback(() => {
    if (hasMore && !isSearchLoading && !isSearchValidating) {
      const newSize = size + 1;
      setSize(newSize);
      setValue("exclude.currentPage", newSize);
    }
  }, [hasMore, isSearchLoading, isSearchValidating, size, setSize, setValue]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      reset();
      setValue("exclude.shouldFetch", false);
      setValue("exclude.swrKey", "");
      setValue("exclude.currentPage", 1);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("searchQuery", value);

    if (!value.trim()) {
      setValue("exclude.shouldFetch", false);
      setValue("exclude.expandedId", []);
      setValue("exclude.swrKey", "");
      setValue("exclude.currentPage", 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-lg font-semibold text-gray-900 mb-4">
          GitHub User Search
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter username"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <button
            data-testid="submit-btn"
            type="submit"
            disabled={isLoading || !searchQuery?.trim()}
            className="w-full mt-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {error && <Error message={error?.message} />}

      <FormProvider {...methods}>
        <Users
          users={users}
          loadMore={loadMore}
          isLoadingMore={isSearchLoading || isSearchValidating}
          hasMore={hasMore}
          size={size}
        />
      </FormProvider>

      {users.length === 0 && searchQuery && !isLoading && shouldFetch && (
        <NotFound
          Icon={<User className="w-12 h-12 mx-auto mb-3 text-gray-300" />}
          text={`No users found for "${searchQuery}"`}
        />
      )}

      {!shouldFetch && !searchQuery && (
        <NotFound
          Icon={<Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />}
          text={"Search for GitHub users to get started"}
        />
      )}
    </div>
  );
};

export default App;
