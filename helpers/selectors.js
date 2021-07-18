export const loginSelectors = {
  usernameInput: '#UserUsername',
  passwordInput: '#UserPassword',
  submitButton: 'button[type=submit].btn.style1',
  loggedInProfile: '.login a[title="Meu Perfil"]'
};

export const searchResultSelectors = {
  resultDiv: '#resultado_busca_cont',
  resultItems: '#resultado_busca article > div',
  languageImage: 'img',
  itemName: 'div p:first-child a',
  itemDownloadLink: 'div p:first-child a',
  itemDescription: 'div p.data'
};

export const pages = {
  loginPage: 'http://legendas.tv/login',
  searchPage: 'http://legendas.tv/busca'
}

export const searchParam = {
  query: 'Breaking Bad'
}