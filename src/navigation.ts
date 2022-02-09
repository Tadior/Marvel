import {
   characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer
} from './variables';
import { resetPagination } from './pagination';
import { main, request } from './index';
navigations.addEventListener('click', (event) => {

   const target = event.target as Element;
   const isActive = (): boolean => {
      if (target.classList.contains('nav--active')) {
         return true;
      }
   };
   if (isActive()) {
      return false
   }

   const currentOption = target.getAttribute('data-setting');

   function switchNavActive(currentTarget: Element) {
      document.querySelector('.nav--active').classList.remove('nav--active');
      currentTarget.classList.add('nav--active');
   }
   switchNavActive(target);

   switch (currentOption) {
      case 'comic': {
         resetPagination()
         isSearch();
         main(searchByComic);
         break;
      }
      case 'characters': {
         resetPagination()
         isSearch();
         main(searchByCharacter);
         break;
      }
      case 'searching': {
         clearElement(characterWrapper);
         const searchElement = document.createElement('div')
         searchElement.classList.add('search');
         searchElement.innerHTML =
            `
            <div class="search">
               <input id='search-input' class="search-input" type="text" placeholder="Search">
            </div>
         `

         mainContainer.prepend(searchElement)

         const searchInput = document.getElementById('search-input');
         searchInput.addEventListener('keyup', () => search(searchInput));
         break;
      }
   }
})

function search(input) {
   clearElement(characterWrapper);
   const getRequest = request(`${baseUrl}/public/${searchByCharacter}?${searchByNameStart}=${input.value}&apikey=${apiKey}`);
   getRequest.then(response => {
      const responseResult = response.data.results;
      for (let item in responseResult) {
         //createItem(responseResult[item]);
         //createItems(responseResult[item]);
      }
   })
}

function clearElement(element) {
   element.innerHTML = '';
}
function isSearch() {
   const search = document.querySelector('.search');
   search ? search.remove() : false
}
export { clearElement }