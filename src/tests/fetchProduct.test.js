import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it("fetchProductsList is a function", () => {
    expect(typeof fetchProductsList).toBe("function");
  });

  it("should call fetch when executing fetchProductsList with 'computador'", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    await fetchProductsList("computador");

    expect(window.fetch).toHaveBeenCalled();
  });

  it("should call fetch with correct URL when executing fetchProductsList with 'computador'", async () => {
    const expectedUrl = `${defaultEndpoint}/search?q=computador`;
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    await fetchProductsList("computador");

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it("should return an object with the correct properties when executing fetchProductsList with 'computador'", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(computadorSearch),
    });

    const result = await fetchProductsList("computador");

    expect(result).toEqual(computadorSearch);
  });

  it("should return an error message when executing fetchProductsList without an argument", async () => {
    const errorMessage = "Termo de busca não informado";
    const expectedError = new Error(errorMessage);

    try {
      await fetchProduct();
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });
});
