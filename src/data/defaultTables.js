export const createDefaultTables = () =>
  Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    estado: 'libre',
    items: [],
    total: 0,
    cliente: '',
    abiertaEn: null
  }));
