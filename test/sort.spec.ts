import { 
    CountDuplicateValue, 
    DuplicateValue, 
    OptionOrder, 
    Mode, 
    checkDuplicateValue, 
    checkLastDuplicateValue, 
    countDuplicateValue, 
    sortMode, 
    sortPaginate 
} from "../src/sort";

type Person = {
    name: string;
    age: number;
    address: string;
}

const peoples: Person[] = [
    { name: 'Jajang', age: 19, address: 'Bandung' },
    { name: 'Sarah', age: 21, address: 'Surabaya' },
    { name: 'Dika', age: 19, address: 'Jakarta' },
    { name: 'Henri', age: 30, address: 'Manado' },
    { name: 'Yayat', age: 21, address: 'Bandung' },
    { name: 'Adit', age: 19, address: 'Surabaya' },
    { name: 'Sarah', age: 21, address: 'Jakarta' },
    { name: 'Adit', age: 19, address: 'Aceh' },
];

describe('test sort mode function', () => {
    const keyOfPerson = 'name';

    test('ascending', () => {
        const mode: Mode = 'asc';
        const option: OptionOrder = [keyOfPerson, mode];
        const sort = sortMode(peoples, option);

        const results: Person[] = [
            { name: 'Adit', age: 19, address: 'Surabaya' },
            { name: 'Adit', age: 19, address: 'Aceh' },
            { name: 'Dika', age: 19, address: 'Jakarta' },
            { name: 'Henri', age: 30, address: 'Manado' },
            { name: 'Jajang', age: 19, address: 'Bandung' },
            { name: 'Sarah', age: 21, address: 'Surabaya' },
            { name: 'Sarah', age: 21, address: 'Jakarta' },
            { name: 'Yayat', age: 21, address: 'Bandung' }
        ];

        expect(sort).toEqual(results);
    });
        
    test('descending', () => {
        const mode: Mode = 'desc';
        const option: OptionOrder = [keyOfPerson, mode];
        const sort = sortMode(peoples, option);

        const results: Person[] = [
            { name: 'Yayat', age: 21, address: 'Bandung' },
            { name: 'Sarah', age: 21, address: 'Jakarta' },
            { name: 'Sarah', age: 21, address: 'Surabaya' },
            { name: 'Jajang', age: 19, address: 'Bandung' },
            { name: 'Henri', age: 30, address: 'Manado' },
            { name: 'Dika', age: 19, address: 'Jakarta' },
            { name: 'Adit', age: 19, address: 'Aceh' },
            { name: 'Adit', age: 19, address: 'Surabaya' }
        ];

        expect(sort).toEqual(results);
    });
})

describe('check data duplicate', () => {
    describe('count of data duplicate', () => {
        const keyOfPeoples = 'name';
        const counts = countDuplicateValue(peoples, keyOfPeoples);
    
        test('results should be equal', () => {
            const results: CountDuplicateValue = { 
                Dika: 1,
                Henri: 1, 
                Jajang: 1, 
                Yayat: 1, 
                Sarah: 2, 
                Adit: 2
            };
    
            expect(counts).toEqual(results);
        });
    
        test('count duplicate data more than 1', () => {
            const duplicate: any[] = [];
            for (const [key, value] of Object.entries(counts)) {
                if (value as number > 1) duplicate.push(key);
            }
            expect(duplicate.length).toBe(2);
        });
    });

    describe('check if no data has previously been duplicated', () => {
        const keyOfPeoples = 'name';
        const check = checkDuplicateValue(peoples, keyOfPeoples);
        const results: DuplicateValue = {
            key: 'name',
            duplicate: [
              { value: 'Sarah', index: 1, total: 2 },
              { value: 'Adit', index: 5, total: 2 },
            ],
        };

        expect(check).toEqual(results);
    });

    describe('check if no data has previously been duplicated', () => {
        const sortPeoples: Person[] = [
            { name: 'Jajang', age: 19, address: 'Bandung' },
            { name: 'Adit', age: 19, address: 'Surabaya' },
            { name: 'Dika', age: 19, address: 'Jakarta' },
            { name: 'Adit', age: 19, address: 'Aceh' },
            { name: 'Sarah', age: 21, address: 'Jakarta' },
            { name: 'Yayat', age: 21, address: 'Bandung' },
            { name: 'Sarah', age: 21, address: 'Surabaya' },
            { name: 'Henri', age: 30, address: 'Manado' }
        ];

        const previousDuplicate: DuplicateValue = {
            key: 'age',
            duplicate: [
              { value: '19', index: 0, total: 4 },
              { value: '21', index: 4, total: 3 }
            ]
        };

        const optionOrder: OptionOrder = ['name', 'asc'];
        const check = checkLastDuplicateValue(sortPeoples, previousDuplicate, optionOrder);

        const newDuplicate: DuplicateValue = {
            key: 'name',
            duplicate: [
                { 
                    previousKey: 'age',
                    previousValue: '19',
                    value: 'Adit', 
                    index: 0, 
                    total: 2
                },
                { 
                    previousKey: 'age',
                    previousValue: '21',
                    value: 'Sarah', 
                    index: 4, 
                    total: 2 
                },
            ],
        };

        expect(check).toEqual(newDuplicate);
    });
});

describe('sort paginate if have 1 more option mode', () => {
    test('sort mode have 2 option', () => {
        const options: OptionOrder[] = [
            ['age', 'desc'],
            ['name', 'asc'],
        ];

        const sort = sortPaginate(peoples, options);

        const results: Person[] = [
            { name: 'Henri', age: 30, address: 'Manado' },
            { name: 'Sarah', age: 21, address: 'Surabaya' },
            { name: 'Sarah', age: 21, address: 'Jakarta' },
            { name: 'Yayat', age: 21, address: 'Bandung' },
            { name: 'Adit', age: 19, address: 'Surabaya' },
            { name: 'Adit', age: 19, address: 'Aceh' },
            { name: 'Dika', age: 19, address: 'Jakarta' },
            { name: 'Jajang', age: 19, address: 'Bandung' }
        ];

        expect(sort).toEqual(results);
    });

    test('sort mode have 3 option', () => {
        const options: OptionOrder[] = [
            ['age', 'asc'],
            ['name', 'desc'],
            ['address', 'asc'],
        ];

        const sort = sortPaginate(peoples, options);

        const results: Person[] = [
            { name: 'Jajang', age: 19, address: 'Bandung' },
            { name: 'Dika', age: 19, address: 'Jakarta' },
            { name: 'Adit', age: 19, address: 'Aceh' },
            { name: 'Adit', age: 19, address: 'Surabaya' },
            { name: 'Yayat', age: 21, address: 'Bandung' },
            { name: 'Sarah', age: 21, address: 'Jakarta' },
            { name: 'Sarah', age: 21, address: 'Surabaya' },
            { name: 'Henri', age: 30, address: 'Manado' },
        ];

        expect(sort).toEqual(results);
    });
});
