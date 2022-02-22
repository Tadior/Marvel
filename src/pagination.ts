//-----------------------Pagination-----------------------------------------
import {
   characterWrapper, apiKey, baseUrl, paginationContainer, paginationNum, iterationOffset, iterationLimit,
} from './variables';
import { exportItem, offset, show, isComic, checkedCharacters, checkedComics } from './index';
import { setItem } from './setItem';

paginationContainer.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   switch (target.id) {
      case 'next':
         paginationNum.textContent = String(Number(paginationNum.textContent) + 1)
         exportItem.offset += iterationOffset;
         exportItem.checkedOffset++;
         if (isComic() === true) {
            if (checkedComics.length > exportItem.checkedOffset) {
               characterWrapper.innerHTML = '';
               for (let item of checkedComics[exportItem.checkedOffset]) {
                  setItem.bind(item)(item)
               }
            } else {
               exportItem.comicOffset = exportItem.offset;
               show(`${baseUrl}/public/comics?offset=${offset}?limit=${iterationLimit}&apikey=${apiKey}`)
            }
         } else {
            if (checkedCharacters.length > exportItem.checkedOffset) {
               characterWrapper.innerHTML = '';
               for (let item of checkedCharacters[exportItem.checkedOffset]) {
                  setItem.bind(item)(item)
               }
            } else {
               exportItem.characterOffset = offset;
               show(`${baseUrl}/public/characters?offset=${offset}?limit=${iterationLimit}&apikey=${apiKey}`)
            }

         }
         break;
      case 'previous':
         if (Number(paginationNum.textContent) === 1) {
            return false;
         }
         paginationNum.textContent = String(Number(paginationNum.textContent) - 1)
         exportItem.offset -= iterationOffset;
         exportItem.checkedOffset--;
         if (isComic() === true) {
            characterWrapper.innerHTML = '';
            for (let item of checkedComics[exportItem.checkedOffset]) {
               setItem.bind(item)(item)
            }
         } else {
            characterWrapper.innerHTML = '';
            for (let item of checkedCharacters[exportItem.checkedOffset]) {
               setItem.bind(item)(item)
            }
         }
         break;
   }

})