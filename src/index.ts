import './styles/style.scss';
import { characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer } from './variables';
import { DataResult, arrayOfObjects, Comic, Character } from './interfaces';

const request = (url: string): Promise<DataResult> => {
   let out = fetch(url).then(info => info.json());
   return out;
}

function main(searchBy: string) {

   const getRequest = request(`${baseUrl}/public/${searchBy}?apikey=${apiKey}`);
   //const getRequest = request(`${baseUrl}/public/characters?orderBy=-modified&offset=20&apikey=${apiKey}`);
   preloader();
   getRequest.then((response) => {
      const responseResult = response.data.results;
      //console.log(response)
      clearElement(characterWrapper)
      switch (searchBy) {
         case 'comics':
            for (let item in responseResult) {
               checkItem(responseResult[item]);
               //console.log(itemData)
               //createItem(responseResult[item])
               //createItem(checkedItems)
               //console.log(checkedItems)
            }
            break;
         case 'characters':
            for (let item in responseResult) {
               checkItem(responseResult[item]);
               //createItem(responseResult[item]);
               //createItem(checkedItems);
            }
            break
      }
   })
}
let checkedItems: object[] = [];
//let checkedItems: Comic  = [];
main(searchByComic);
function checkItem(item: Comic) {
   //let checkedItems: object[] = [];
   if (item.images.length !== 0 && !item.images[0].path.includes('unavailable')) {
      if (item.description !== '' && item.description !== '#N/A') {
         checkedItems.push(item);
         return checkedItems;
         //console.log(checkedItems)
      }
   }
   //console.log(checkedItems)
   return checkedItems;
}
//----------------------------------------
function createItem(item: Comic): void; //Overload
function createItem(item: Character): void; //Overload
function createItem(item): any { //Overload main function
   let imagePath: string;
   let extension: string;
   let title: string;
   if (item.name) {
      let character = item.thumbnail.path;
      if (character.match(/image_not_available/)) {
         return false
      }
      imagePath = item.thumbnail.path;
      extension = item.thumbnail.extension;
      title = item.name;
   } else {
      if (typeof item.images[0] !== typeof undefined) {
         imagePath = item.images[0].path;
         extension = item.images[0].extension;
         title = item.title;
      } else {
         return false;
      }
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
         createItem(responseResult[item]);
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
