export type Mode = 'asc' | 'desc';

type KeySort = string;

export type OptionOrder = [KeySort, Mode];

type DuplicateValueOfKey = {
    value: any,
    index: number,
    total: number,
    previousKey?: string,
    previousValue?: any,
};

export type DuplicateValue = {
    key: string,
    duplicate: DuplicateValueOfKey[],
}

export type CountDuplicateValue = {
    [value: string]: number;
}

export function countDuplicateValue<T>(
    datas: T[], 
    keyOfData: string
): CountDuplicateValue {
    const counts: CountDuplicateValue = {};
    
    datas.forEach((data) => {
        const index = data[keyOfData];
        counts[index] = (counts[index] || 0) + 1;
    });
    
    return counts;
}

export function checkDuplicateValue<T>(
    datas: T[], 
    keyOfData: string
): DuplicateValue {
    const counts = countDuplicateValue(datas, keyOfData);

    const duplicate: DuplicateValueOfKey[] = [];

    for (const [key, value] of Object.entries(counts)) {
        if (value as number > 1) {
            const findIndex = datas.findIndex(data => data[keyOfData as keyof T] == key);

            duplicate.push({
                value: key as any,
                index: findIndex,
                total: value as number,
            });
        }
    }

    if (duplicate.length === 0) return {} as DuplicateValue;

    const duplicatedValue: DuplicateValue = {
        key: keyOfData,
        duplicate
    };

    return duplicatedValue;
}

export function sortMode<T>(datas: T[], option: OptionOrder): T[] {
    const [key, order] = option;

    const index = key as keyof T;

    const sortData = datas.sort((a, b) => {
        if (a[index] < b[index]) return -1;
        if (a[index] > b[index]) return 1;
        return 0;
    });

    if(order === 'desc') sortData.reverse();

    return sortData;
}

export function checkLastDuplicateValue<T extends any[]>(
    datas: T, 
    lastDuplicates: DuplicateValue, 
    mode: OptionOrder
): DuplicateValue {
    const [key] = mode;
    const newDuplicatesData = [];

    for (const duplicate of lastDuplicates.duplicate) {
        const index = {
            first: duplicate.index,
            last: duplicate.index + duplicate.total,
        };

        const slice = datas.slice(index.first, index.last);            
        const sliceSort = sortMode(slice, mode);

        // replace data dengan slice data yang sudah di sort
        sliceSort.forEach((sort, indexSort) => {
            const dataIndex: number = index.first + indexSort;
            datas[dataIndex] = sort;
        });

        const counts = countDuplicateValue(slice, key);

        for (const [keyCount, valueCount] of Object.entries(counts)) {
            if (valueCount as any > 1) {
                const previous = { 
                    key: lastDuplicates.key, 
                    value: duplicate.value 
                };

                const findIndex = datas.findIndex(data => {
                    return data[key] == keyCount && data[previous.key] == previous.value;
                });

                // ditambahkan data duplikasi sebelumnya supaya lebih memudahkan pengurutan
                newDuplicatesData.push({
                    previousKey: previous.key,
                    previousValue: previous.value,
                    value: keyCount,
                    index: findIndex,
                    total: valueCount,
                });
            }
        }
    }

    const duplicatedValue = {
        key,
        duplicate: newDuplicatesData,
    };

    return duplicatedValue;
}

export function sortPaginate<T extends any[]>(datas: T, options: OptionOrder[], duplicates: DuplicateValue[] = []): T {
    if (options.length === 0) {
        return datas;
    }

    let sortData: T[] = datas;
    const duplicateValues = [...duplicates];

    if (duplicateValues.length > 0) {
        const lastDuplicate = duplicates.slice(duplicates.length - 1)[0];
        const check = checkLastDuplicateValue(sortData, lastDuplicate, options[0]);
        duplicateValues.push(check);
    } else {
        sortData = sortMode(datas, options[0]);
        const [key] = options[0];
        const check = checkDuplicateValue(sortData, key);
        duplicateValues.push(check);
    }

    const orderCompletes = options.slice(1);

    return sortPaginate(sortData, orderCompletes, duplicateValues) as T;
}
