import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions.js';
import { createProductElement } from './helpers/shopFunctions.js';
import { fetchProduct } from './helpers/fetchFunctions.js';
import './style.css';

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

const productsSection = document.querySelector('.products');

mostrarCarregando();

fetchProductsList('computador')
  .then((products) => {
    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsSection.appendChild(productElement);
    });
    esconderCarregando();
  })
  .catch((error) => {
    console.error(error);
    esconderCarregando();
  });

function showError(message) {
  const errorElement = document.createElement('div');
  errorElement.textContent = message;
  errorElement.classList.add('error');
  document.body.appendChild(errorElement);
}

function hideError() {
  const errorElement = document.querySelector('.error');
  if (errorElement) {
    errorElement.remove();
  }
}

async function fetchProduct(productId) {
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

document.querySelector('.cep-button').addEventListener('click', searchCep);
