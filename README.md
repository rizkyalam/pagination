# Pagination
Simple pagination for typescript or javascript project you can use
## Installation

```sh
  npm install @rizkyalam/pagination
```

## Usage

There are two types of functions that can be used, namely `paginate()` and `paginateUrl()`

  - paginate()

    ```javascript
    const peoples = [
        { name: 'Asep', age: 21, address: 'Bandung' },
        { name: 'Komar', age: 23, address: 'Jakarta' },
    ];

    const options = {
        search: 'a',
        limit: 1,
        currentPage: 1,
        fieldName: 'peoples',
        sort: [
            ['age', 'desc'],
        ],
    };

    paginate(peoples, options);
    ```

 - paginateUrl()

    ```javascript
    const peoples = [
        { name: 'Asep', age: 21, address: 'Bandung' },
        { name: 'Komar', age: 23, address: 'Jakarta' },
    ];

    const options = {
        path: 'example.com',
        filterParams: {
            search: 'a',
            limit: 1,
            page: 1,
        },
        fieldName: 'peoples',
        sort: [
            ['age', 'desc'],
        ],
    };

    paginateUrl(peoples, options);
    ```

### Importing

you can use both importing ES6 and CommonJS module

```javascript
import Pagination from '@rizkyalam/pagination'

// or

const Pagination = require('@rizkyalam/pagination')
```
### Directly in HTML

you can build manual this project and then directly import to html

```sh
npm run build
```

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="pagination/dist"></script>
  </head>
  <body>
    <script>
        var peoples = [
            { name: 'Asep', age: 21, address: 'Bandung' },
            { name: 'Komar', age: 23, address: 'Jakarta' },
        ];

        var paginateOptions = {
            fieldName: 'peoples',
        }

        var paginate = Pagination.paginate(peoples, paginateOptions);

        var paginateUrlOptions = {
            path: 'example.com',
            filterParams: {
                search: 'Asep',
            },
        }

        var paginateUrl = Pagination.paginateUrl(peoples, paginateUrlOptions);
    </script>
  </body>
</html>
```
## Interface or Type

**Note:** this section can use for Typescript project

### Options Interface or Type

Setup Pagination Option

### OptionOrder

there is 2 ordering mode: `asc` and `desc`

```typescript
type Mode = 'asc' | 'desc';

type KeySort = string;

type OptionOrder = [KeySort, Mode];
```

### PaginateOptions

**Note:** use for `paginate()` options 

In this interface there are several key with their functions:
   - `search` used to search the entire data
   - `limit` used to limit the amount of data per page
   - `currentPage` used to get data on the specified page
   - `fieldName` used to determine the key response for the default is ***data***
   - `sort` used to sorting data based on `type OptionOrder`

```typescript
// usage
interface PaginateOptions {
  search?: string | boolean | number;
  limit?: number;
  currentPage?: number;
  fieldName?: string;
  sort?: OptionOrder[];
}

const options: PaginateOptions = {
    search: 'test',
    limit: 1,
    currentPage: 1,
    fieldName: 'defaultData',
    sort: [
        ['order', 'asc'],
    ],
}
```

### PaginateFilterParameter

In this interface there are several key with their functions:
   - `search` used to search the entire data
   - `limit` used to limit the amount of data per page
   - `page` used to get data on the specified page

**Note:** this interface can use to make print response custom query string with the url

```typescript
// usage
interface PaginateFilterParameter {
    search?: string | boolean | number;
    limit?: number;
    page?: number;
}

interface CustomFilter extends PaginateFilterParameter {
    test: string,
}

const customFilter: CustomFilter = {
    limit: 2,
    page: 3,
    search: 'slur',
    test: 'euy',
};
```

### PaginateUrlOptions

**Note:** use for `paginateUrl()` options 

In this interface there are several key with their functions:
   - `path` used to print the output with your url
   - `filterParams` used to print url output by adding query string
   - `fieldName` used to determine the key response for the default is ***data***
   - `sort` used to sorting data based on `type OptionOrder`

```typescript
interface PaginateUrlOptions {
    path: string;
    filterParams: PaginateFilterParameter;
    fieldName?: string;
    sort?: OptionOrder[];
}

const options: PaginateUrlOptions = {
    path: 'example.com',
    filterParams: {
        search: 'test',
        limit: 1,
        currentPage: 1,
    },
    fieldName: 'defaultData',
    sort: [
        ['order', 'asc'],
    ],
};
```

### Response Interface or Type

### PaginateRespond

**Note:** use for `paginate()` respond

```typescript
{
    total: 6,
    total_per_page: 3,
    current_page: 2,
    first_page: 1,
    last_page: 2,
    previous_page: 1,
    next_page: null,
    data: [
        {
            // Record...
        },
    ],
}
```

### PaginateUrlRespond

**Note:** use for `paginateUrl()` respond

```typescript
{
    total: 3,
    total_per_page: 3,
    current_page: 1,
    path: 'example.com?search=test&limit=3&page=1',
    first_page_url: 'example.com?search=test&limit=3&page=1',
    last_page_url: 'example.com?search=test&limit=3&page=1',
    previous_page_url: null,
    next_page_url: null,
    data: [
        {
            // Record...
        },
    ],
}
```

If `fieldName` and `filterParams` are used with custom, the output will be customized

```typescript
const customFilter: PaginateUrlOptions = {
    path: 'example.com',
    filterParams: {
        limit: 2,
        page: 3,
        search: 'slur',
        test: 'euy',
    },
    fieldName: 'peoples',
};

// output
{
    total: 6,
    total_per_page: 2,
    current_page: 3,
    path: 'example.com?test=euy&search=slur&limit=2&page=3',
    first_page_url: 'example.com?test=euy&search=slur&limit=2&page=1',
    last_page_url: 'example.com?test=euy&search=slur&limit=2&page=3',
    previous_page_url: 'example.com?test=euy&search=slur&limit=2&page=2',
    next_page_url: null,
    peoples: [
        {
            // Record...
        },
    ],
}
```
