import './styles/style.scss';
import { characterWrapper, apiKey, baseUrl } from './variables';
import { DataResult, arrayOfObjects, Comic, Character } from './interfaces';

const request = (url: string): Promise<DataResult> => {
   let out = fetch(url).then(info => info.json());
   return out;
}
const searchByComic = 'comics';
const searchByCharacter = 'characters';
const searchByNameStart = 'nameStartsWith'
const navigations = document.querySelector('.navigation-list');
const mainContainer = document.getElementById('main-container');


function main(searchBy: string) {

   const getRequest = request(`${baseUrl}/public/${searchBy}?apikey=${apiKey}`);
   getRequest.then((response) => {

      const responseResult = response.data.results;
      clearWrapper(characterWrapper)
      switch (searchBy) {
         case 'comics':
            for (let item in responseResult) {
               createComic(responseResult[item])
            }
            break;
         case 'characters':
            for (let item in responseResult) {
               createCharacter(responseResult[item])
            }
            break
      }
   })
}
main(searchByComic);

function createComic(item: Comic) {
   let imagePath: string;
   let extension: string;
   if (typeof item.images[0] !== typeof undefined) {
      imagePath = item.images[0].path;
      extension = item.images[0].extension;
   } else {
      return false;
   }
   characterWrapper.innerHTML += `
      <div class="character-item">
         <div class="character-item__picture">
            <img src="${imagePath}.${extension}" alt="" srcset="">
         </div>
         <div class="character-item__name">
            ${item.title}
         </div>
      </div>
   `
}
function createCharacter(item: Character) {
   let character = item.thumbnail.path;
   if (character.match(/image_not_available/)) {
      return false
   }
   characterWrapper.innerHTML += `
      <div class="character-item">
         <div class="character-item__picture">
            <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="" srcset="">
         </div>
         <div class="character-item__name">
            ${item.name}
         </div>
      </div>
   `
}

navigations.addEventListener('click', (event) => {
   const target = event.target as Element;
   const currentOption = target.getAttribute('data-setting')
   switch (currentOption) {
      case 'comic':
         main(searchByComic);
         break;
      case 'characters': {
         main(searchByCharacter);
         break;
      }
      case 'searching': {
         clearWrapper(characterWrapper);
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
   clearWrapper(characterWrapper);
   const getRequest = request(`${baseUrl}/public/${searchByCharacter}?${searchByNameStart}=${input.value}&apikey=${apiKey}`);
   getRequest.then(response => {
      const responseResult = response.data.results;
      for (let item in responseResult) {
         createCharacter(responseResult[item])
      }
   })
}
function clearWrapper(element) {
   element.innerHTML = '';
}


