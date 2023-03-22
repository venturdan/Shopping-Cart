import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsContainer = document.querySelector('.products');

const response = await fetchProductsList('computador');

response.forEach((result) => {
  const resultElement = createProductElement(result);
  productsContainer.appendChild(resultElement);
});
