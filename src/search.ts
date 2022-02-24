import { mainContainer, paginationContainer, characterWrapper, baseUrl, requestVariables, iterationLimit, apiKey } from './variables';
import { getResponse } from './index';
import { setItem } from './setItem';
const isSearch = () => document.querySelector('.search');
const clearSearch = () => mainContainer.removeChild(mainContainer.querySelector('.search'))
function setSearch() {
   characterWrapper.innerHTML = ''
   paginationContainer.classList.add('pagination--fade');
   const searchDiv = document.createElement('div');
   searchDiv.classList.add('search');
   searchDiv.innerHTML = "<input id='search-input' class='search__input'>"
   mainContainer.prepend(searchDiv);
   const input: HTMLInputElement = searchDiv.querySelector('.search__input');
   input.addEventListener('keyup', () => search(input.value))
}
function search(name: string) {
   characterWrapper.innerHTML = ''
   const response = getResponse(`${baseUrl}/public/characters?nameStartsWith=${name}&apikey=${apiKey}`);
   response.then((responseData: DataResult) => {
      const result = responseData.data.results;
      for (let key in result) {
         if (!result[key].thumbnail.path.includes('image_not_available')) {
            console.log(result[key])
            let imagePath = result[key].images ? result[key].images[0].path : result[key].thumbnail.path
            let extension = result[key].images ? result[key].images[0].extension : result[key].thumbnail.extension;
            let title = result[key].name ? result[key].name : result[key].title;
            const newItem = document.createElement('div');
            newItem.classList.add('character-item');
            newItem.innerHTML = `
            <div class="character-item__picture">
               <img src="${imagePath}.${extension}" alt="${title}" srcset="">
            </div>
            <div class="character-item__name">
               ${title}
            </div>
            `
            characterWrapper.append(newItem);
         }
      }
   });
}
export { setSearch, isSearch, clearSearch }