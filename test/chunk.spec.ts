import { chunkPerPage } from "../src/chunk";

describe('total data is even', () => {
    const data = [
        {id: 1, name: 'Asep'},
        {id: 2, name: 'Bagus'},
        {id: 3, name: 'Cecep'},
        {id: 4, name: 'Desi'}
    ];
    
    test('data chunk only have 1 total page', () => {
        const limit = data.length;
        const chunk = chunkPerPage(data, limit);
    
        expect(chunk.length).toBe(1);
    });

    describe('data chunk have 2 total page', () => {
        const limit = 2;
        const chunk = chunkPerPage(data, limit);
    
        test('first page should have even data', () => {
           expect(chunk[0].data.length).toBe(2);
        });
    
        test('last page should have even data', () => {
            expect(chunk[1].data.length).toBe(2);
        });
    });
    
    test('data chunk should have 4 total page', () => {
        const limit = 1;
        const chunk = chunkPerPage(data, limit);
    
        expect(chunk.length).toBe(4);
    });
});

describe('total data is odd', () => {
    const data = [
        {id: 1, name: 'Asep'},
        {id: 2, name: 'Bagus'},
        {id: 3, name: 'Cecep'},
        {id: 4, name: 'Desi'},
        {id: 5, name: 'Engkos'},
    ];
    
    test('data chunk only have 1 total page', () => {
        const limit = data.length;
        const chunk = chunkPerPage(data, limit);
    
        expect(chunk.length).toBe(1);
    });

    describe('data chunk have 3 total page', () => {
        const limit = 2;
        const chunk = chunkPerPage(data, limit);
    
        test('first page should have even data', () => {
           expect(chunk[0].data.length).toBe(2);
        });

        test('second page should have even data', () => {
           expect(chunk[1].data.length).toBe(2);
        });
    
        test('last page should have odd data', () => {
            expect(chunk[2].data.length).toBe(1);
        });
    });
    
    test('data chunk should have 5 total page', () => {
        const limit = 1;
        const chunk = chunkPerPage(data, limit);
    
        expect(chunk.length).toBe(5);
    });
});
