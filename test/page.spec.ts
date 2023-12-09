import { PaginateFilterParameter } from "../src/interfaces/option";
import { PaginatePage, paginatePage, paginatePageUrl } from "../src/page";

describe('total page response from pagination', () => {
    describe('the page only has 1 in total', () => {
        const page: PaginatePage = {
            current: 1,
            last: 1,
        };
    
        const paginate = paginatePage(page);

        test('previous and next page should be empty', () => {
            expect(paginate.previous_page).toBeNull();
            expect(paginate.next_page).toBeNull();
        });

        test('first and last page should be current', () => {
            expect(paginate.first_page).toBe(page.current);
            expect(paginate.last_page).toBe(page.current);
        });
    });

    describe('the page have 2 in total', () => {
        const totalPage = 2;

        describe('current page is 1', () => {
            const page: PaginatePage = {
                current: 1,
                last: totalPage,
            };

            const paginate = paginatePage(page);

            test('previous page should be empty', () => {
                expect(paginate.previous_page).toBeNull();
            });

            test('next page should be 2', () => {
                expect(paginate.next_page).toBe(page.last);
            });

            test('first page should be current', () => {
                expect(paginate.first_page).toBe(page.current);
            });

            test('last page should be 2', () => {
                expect(paginate.last_page).toBe(page.last);
            });
        });

        describe('current page is 2', () => {
            const page: PaginatePage = {
                current: 2,
                last: totalPage,
            };

            const paginate = paginatePage(page);

            test('previous page should be 1', () => {
                expect(paginate.previous_page).toBe(1);
            });

            test('next page should be empty', () => {
                expect(paginate.next_page).toBeNull();
            });

            test('first page should be 1', () => {
                expect(paginate.first_page).toBe(1);
            });

            test('last page should be current', () => {
                expect(paginate.last_page).toBe(page.current);
            });
        });
    });
    
    describe('the page have 3 in total', () => {
        const totalPage = 3;

        describe('current page is 1', () => {
            const page: PaginatePage = {
                current: 1,
                last: totalPage,
            };

            const paginate = paginatePage(page);

            test('previous page should be empty', () => {
                expect(paginate.previous_page).toBeNull();
            });

            test('next page should be 2', () => {
                expect(paginate.next_page).toBe(2);
            });

            test('first page should be current', () => {
                expect(paginate.first_page).toBe(page.current);
            });

            test('last page should be 3', () => {
                expect(paginate.last_page).toBe(page.last);
            });
        });

        describe('current page is 2', () => {
            const page: PaginatePage = {
                current: 2,
                last: totalPage,
            };

            const paginate = paginatePage(page);

            test('previous page should be 1', () => {
                expect(paginate.previous_page).toBe(1);
            });

            test('next page should be 3', () => {
                expect(paginate.next_page).toBe(page.last);
            });

            test('first page should be 1', () => {
                expect(paginate.first_page).toBe(1);
            });

            test('last page should be 3', () => {
                expect(paginate.last_page).toBe(page.last);
            });
        });

        describe('current page is 3', () => {
            const page: PaginatePage = {
                current: 3,
                last: totalPage,
            };

            const paginate = paginatePage(page);

            test('previous page should be 2', () => {
                expect(paginate.previous_page).toBe(2);
            });

            test('next page should be empty', () => {
                expect(paginate.next_page).toBeNull();
            });

            test('first page should be 1', () => {
                expect(paginate.first_page).toBe(1);
            });

            test('last page should be current', () => {
                expect(paginate.last_page).toBe(page.current);
            });
        });
    });
});

