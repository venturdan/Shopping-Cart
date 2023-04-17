import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';

const productsSection = document.querySelector('.products');
document.querySelector('.cep-button').addEventListener('click', searchCep);

const listarProdutos = async () => {
  const listaDeProdutos = await fetchProductsList('computador');
  listaDeProdutos.forEach((produto) => {
    const addProduto = createCartProductElement(produto);
    productsSection.appendChild(addProduto);
  });
};
console.log(listarProdutos);

try {
  const mensagemCarregando = document.createElement('div');
  mensagemCarregando.classList.add('loading');
  mensagemCarregando.innerHTML = 'Carregando...';
  document.body.appendChild(mensagemCarregando);
  const listaDeComputadores = await fetchProductsList('computer');
  const loader = document.querySelector('.loading');
  console.log(loader);
  loader.remove();
  const secaoDeProdutos = document.querySelector('.products');
  listaDeComputadores.forEach((produto) => {
    secaoDeProdutos.appendChild(createProductElement(produto));
  });
} catch (erro) {
  const mensagemErro = document.createElement('div');
  mensagemErro.classList.add('error');
  mensagemErro.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  document.body.appendChild(mensagemErro);
}

const recuperarCarrinho = async () => {
  if (localStorage.getItem('cartProducts') !== null) {
    const idsSalvos = getSavedCartIDs();
    const arrayPromises = idsSalvos.map(async (idSalvo) => fetchProduct(idSalvo));
    const arrayProdutos = await Promise.all(arrayPromises);
    arrayProdutos.forEach((item) => {
      const cartProducts = createCartProductElement(item);
      document.querySelector('.cart__products').appendChild(cartProducts);
    });
  }
};
recuperarCarrinho();

const valorCarrinho = () => {
  if (localStorage.getItem('cartTotal') !== null) {
    const total = document.querySelector('.total-price');
    total.innerHTML = JSON.parse(localStorage.getItem('cartTotal'));
  }
};
valorCarrinho();
