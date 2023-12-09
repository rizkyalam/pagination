type ChunkPage = {
  page: number;
  data: any[];
};

export function chunkPerPage<T extends any[]>(data: T, limit: number): ChunkPage[] {
  const isFloat = (n: number): boolean => Number(n) === n && n % 1 !== 0;

  const formula = data.length / limit;
  const total = isFloat(formula) ? Math.ceil(formula) : formula;

  const results: ChunkPage[] = [];
  for (let i = 0; i < total; i++) {
    const currentPage = i + 1;
    const start = i * limit;
    const end = currentPage * limit;

    const chunks = data.slice(start, end);
    results.push({
      page: currentPage,
      data: chunks,
    });
  }

  return results;
}
