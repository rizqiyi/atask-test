interface Form {
  searchQuery: string;
  exclude: {
    expandedId: any[];
    shouldFetch: boolean;
    expandedRepository: string;
    swrKey: string;
    currentPage: number;
  };
}
