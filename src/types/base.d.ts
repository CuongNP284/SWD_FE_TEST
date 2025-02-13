declare global {
  interface BasePagingRequest<T> {
    criteria: T;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: "asc" | "desc" | null;
  }

  interface TableColumn<T = any> {
    field: keyof T;
    header: string;
    width?: string;
    align?: AlignType;
    searchable?: boolean;
    sortable?: boolean;
    render?: (value: any, row: any) => React.ReactNode;
  }

  interface BasePagingResponse<T> {
   content: [T],
   totalPages: number
  }

  interface SortConfig<T> {
    field: keyof T;
    direction: "asc" | "desc" | null;
  }

}

export {};
