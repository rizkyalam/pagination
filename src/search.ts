export function searchKeyword<T extends any[]>(data: T, keywords: string): T {
    const searchData = [];
    
    const pattern = new RegExp(keywords, 'gi');
    data.forEach((index) => {
        let totalMatches = 0;

        for (const [, value] of Object.entries(index)) {
            if (value === null) continue;
            const match = pattern.test(value.toString());
            if (match) totalMatches++;
        }

        if (totalMatches > 0) searchData.push(index);
    });

    return searchData as T;
}
