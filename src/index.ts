import './styles/style.scss';
import './interfases';
import './navigation';
import './openCard';
import './pagination';
import './setItem';
import {
   characterWrapper, apiKey, baseUrl, navigations, checkedComics, checkedCharacters, checkedItems, iterationLimit, iterationOffset, paginationNum, requestVariables
} from './variables';
import { setItem } from './setItem';

const isComic = (): boolean => {
   if (navigations.querySelector('.nav--active').getAttribute('data-setting') === 'comic') {
      return true;
   } else {
      return false;
   }
}

function getTwelve(url) {
   setPreloader();
   function getResponse(url): Promise<DataResult> {
      let response = fetch(url).then(data => data.json());
      return response;
   }
   return getResponse(url).then(response => {
      const dataResult = response.data.results as DataResult;
      characterWrapper.innerHTML = '';

      function sort(array: DataResult): void {
         if (array[0].images) {
            mainBlock: {
               for (let key in array as Comic) {
                  if (dataResult[key].description !== '#N/A' && dataResult[key].description !== '' && dataResult[key].description !== null && typeof dataResult[key].description !== undefined && dataResult[key].images[0] !== undefined && !dataResult[key].images[0].path.includes('image_not_available')) {
                     if (checkedItems.length === 12) {
                        return undefined
                     }
                     for (let item of checkedItems) {
                        if (dataResult[key].id === item.id) {
                           break mainBlock;
                        }
                     }
                     checkedItems.push(dataResult[key])
                  }
               }
            }
         } else {
            mainBlock: {
               for (let key in array as Character) {
                  if (dataResult[key].description !== '#N/A' && dataResult[key].description !== '' && dataResult[key].description !== null && typeof dataResult[key].description !== undefined && !dataResult[key].thumbnail.path.includes('image_not_available')) {
                     if (checkedItems.length === 12) {
                        return undefined
                     }
                     for (let item of checkedItems) {
                        if (dataResult[key].id === item.id) {
                           break mainBlock;
                        }
                     }
                     checkedItems.push(dataResult[key])
                  }
               }
            }
         }
      }

      sort(dataResult)

      if (checkedItems.length !== 12) {
         requestVariables.offset += iterationOffset;
         if (isComic() === true) {
            return getTwelve(`${baseUrl}/public/comics?offset=${requestVariables.offset}?limit=${iterationLimit}&apikey=${apiKey}`)
         } else {
            return getTwelve(`${baseUrl}/public/characters?offset=${requestVariables.offset}?limit=${iterationLimit}&apikey=${apiKey}`)
         }
      }
   })
}

function show(url: string) {
   checkedItems.splice(0, checkedItems.length = 0);
   getTwelve(url).then(() => {
      let items;
      if (checkedItems[0].images) {
         checkedComics.push([...checkedItems])
         items = checkedComics[requestVariables.checkedOffset]
      } else {
         checkedCharacters.push([...checkedItems])
         items = checkedCharacters[requestVariables.checkedOffset]
      }
      for (let item of items) {
         setItem.bind(item)(item)
      }
   })
}
show(`${baseUrl}/public/comics?offset=${requestVariables.offset}?limit=${iterationLimit}&apikey=${apiKey}`)

function setPreloader() {
   characterWrapper.innerHTML += `
   <div class='preloader'>
      <img class='preloader-image' src='./assets/img/preloader.svg'>
   </div>
   `
}

export { iterationLimit, show, isComic, checkedCharacters, checkedComics }