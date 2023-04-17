import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('Teste a função fetchProduct', () => {
  it('fetchProduct deve ser uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetchProduct deve chamar a função fetch com o endpoint correto', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(product),
    }));

    const id = 'MLB1405519561';
    const endpoint = `https://api.mercadolibre.com/items/${id}`;

    await fetchProduct(id);

    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });

  it('fetchProduct deve retornar uma estrutura de dados igual ao objeto product', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(product),
    }));

    const id = 'MLB1405519561';
    const result = await fetchProduct(id);

    expect(result).toEqual(product);
  });

  it('fetchProduct deve lançar um erro quando não recebe o argumento "id"', async () => {
    await expect(fetchProduct()).rejects.toThrowError('ID não informado');
  });
});