describe('total page response from pagination with url', () => {
    const url = 'example.com';
    
    describe('filter or query parameter', () => {
        test('default filter', () => {
            const filterParams: PaginateFilterParameter = {
                search: 'test',
                limit: 1,
                page: 1,
            };

            const lastPage = 1;

            const paginate = paginatePageUrl(
                url, 
                lastPage,
                filterParams
            );

            const urlResponse = 'example.com?search=test&limit=1&page=1';

            expect(paginate.path).toMatch(urlResponse);
        });

        test('custom filter', () => {
            interface CustomFilter extends PaginateFilterParameter {
                test: string;
            }

            const lastPage = 5;

            const CustomFilter: CustomFilter = {
                limit: 2,
                page: 3,
                search: 'slur',
                test: 'euy',
            };

            const paginate = paginatePageUrl(
                url, 
                lastPage,
                CustomFilter
            );

            const urlResponse = 'example.com?test=euy&search=slur&limit=2&page=3';

            expect(paginate.path).toMatch(urlResponse);
        });
    });

    describe('the page only has 1 in total', () => {
        const filterParams: PaginateFilterParameter = {
            limit: 1,
            page: 1,
        };

        const lastOrTotalPage = 1;

        const paginate = paginatePageUrl(
            url, 
            lastOrTotalPage, 
            filterParams
        );

        test('previous and next page should be empty', () => {
            expect(paginate.previous_page_url).toBeNull();
            expect(paginate.next_page_url).toBeNull();
        });

        test('first and last page should be current', () => {
            const urlResponse = 'example.com?limit=1&page=1';

            expect(paginate.first_page_url).toMatch(urlResponse);
            expect(paginate.last_page_url).toMatch(urlResponse);
        });
    });
    
    describe('the page have 2 in total', () => {
        const totalPage = 2;

        describe('current page is 1', () => {
            const filterParams: PaginateFilterParameter = {
                limit: 1,
                page: 1,
            };

            const lastPage = totalPage;

            const paginate = paginatePageUrl(
                url, 
                lastPage, 
                filterParams
            );

            test('previous page should be empty', () => {
                expect(paginate.previous_page_url).toBeNull();
            });

            test('next page should be 2', () => {
                const urlResponse = `example.com?limit=1&page=${lastPage}`
                expect(paginate.next_page_url).toMatch(urlResponse);
            });

            test('first page should be current', () => {
                const urlResponse = `example.com?limit=1&page=${filterParams.page}`;
                expect(paginate.first_page_url).toMatch(urlResponse);
            });

            test('last page should be 2', () => {
                const urlResponse = `example.com?limit=1&page=${lastPage}`
                expect(paginate.last_page_url).toMatch(urlResponse);
            });
        });

        describe('current page is 2', () => {
            const filterParams: PaginateFilterParameter = {
                limit: 1,
                page: 2,
            };

            const lastPage = totalPage;

            const paginate = paginatePageUrl(
                url, 
                lastPage, 
                filterParams
            );

            test('previous page should be 1', () => {
                const urlResponse = `example.com?limit=1&page=1`;
                expect(paginate.previous_page_url).toMatch(urlResponse);
            });

            test('next page should be empty', () => {
                expect(paginate.next_page_url).toBeNull();
            });

            test('first page should be 1', () => {
                const urlResponse = `example.com?limit=1&page=1`;
                expect(paginate.first_page_url).toMatch(urlResponse);
            });

            test('last page should be current', () => {
                const urlResponse = `example.com?limit=1&page=${filterParams.page}`;
                expect(paginate.last_page_url).toMatch(urlResponse);
            });
        });
    });
    
    describe('the page have 3 in total', () => {
        const totalPage = 3;

        describe('current page is 1', () => {
            const filterParams: PaginateFilterParameter = {
                limit: 1,
                page: 1,
            };

            const lastPage = totalPage;

            const paginate = paginatePageUrl(
                url, 
                lastPage, 
                filterParams
            );

            test('previous page should be empty', () => {
                expect(paginate.previous_page_url).toBeNull();
            });

            test('next page should be 2', () => {
                const urlResponse = `example.com?limit=1&page=2`
                expect(paginate.next_page_url).toMatch(urlResponse);
            });

            test('first page should be current', () => {
                const urlResponse = `example.com?limit=1&page=${filterParams.page}`;
                expect(paginate.first_page_url).toMatch(urlResponse);
            });

            test('last page should be 3', () => {
                const urlResponse = `example.com?limit=1&page=${lastPage}`;
                expect(paginate.last_page_url).toMatch(urlResponse);
            });
        });

        describe('current page is 2', () => {
            const filterParams: PaginateFilterParameter = {
                limit: 1,
                page: 2,
            };

            const lastPage = totalPage;

            const paginate = paginatePageUrl(
                url, 
                lastPage, 
                filterParams
            );

            test('previous page should be 1', () => {
                const urlResponse = `example.com?limit=1&page=1`
                expect(paginate.previous_page_url).toMatch(urlResponse);
            });

            test('next page should be 3', () => {
                const urlResponse = `example.com?limit=1&page=${lastPage}`
                expect(paginate.next_page_url).toMatch(urlResponse);
            });

            test('first page should be 1', () => {
                const urlResponse = `example.com?limit=1&page=1`
                expect(paginate.first_page_url).toMatch(urlResponse);
            });

            test('last page should be 3', () => {
                const urlResponse = `example.com?limit=1&page=${lastPage}`
                expect(paginate.last_page_url).toMatch(urlResponse);
            });
        });

        describe('current page is 3', () => {
            const filterParams: PaginateFilterParameter = {
                limit: 1,
                page: 3,
            };

            const lastPage = totalPage;

            const paginate = paginatePageUrl(
                url, 
                lastPage, 
                filterParams
            );

            test('previous page should be 1', () => {
                const urlResponse = `example.com?limit=1&page=2`;
                expect(paginate.previous_page_url).toMatch(urlResponse);
            });

            test('next page should be empty', () => {
                expect(paginate.next_page_url).toBeNull();
            });

            test('first page should be 1', () => {
                const urlResponse = `example.com?limit=1&page=1`
                expect(paginate.first_page_url).toMatch(urlResponse);
            });

            test('last page should be current', () => {
                const urlResponse = `example.com?limit=1&page=${filterParams.page}`
                expect(paginate.last_page_url).toMatch(urlResponse);
            });
        });
    });
});
