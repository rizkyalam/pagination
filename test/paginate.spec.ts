import { PaginateFilterParameter, PaginateOptions, PaginateUrlOptions } from '../src/interfaces/option';
import { paginate, paginateUrl } from '../src/paginate';
import { OptionOrder } from '../src/sort';

type Person = {
    name: string;
    age: number;
    address: string;
}

const peoples: Person[] = [
    { name: 'Sari', age: 21, address: 'Surabaya' },
    { name: 'Jajang', age: 19, address: 'Bandung' },
    { name: 'Dika', age: 19, address: 'Jakarta' },
    { name: 'Eka', age: 30, address: 'Palembang' },
    { name: 'Yayat', age: 21, address: 'Bandung' },
    { name: 'Rohim', age: 19, address: 'Surabaya' },
    { name: 'Henri', age: 30, address: 'Manado' },
    { name: 'Sari', age: 21, address: 'Jakarta' },
    { name: 'Rohim', age: 19, address: 'Aceh' },
];

test('pagination without url', () => {
    const sort: OptionOrder[] = [
        ['age', 'desc'],
        ['address', 'asc']
    ];

    const options: PaginateOptions = {
        search: 'i',
        limit: 3,
        currentPage: 2,
        fieldName: 'peoples',
        sort,
    };

    const pagination = paginate(peoples, options);

    const results = {
        total: peoples.length,
        total_per_page: options.limit,
        current_page: options.currentPage,
        first_page: 1,
        last_page: options.currentPage,
        previous_page: 1,
        next_page: null,
        peoples: [
          { name: 'Rohim', age: 19, address: 'Aceh' },
          { name: 'Dika', age: 19, address: 'Jakarta' },
          { name: 'Rohim', age: 19, address: 'Surabaya' }
        ],
    };

    expect(pagination).toEqual(results);
});

test('pagination with url', () => {
    const url = 'example.com';

    const filterParams: PaginateFilterParameter = {
        limit: 3,
        search: 'i',
        page: 2,
    };

    const sort: OptionOrder[] = [
        ['age', 'desc'],
        ['address', 'asc']
    ];

    const options: PaginateUrlOptions = {
        path: url,
        filterParams,
        fieldName: 'peoples',
        sort,
    };

    const paginate = paginateUrl(peoples, options);

    const results = {
        total: peoples.length,
        total_per_page: filterParams.limit,
        current_page: filterParams.page,
        path: `${url}?search=${filterParams.search}&limit=${filterParams.limit}&page=${filterParams.page}`,
        first_page_url: `${url}?search=${filterParams.search}&limit=${filterParams.limit}&page=1`,
        last_page_url: `${url}?search=${filterParams.search}&limit=${filterParams.limit}&page=${filterParams.page}`,
        previous_page_url: `${url}?search=${filterParams.search}&limit=${filterParams.limit}&page=1`,
        next_page_url: null,
        peoples: [
          { name: 'Rohim', age: 19, address: 'Aceh' },
          { name: 'Dika', age: 19, address: 'Jakarta' },
          { name: 'Rohim', age: 19, address: 'Surabaya' }
        ],
    };

    expect(paginate).toEqual(results);
});
