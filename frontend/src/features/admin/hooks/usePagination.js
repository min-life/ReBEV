import { useState } from "react";

export const usePagination = (initialPage = 1, initialPageSize = 10) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  return {
    page,
    pageSize,
    setPage,
    setPageSize: (size) => {
      setPage(1);
      setPageSize(size);
    },
    resetPage: () => setPage(1),
  };
};
