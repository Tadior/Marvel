import { mainContainer, paginationContainer, characterWrapper, baseUrl, requestVariables, iterationLimit, apiKey } from './variables';
import { getResponse } from './index';
import { setItem } from './setItem';
import { addHttpsforImages } from './setItem';
const isSearch = () => document.querySelector('.search');
const clearSearch = () => mainContainer.removeChild(mainContainer.querySelector('.search'));
let searchBy;

function setSearch() {
   characterWrapper.innerHTML = ''
   paginationContainer.classList.add('pagination--fade');
   const searchDiv = document.createElement('div');
   searchDiv.classList.add('search');
   searchDiv.innerHTML = "<input id='search-input' class='search__input'>"
   mainContainer.prepend(searchDiv);
   const input: HTMLInputElement = searchDiv.querySelector('.search__input');
   input.addEventListener('keyup', () => {
      if (input.value.length > 0) {
         search(input.value)
      }
   })
   const searchByDiv = document.createElement('div');
   searchByDiv.classList.add('search-by');
   searchByDiv.innerHTML = `
   <div class='search-by__option search-by__option--active' data-type='events'>Events</div>
   <div class='search-by__option' data-type='creators'>Creators</div>
   <div class='search-by__option' data-type='series'>Series</div>
   `
   mainContainer.prepend(searchByDiv);
   searchBy = 'events';
   let searchButtonContainer = document.querySelector('.search-by');
   searchButtonContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('search-by__option--active')) {
         return undefined;
      };
      searchButtonContainer.querySelector('.search-by__option--active').classList.remove('search-by__option--active');
      target.classList.add('search-by__option--active');
      searchBy = target.getAttribute('data-type');
      search(input.value)
   })
}

function search(name: string) {
   characterWrapper.innerHTML = '';
   let response: Promise<DataResult>;
   if (searchBy === 'series') {
      response = getResponse(`${baseUrl}/public/${searchBy}?titleStartsWith=${name}&apikey=${apiKey}`);
   } else {
      response = getResponse(`${baseUrl}/public/${searchBy}?nameStartsWith=${name}&apikey=${apiKey}`);
   }
   response.then((responseData: DataResult) => {
      const result = responseData.data.results;
      if (Object.keys(result).length == 0) {
         characterWrapper.innerHTML = `
         <div class='error'>Data not found</div>
         `;
         return undefined;
      }
      for (let key in result) {
         if (!result[key].thumbnail.path.includes('image_not_available')) {
            setItem.bind(result[key])(result[key]);
         }
      }
   }).catch((error) => alert("Error, we're working on this problem"));
}

export { setSearch, isSearch, clearSearch }