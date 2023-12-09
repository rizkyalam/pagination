import { PaginateFilterParameter } from "./interfaces/option";
import { PaginatePageRespond, PaginateUrlPageRespond } from "./interfaces/respond";

export type PaginatePage = {
    current: number;
    last: number;
};

export function paginatePageUrl(
    url: string,
    last: number,
    filterParams: PaginateFilterParameter
): PaginateUrlPageRespond {
    const {search, limit, page} = filterParams;

    let paramsToUrlString = '?';

    for (const [key, value] of Object.entries(filterParams)) {
        // search, limit dan page di simpan di akhir supaya lebih mudah dibaca pada url
        if (key === 'limit' || key === 'page' || key === 'search') continue;
        paramsToUrlString += `${key}=${value}&`;
    }

    paramsToUrlString += search ? 
        `search=${search}&limit=${limit}` :
        `limit=${limit}`;

    const replaceLastSlashUrl = (url: string): string => {
        const replace = url.split('');
      
        const replaceLastIndex = replace.length - 1;
        if (replace[replaceLastIndex] !== '/') return url;

        replace.pop();
        return replace.join('');
    };

    const path: string =  replaceLastSlashUrl(url) + paramsToUrlString;

    const currentPath = `${path}&page=${page}`;
    const nextPage = page === last ? null : `${path}&page=${page + 1}`;
    const previousPage = page === 1 ? null : `${path}&page=${page - 1}`;
    const firstPage = `${path}&page=1`;
    const lastPage = `${path}&page=${last}`;

    const respond: PaginateUrlPageRespond = {
        current_page: page,
        path: currentPath,
        next_page_url: nextPage,
        previous_page_url: previousPage,
        first_page_url: firstPage,
        last_page_url: lastPage,
    };

    return respond;
}

export function paginatePage(
    page: PaginatePage,
): PaginatePageRespond {
    const { current, last } = page;

    const firstPage = 1;
    const nextPage = current === last ? null : current + 1;
    const previousPage = current === 1 ? null : current - 1;

    const respond: PaginatePageRespond = {
        current_page: current,
        first_page: firstPage,
        last_page: last,
        next_page: nextPage,
        previous_page: previousPage,
    };

    return respond;
}
