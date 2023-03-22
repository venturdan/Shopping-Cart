function mostrarCarregando() {
  const loadingElement = document.createElement('div');
  loadingElement.classList.add('loading');
  loadingElement.textContent = 'Carregando...';
  document.body.appendChild(loadingElement);
}

function esconderCarregando() {
  const loadingElement = document.querySelector('.loading');
  if (loadingElement) {
    document.body.removeChild(loadingElement);
  }
}

export async function fetchProduct(productId) {
  if (!productId) {
    throw new Error('ID não informado');
  }

  try {
    mostrarCarregando();

    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();

    esconderCarregando();
    hideError();

    return data;
  } catch (error) {
    hideLoading();
    showError('Algum erro ocorreu, recarregue a página e tente novamente');
    throw error;
  }
}
export const fetchProductsList = async (searchTerm) => {
  if (!searchTerm) {
    throw new Error('Termo de busca não informado');
  }

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`);
  const data = await response.json();
  return data.results;
};
