import { chunkPerPage } from "./chunk";
import { PaginateUrlOptions, PaginateOptions, PaginateFilterParameter } from "./interfaces/option";
import { PaginateRespond, PaginateUrlRespond } from "./interfaces/respond";
import { PaginatePage, paginatePage, paginatePageUrl } from "./page";
import { sortPaginate } from "./sort";
import { searchKeyword } from "./search";

export function paginateUrl<T extends any[]>(
  data: T,
  options: PaginateUrlOptions,
): PaginateUrlRespond<T> {
  const total = data.length;

  const {
    path,
    filterParams,
    fieldName = 'data',
    sort = [],
  } = options;

  const { 
    search = null, 
    limit = total, 
    page: currentPage = 1
  } = filterParams;

  let currentData: T = data;

  if (search) {
    const keyword = filterParams.search.toString();
    const searchData: T = searchKeyword(currentData, keyword);
    currentData = searchData.length > 0 ? searchData : currentData;
  }

  if (sort.length > 0) {
    currentData = sortPaginate(currentData, sort);
  }

  const chunk = chunkPerPage(currentData, limit);
  currentData = chunk.find((current) => current.page === currentPage).data as T;

  const lastChunk = chunk.length - 1;
  const totalLastChunk = chunk[lastChunk].data.length;

  let totalPerPage: number;
  if (currentData.length === totalLastChunk) {
    totalPerPage = totalLastChunk;
  } else {
    totalPerPage = total >= limit ? limit : total;
  }

  totalPerPage = Number(totalPerPage);
  const lastPage = chunk.length;

  if (!filterParams.limit) filterParams.limit = total;
  if (!filterParams.page) filterParams.page = currentPage;

  const url = paginatePageUrl(
    path,
    lastPage, 
    filterParams
  );

  const results = {
    total,
    total_per_page: totalPerPage,
    current_page: currentPage,
    path: url.path,
    first_page_url: url.first_page_url,
    last_page_url: url.last_page_url,
    previous_page_url: url.previous_page_url,
    next_page_url: url.next_page_url,
    [fieldName]: currentData,
  } as PaginateUrlRespond<T>;

  return results;
}

export function paginate<T extends any[]>(
  data: T,
  options: PaginateOptions
): PaginateRespond<T> {
  const total = data.length;

  const {
    currentPage = 1,
    limit = total,
    search = null,
    sort = [],
    fieldName = 'data',
  } = options;

  let currentData: T = data;

  if (search) {
    const keyword = search.toString();
    const searchData: T = searchKeyword(currentData, keyword);
    currentData = searchData.length > 0 ? searchData : currentData;
  }

  if (sort.length > 0) {
    currentData = sortPaginate(currentData, sort);
  }

  const chunk = chunkPerPage(currentData, limit);
  currentData = chunk.find((current) => current.page === currentPage).data as T;

  const lastChunk = chunk.length - 1;
  const totalLastChunk = chunk[lastChunk].data.length;

  let totalPerPage: number;
  if (currentData?.length === totalLastChunk) {
    totalPerPage = totalLastChunk;
  } else {
    totalPerPage = total >= limit ? limit : total;
  }

  totalPerPage = Number(totalPerPage);

  const page: PaginatePage = { 
    current: currentPage, 
    last: chunk.length 
  };

  const pageRespond = paginatePage(page);

  const results = {
      total,
      total_per_page: totalPerPage,
      current_page: currentPage,
      first_page: pageRespond.first_page,
      last_page: pageRespond.last_page,
      previous_page: pageRespond.previous_page,
      next_page: pageRespond.next_page,
      [fieldName]: currentData,
    } as PaginateRespond<T>;

  return results;
}
