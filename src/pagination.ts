import {
   characterWrapper, apiKey, baseUrl, paginationContainer, paginationNum, iterationOffset, iterationLimit, requestVariables
} from './variables';
import { show, isComic, checkedCharacters, checkedComics } from './index';
import { setItem } from './setItem';

paginationContainer.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   switch (target.id) {
      case 'next':
         paginationNum.textContent = String(Number(paginationNum.textContent) + 1)
         requestVariables.offset += iterationOffset;
         requestVariables.checkedOffset++;
         if (isComic() === true) {
            if (checkedComics.length > requestVariables.checkedOffset) {
               characterWrapper.innerHTML = '';
               for (let item of checkedComics[requestVariables.checkedOffset]) {
                  setItem.bind(item)(item)
               }
            } else {
               requestVariables.comicOffset = requestVariables.offset;
               show(`${baseUrl}/public/comics?offset=${requestVariables.offset}?limit=${iterationLimit}&apikey=${apiKey}`)
            }
         } else {
            if (checkedCharacters.length > requestVariables.checkedOffset) {
               characterWrapper.innerHTML = '';
               for (let item of checkedCharacters[requestVariables.checkedOffset]) {
                  setItem.bind(item)(item)
               }
            } else {
               requestVariables.characterOffset = requestVariables.offset;
               show(`${baseUrl}/public/characters?offset=${requestVariables.offset}?limit=${iterationLimit}&apikey=${apiKey}`)
            }

         }
         break;
      case 'previous':
         if (Number(paginationNum.textContent) === 1) {
            return false;
         }
         paginationNum.textContent = String(Number(paginationNum.textContent) - 1)
         requestVariables.offset -= iterationOffset;
         requestVariables.checkedOffset--;
         if (isComic() === true) {
            characterWrapper.innerHTML = '';
            for (let item of checkedComics[requestVariables.checkedOffset]) {
               setItem.bind(item)(item)
            }
         } else {
            characterWrapper.innerHTML = '';
            for (let item of checkedCharacters[requestVariables.checkedOffset]) {
               setItem.bind(item)(item)
            }
         }
         break;
   }

})