import './styles/style.scss';
import {
   characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer, checkedComics, checkedCharacters,
   //limitValue, offsetComicValue, offsetCharacterValue, paginationContainer, paginationItem 
} from './variables';
import { DataResult, arrayOfObjects, Comic, Character, ArrayOfComics, ArrayOfCharacters } from './interfaces';
import { createItems } from './createItemsFunc';
import { resetPagination, offsetCharacterValue, offsetComicValue, limitValue } from './pagination';
import { checkItem } from './checkItemFunc';
import { clearElement } from './navigation';

const request = (url: string): Promise<DataResult> => {
   let out = fetch(url).then(info => info.json());
   return out;
}

function main(searchBy: string) {
   let offsetValue: number;
   searchBy === 'comics' ? offsetValue = offsetComicValue : offsetValue = offsetCharacterValue;
   console.log(offsetValue)
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

main(searchByComic);

function preloader(): void {
   characterWrapper.innerHTML = `
   <img class='preloader' src='./assets/img/preloader.svg'>
   `
}

export { main, request }
