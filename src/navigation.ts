import {
   characterWrapper, apiKey, baseUrl, navigations, paginationNum, iterationLimit, requestVariables, paginationContainer
} from './variables';
import { show, checkedCharacters, checkedComics } from './index';
import { setItem } from './setItem';
import { isSearch, setSearch, clearSearch } from './search';

navigations.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   switch (target.getAttribute('data-setting')) {
      case 'comic': {
         if (target.classList.contains('nav--active')) {
            return undefined
         }
         if (checkedCharacters.length !== 0) {
            localStorage.setItem('checkedCharacters', checkedCharacters[0])
         }
         selectCategory('comic');
         break;
      }
      case 'characters': {
         if (target.classList.contains('nav--active')) {
            return undefined
         }
         selectCategory('characters')
         break;
      }
      case 'searching': {
         if (target.classList.contains('nav--active')) {
            return undefined
         }
         selectCategory('searching')
         //search();
         break;
      }
   }
   function selectCategory(item: string) {
      let itemOffset: number;
      let checkedItems;
      //paginationContainer.classList.contains('pagination--fade') ? paginationContainer.classList.remove('pagination--fade') : true;
      if (isSearch()) {
         clearSearch();
         paginationContainer.classList.remove('pagination--fade');
      }
      switch (item) {
         case 'comic': {
            itemOffset = requestVariables.comicOffset;
            checkedItems = checkedComics;
            break;
         }
         case 'characters': {
            itemOffset = requestVariables.characterOffset;
            checkedItems = checkedCharacters;
            break;
         }
         case 'searching': {
            setSearch();
            navigations.querySelector('.nav--active').classList.remove('nav--active');
            target.classList.add('nav--active')
            return undefined
         }
      }
      //if (itemOffset === undefined) {
      //   console.log('here')
      //   return undefined;
      //} else
      if (itemOffset > 0) {
         requestVariables.offset = itemOffset;
      } else if (itemOffset < requestVariables.offset) {
         itemOffset = requestVariables.offset;
      } else {
         requestVariables.offset = 0;
      }
      requestVariables.checkedOffset = 0;
      paginationNum.textContent = '1';
      characterWrapper.innerHTML = '';
      navigations.querySelector('.nav--active').classList.remove('nav--active');
      target.classList.add('nav--active')
      // Если уже есть полученные данные, вевести карточки на основе полученных данных
      if (checkedItems.length !== 0) {
         characterWrapper.innerHTML = '';
         for (let item of checkedItems[0]) {
            setItem.bind(item)(item)
         }
      } else {
         show(`${baseUrl}/public/characters?offset=${requestVariables.offset}?limit=${iterationLimit}&apikey=${apiKey}`)
      }
   }
})
