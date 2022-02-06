import './styles/style.scss';
import { characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer } from './variables';
import { DataResult, arrayOfObjects, Comic, Character, ArrayOfComics, ArrayOfCharacters } from './interfaces';

const request = (url: string): Promise<DataResult> => {
   let out = fetch(url).then(info => info.json());
   return out;
}
let checkedComics: ArrayOfComics[] = [];
let checkedCharacters: ArrayOfCharacters[] = [];
let limitValue = 100;
let offsetValue = 0;

function main(searchBy: string) {
   const getRequest = request(`${baseUrl}/public/${searchBy}?limit=${limitValue}&offset=${offsetValue}&apikey=${apiKey}`);
   preloader();
   getRequest.then((response) => {
      const responseResult = response.data.results;
      clearElement(characterWrapper);
      //limitValue = limitValue + 20;
      switch (searchBy) {
         case 'comics':
            for (let item in responseResult) {
               checkItem(responseResult[item]);
            }
            createItems(checkedComics)
            break;
         case 'characters':
            for (let item in responseResult) {
               checkItem(responseResult[item]);
            }
            createItems(checkedCharacters)
            break;
      }
   })
}
//let checkedItems: Comic  = [];
main(searchByComic);
function checkItem(item: Comic): void;
function checkItem(item: Character): void;
function checkItem(item): void {
   if ('images' in item) {
      //console.log(item.images.length)
      if (item.images.length !== 0 && !item.images[0].path.includes('not_available')) {
         if (item.description !== '' && item.description !== '#N/A') {
            checkedComics.push(item);
         }
      }
   } else
      if ('thumbnail' in item) {
         //console.log(item)
         if (item.thumbnail.length !== 0 && !item.thumbnail.path.includes('not_available')) {
            if (item.description !== '' && item.description !== '#N/A') {
               checkedCharacters.push(item);
            }
         }
      }
}
//----------------------------------------
function createItems(item: ArrayOfComics[]): void; //Overload
function createItems(item: ArrayOfCharacters[]): void; //Overload
function createItems(item): any { //Overload main function
   let imagePath: string;
   let extension: string;
   let title: string;
   item.forEach(element => {
      if ('name' in element) {
         console.log(element)
         imagePath = element.thumbnail.path;
         extension = element.thumbnail.extension;
         title = element.name;
      } else if ('title' in element) {
         console.log(element.title)
         imagePath = element.images[0].path;
         extension = element.images[0].extension;
         title = element.title;
      }

      characterWrapper.innerHTML += `
         <div class="character-item">
            <div class="character-item__picture">
               <img src="${imagePath}.${extension}" alt="${title}" srcset="">
            </div>
            <div class="character-item__name">
               ${title}
            </div>
         </div>
         `
   });
}
//------------------------------------------

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
      case 'comic':
         isSearch();
         main(searchByComic);
         break;
      case 'characters': {
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

function preloader(): void {
   characterWrapper.innerHTML = `
   <img class='preloader' src='./assets/img/preloader.svg'>
   `
}
//-----Pagination----------------------
const paginationContainer = document.getElementById('pagination');
const paginationItems = paginationContainer.querySelectorAll('.pagination__item');
function setPaginationNumber() {
   for (let i = 0; i < paginationItems.length; i++) {
      paginationItems[i].textContent = (i + 1).toString();
   }
}
setPaginationNumber()

paginationContainer.addEventListener('click', (event) => {
   const target = event.target as Element;
   switch (target.id) {
      case 'previous':
         paginationItems[0].textContent === '1' ? false :
            paginationItems.forEach(element => {
               const currentValue = parseInt(element.textContent);
               element.textContent = (currentValue - 1).toString();
            })
         break;
      case 'next':
         paginationItems.forEach(element => {
            const currentValue = parseInt(element.textContent);
            element.textContent = (currentValue + 1).toString();
         })
         break;
   }
   if (target.classList.contains('pagination__item')) {
      const paginationActive = paginationContainer.querySelector('.pagination--active');
      paginationActive.classList.remove('pagination--active');
      target.classList.add('pagination--active')
   }
});
