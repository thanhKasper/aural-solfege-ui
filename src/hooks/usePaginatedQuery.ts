import type {
  Page,
  PagingParameters,
} from "@/providers/auralSolfege/apis.type";
import {
  keepPreviousData,
  useQuery,
  type QueryKey,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router";

const DEFAULT_PAGE_SIZE = 5;
const FIRST_PAGE = 1;

// Parses a positive integer search param, falling back when missing/invalid
const parsePositiveInt = (value: string | null, fallback: number) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 ? n : fallback;
};

type UsePaginatedQueryOptions<T> = {
  queryKey: QueryKey;
  queryFn: (params: PagingParameters) => Promise<Page<T>>;
  defaultPageSize?: number;
};

// The URL uses 1-based pages (?page=1), while the API uses 0-based pages.
export const usePaginatedQuery = <T>({
  queryKey,
  queryFn,
  defaultPageSize = DEFAULT_PAGE_SIZE,
}: UsePaginatedQueryOptions<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parsePositiveInt(searchParams.get("page"), FIRST_PAGE);
  const pageSize = parsePositiveInt(
    searchParams.get("pageSize"),
    defaultPageSize,
  );

  const query = useQuery({
    queryKey: [...queryKey, { page: currentPage, pageSize }],
    queryFn: () => queryFn({ page: currentPage - 1, pageSize }),
    // Keep showing the current page while the next one loads, so the list does not flash empty
    placeholderData: keepPreviousData,
  });

  // Merge into the existing params so unrelated ones (e.g. a future ?search=) are kept
  const updateParams = (changes: Record<string, number>) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(changes).forEach(([key, value]) =>
        next.set(key, String(value)),
      );
      return next;
    });

  const setPage = (page: number) => updateParams({ page });
  // A different page size reshuffles every page, so start again from the first one
  const setPageSize = (size: number) =>
    updateParams({ pageSize: size, page: FIRST_PAGE });

  // Trust the API's flags so we never request a page that doesn't exist
  const hasNext = query.data?.hasNext ?? false;
  const hasPrevious = query.data?.hasPrevious ?? false;
  const nextPage = () => {
    if (hasNext) setPage(currentPage + 1);
  };
  const previousPage = () => {
    if (hasPrevious) setPage(currentPage - 1);
  };

  return {
    // Untouched useQuery result. React Query still tracks only the fields callers read
    query,
    items: query.data?.content ?? [],
    currentPage,
    pageSize,
    totalPages: query.data?.totalPages ?? 1,
    hasNext,
    hasPrevious,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
  };
};
