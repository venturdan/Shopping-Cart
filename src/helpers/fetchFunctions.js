export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }

  const endpoint = `https://api.mercadolibre.com/items/${id}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Erro ao buscar produto');
  }

  const data = await response.json();

  return data;
};

export const fetchProductsList = async (searchTerm) => {
  if (!searchTerm) {
    throw new Error('Termo de busca não informado');
  }

  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  const data = await response.json();

  return data.results;
};
