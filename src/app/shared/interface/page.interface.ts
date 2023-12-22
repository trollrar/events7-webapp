export interface Page<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: string[][];
    searchBy?: string[];
    search?: string;
    select?: string[];
    filter?: {
      [column: string]: string | string[];
    };
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}
