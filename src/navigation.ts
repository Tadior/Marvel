import {
   characterWrapper, apiKey, baseUrl, navigations, paginationNum, iterationLimit,
} from './variables';
import { exportItem, offset, show, checkedCharacters, checkedComics } from './index';
import { setItem } from './setItem';
//---------------------Navigation--------------------------------------------------
navigations.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   switch (target.getAttribute('data-setting')) {
      case 'comic': {
         if (target.classList.contains('nav--active')) {
            return undefined
         } else {
            exportItem.checkedOffset = 0;
            if (exportItem.comicOffset > 0) {
               exportItem.offset = exportItem.comicOffset;
            } else if (exportItem.comicOffset < offset) {
               exportItem.comicOffset = offset;
            } else {
               exportItem.offset = 0
            }
            paginationNum.textContent = '1';
            characterWrapper.innerHTML = '';
            navigations.querySelector('.nav--active').classList.remove('nav--active');
            target.classList.add('nav--active')
         }
         // Если уже есть полученные данные, вевести карточки на основе полученных данных
         if (checkedComics.length !== 0) {
            characterWrapper.innerHTML = '';
            for (let item of checkedComics[0]) {
               setItem.bind(item)(item)
            }

         } else {
            show(`${baseUrl}/public/comics?offset=${offset}?limit=${iterationLimit}&apikey=${apiKey}`);
         }
         break;
      }
      case 'characters': {
         if (target.classList.contains('nav--active')) {
            return undefined
         } else {
            if (exportItem.characterOffset > 0) {
               exportItem.offset = exportItem.characterOffset;
            } else if (exportItem.characterOffset < offset) {
               exportItem.characterOffset = offset;
            } else {
               exportItem.offset = 0;
            }
            exportItem.checkedOffset = 0;
            paginationNum.textContent = '1';
            characterWrapper.innerHTML = '';
            navigations.querySelector('.nav--active').classList.remove('nav--active');
            target.classList.add('nav--active')
         }
         // Если уже есть полученные данные, вевести карточки на основе полученных данных
         if (checkedCharacters.length !== 0) {
            characterWrapper.innerHTML = '';
            for (let item of checkedCharacters[0]) {
               setItem.bind(item)(item)
            }
         } else {
            show(`${baseUrl}/public/characters?offset=${offset}?limit=${iterationLimit}&apikey=${apiKey}`)
         }
         break;
      }
   }
})