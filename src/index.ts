import './styles/style.scss';
import {
   characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer
   //limitValue, offsetComicValue, offsetCharacterValue, paginationContainer, paginationItem 
} from './variables';

interface DataResult {
   data: {
      results: {

      }
   }
}
interface ArrayOfDataResult extends DataResult {
   [key: number]: {
      id: number
   }
}
interface DataResultItem extends ArrayOfDataResult {
   thumbnail: {
      path: string;
      extension: string;
   };
   description: string;
   resourseURI: string;
   urls: [{ type: string; url: string }];
}
interface Character extends DataResultItem {
   name: string;
}
interface Comic extends DataResultItem {
   title: string;
   images: [{
      path: string;
      extension: string;
   }]
}

const checkedComics = [];
const checkedCharacters = [];
const checkedItems = [];
let checkedOffset = 0;
let offset = 0;
function getTwelve(url) {
   function getResponse(url): Promise<DataResult> {
      let response = fetch(url).then(data => data.json());
      return response;
   }
   return getResponse(url).then(response => {
      const dataResult = response.data.results as DataResult;

      function sort(array: DataResult): void {
         if (array[0].images) {
            mainBlock: {
               for (let key in array as Comic) {
                  if (dataResult[key].description !== '#N/A' && dataResult[key].description !== '' && typeof dataResult[key].description !== undefined && dataResult[key].images[0] !== undefined && !dataResult[key].images[0].path.includes('image_not_available')) {
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
                  if (dataResult[key].description !== '#N/A' && dataResult[key].description !== '' && typeof dataResult[key].description !== undefined && !dataResult[key].thumbnail.path.includes('image_not_available')) {
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
         offset += 20;
         if (navigations.querySelector('.nav--active').getAttribute('data-setting') === 'comic') {
            return getTwelve(`${baseUrl}/public/comics?offset=${offset}?limit=20&apikey=${apiKey}`)
         } else {
            return getTwelve(`${baseUrl}/public/characters?offset=${offset}?limit=20&apikey=${apiKey}`)
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
         items = checkedComics[checkedOffset]
      } else {
         checkedCharacters.push([...checkedItems])
         items = checkedCharacters[checkedOffset]
      }
      for (let item of items) {
         setItem(item)
      }
   })
}
show(`${baseUrl}/public/comics?offset=${offset}?limit=20&apikey=${apiKey}`)
//---------------------Navigation--------------------------------------------------
navigations.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   switch (target.getAttribute('data-setting')) {
      case 'comic': {
         if (target.classList.contains('nav--active')) {
            return undefined
         } else {
            characterWrapper.innerHTML = '';
            navigations.querySelector('.nav--active').classList.remove('nav--active');
            target.classList.add('nav--active')
         }
         // Если уже есть полученные данные, вевести карточки на основе полученных данных
         if (checkedComics.length !== 0) {
            characterWrapper.innerHTML = '';
            for (let item of checkedComics[0]) {
               setItem(item)
            }

         } else {
            show(`${baseUrl}/public/comics?offset=${offset}?limit=20&apikey=${apiKey}`);
         }
         break;
      }
      case 'characters': {
         if (target.classList.contains('nav--active')) {
            return undefined
         } else {
            characterWrapper.innerHTML = '';
            navigations.querySelector('.nav--active').classList.remove('nav--active');
            target.classList.add('nav--active')
         }
         // Если уже есть полученные данные, вевести карточки на основе полученных данных
         if (checkedCharacters.length !== 0) {
            characterWrapper.innerHTML = '';
            for (let item of checkedCharacters[0]) {
               setItem(item)
            }
         } else {
            show(`${baseUrl}/public/characters?offset=${offset}?limit=20&apikey=${apiKey}`)
         }
         break;
      }
   }
})

function setItem(item) {
   let imagePath = item.images ? item.images[0].path : item.thumbnail.path
   let extension = item.images ? item.images[0].extension : item.thumbnail.extension;
   let title = item.name ? item.name : item.title;
   characterWrapper.innerHTML += `
   <div class="character-item">
      <div class="character-item__picture">
         <img src="${imagePath}.${extension}" alt="${title}" srcset="">
      </div>
      <div class="character-item__name">
         ${title}
      </div>
   </div>
   `;
}

