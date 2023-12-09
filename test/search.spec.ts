import { searchKeyword } from "../src/search";

const data = [
    {id: 1, name: 'Asep', status: true},
    {id: 2, name: 'Bagus', status: false},
    {id: 3, name: 'Cecep', status: true},
    {id: 4, name: 'Desi', status: false},
    {id: 5, name: 'Engkos', status: true},
];

describe('search with boolean type keyword', () => {
    test('keyword is false', () => {
        const keyword = false;
        const search = searchKeyword(data, keyword.toString());
        
        expect(search.length).toBe(2);
    })

    test('keyword is true', () => {
        const keyword = true;
        const search = searchKeyword(data, keyword.toString());

        expect(search.length).toBe(3);
    })
})

test('search with number type keyword', () => {
    const keyword = 1;
    const search = searchKeyword(data, keyword.toString());

    expect(search.length).toBe(1);
});

describe('search with string type keyword', () => {
    test('keyword complete', () => {
        const keyword = 'Asep';
        const search = searchKeyword(data, keyword);

        expect(search.length).toBe(1);
    });

    test('keyword uncomplete', () => {
        const keyword = 'a';
        const search = searchKeyword(data, keyword);

        expect(search.length).toBe(3);
    });

    test('keyword string of number', () => {
        const keyword = '3';
        const search = searchKeyword(data, keyword);

        expect(search.length).toBe(1);
    });
});
