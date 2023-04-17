import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('fetchProduct', () => {
  test('é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  test('chama a função fetch com o endpoint correto', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(product) }));
    const id = 'MLB1405519561';
    await fetchProduct(id);
    expect(global.fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/${id}`);
  });

  test('retorna o objeto produto correto', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(product) }));
    const id = 'MLB1405519561';
    const result = await fetchProduct(id);
    expect(result).toEqual(product);
  });

  test('lança um erro quando o id não é informado', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });

  test('lança um erro quando a busca falha', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    const id = 'MLB1405519561';
    await expect(fetchProduct(id)).rejects.toThrow('Erro ao buscar produto');
  });
});
