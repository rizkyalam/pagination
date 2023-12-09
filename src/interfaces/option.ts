import { OptionOrder } from "../sort";

export interface PaginateFilterParameter {
  search?: string | boolean | number;
  limit?: number;
  page?: number;
}

export interface PaginateOptions {
  search?: string | boolean | number;
  limit?: number;
  currentPage?: number;
  fieldName?: string;
  sort?: OptionOrder[];
}

export interface PaginateUrlOptions {
  path: string;
  filterParams: PaginateFilterParameter,
  fieldName?: string,
  sort?: OptionOrder[]
};
