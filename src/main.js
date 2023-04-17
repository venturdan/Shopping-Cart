import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

const productsSection = document.querySelector('.products');

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
      const novoProduto = createCartProductElement(item);
      document.querySelector('.cart__products').appendChild(novoProduto);
    });
  }
};
recuperarCarrinho();
