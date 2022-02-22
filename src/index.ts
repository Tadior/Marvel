import './styles/style.scss';
import './interfases';
import './navigation';
import './openCard';
import './pagination';
import './setItem';
import {
   characterWrapper, apiKey, baseUrl, navigations, checkedComics, checkedCharacters, checkedItems, iterationLimit, iterationOffset, paginationNum
} from './variables';
import { setItem } from './setItem';

const isComic = (): boolean => {
   if (navigations.querySelector('.nav--active').getAttribute('data-setting') === 'comic') {
      return true;
   } else {
      return false;
   }
}

let checkedOffset = 0;
let offset = 0;
let characterOffset;
let comicOffset;
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
         offset += iterationOffset;
         if (isComic() === true) {
            return getTwelve(`${baseUrl}/public/comics?offset=${offset}?limit=${iterationLimit}&apikey=${apiKey}`)
         } else {
            return getTwelve(`${baseUrl}/public/characters?offset=${offset}?limit=${iterationLimit}&apikey=${apiKey}`)
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
         setItem.bind(item)(item)
      }
   })
}
show(`${baseUrl}/public/comics?offset=${offset}?limit=${iterationLimit}&apikey=${apiKey}`)

//function setItem(item) {
//   let imagePath = item.images ? item.images[0].path : item.thumbnail.path
//   let extension = item.images ? item.images[0].extension : item.thumbnail.extension;
//   let title = item.name ? item.name : item.title;
//   const newItem = document.createElement('div');
//   newItem.classList.add('character-item');
//   newItem.innerHTML = `
//   <div class="character-item__picture">
//      <img src="${imagePath}.${extension}" alt="${title}" srcset="">
//   </div>
//   <div class="character-item__name">
//      ${title}
//   </div>
//   `
//   newItem.addEventListener('click', () => openCardDescription(this))
//   characterWrapper.append(newItem);
//}
//function openCardDescription(cardInfo: Character)
//function openCardDescription(cardInfo: Comic)
//function openCardDescription(cardInfo) {
//   card.classList.add('item-card--active');
//   let title: string;
//   let description = cardInfo.description;
//   let image = cardInfo.thumbnail.path + '.' + cardInfo.thumbnail.extension
//   cardInfo.title ? title = cardInfo.title : title = cardInfo.name;
//   cardImg.src = image;
//   cardTitle.innerHTML = title;
//   cardDescription.innerHTML = description;
//}

//const card = document.getElementById('card-description');
//const cardImg: HTMLImageElement = card.querySelector('.item-card__img');
//const cardTitle = card.querySelector('.item-card__title');
//const cardDescription = card.querySelector('.item-card__description');
//const cardClose = card.querySelector('.item-card--close');

//cardClose.addEventListener('click', () => {
//   card.classList.remove('item-card--active');
//});

function setPreloader() {
   characterWrapper.innerHTML += `
   <div class='preloader'>
      <img class='preloader-image' src='./assets/img/preloader.svg'>
   </div>
   `
}
const exportItem = { offset, checkedOffset, comicOffset, characterOffset }
export { exportItem, offset, iterationLimit, show, isComic, checkedCharacters, checkedComics }