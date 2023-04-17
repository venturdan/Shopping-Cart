export const getAddress = (cep) => {
  const apiUrls = [
    `https://cep.awesomeapi.com.br/json/${cep}`,
    `https://brasilapi.com.br/api/cep/v2/${cep}`,
  ];

  const promises = apiUrls.map((url) => fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }));

  return Promise.any(promises).then((data) => {
    const { address, street, district, neighborhood, city, state } = data;
    return {
      street: address || street,
      neighborhood: district || neighborhood,
      city,
      state,
    };
  });
};

export const searchCep = () => {
  const cepInput = document.querySelector('.cep-input');
  const addressSpan = document.querySelector('.cart__address');
  const CEP_LENGTH = 8;

  if (cepInput.value.length === CEP_LENGTH) {
    getAddress(cepInput.value)
      .then(({ street, neighborhood, city, state }) => {
        const fullAddress = `${street} - ${neighborhood} - ${city} - ${state}`;
        addressSpan.textContent = fullAddress;
      })
      .catch(() => {
        addressSpan.textContent = 'CEP não encontrado';
      });
  }
};
