export interface PaginatePageRespond {
    current_page: number;
    first_page: number;
    last_page: number;
    previous_page: number | null;
    next_page: number | null;
};
  
export interface PaginateUrlPageRespond {
    current_page: number;
    path: string;
    first_page_url: string;
    last_page_url: string;
    previous_page_url: string | null;
    next_page_url: string | null;
};

interface FieldNamePaginateRespond<T extends any[]> {
    [fieldName: string]: T;
}

interface TotalPageRespond {
    total: number;
    total_per_page: number;
}

export type PaginateUrlRespond<T extends any[]> = FieldNamePaginateRespond<T> & TotalPageRespond & PaginateUrlPageRespond;

export type PaginateRespond<T extends any[]> = FieldNamePaginateRespond<T> & TotalPageRespond & PaginatePageRespond;
