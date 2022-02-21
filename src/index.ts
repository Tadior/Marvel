import './styles/style.scss';
import {
   characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer
   //limitValue, offsetComicValue, offsetCharacterValue, paginationContainer, paginationItem
} from './variables';

const isComic = (): boolean => {
   //navigations.querySelector('.nav--active').getAttribute('data-setting') === 'comic' ? return true : false;
   if (navigations.querySelector('.nav--active').getAttribute('data-setting') === 'comic') {
      return true;
   } else {
      return false;
   }
}

interface DataResult {
   data: {
      results: {

      }
   }
}
interface ArrayOfDataResult extends DataResult {
   [key: number]: {
      //id: number
   }
}
interface DataResultItem extends ArrayOfDataResult {
   id: number;
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
         offset += 30;
         if (isComic() === true) {
            return getTwelve(`${baseUrl}/public/comics?offset=${offset}?limit=30&apikey=${apiKey}`)
         } else {
            return getTwelve(`${baseUrl}/public/characters?offset=${offset}?limit=30&apikey=${apiKey}`)
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
         //console.log(item)
      }
   })
}
show(`${baseUrl}/public/comics?offset=${offset}?limit=30&apikey=${apiKey}`)
//---------------------Navigation--------------------------------------------------
navigations.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   switch (target.getAttribute('data-setting')) {
      case 'comic': {
         if (target.classList.contains('nav--active')) {
            return undefined
         } else {
            offset = 0;
            characterWrapper.innerHTML = '';
            navigations.querySelector('.nav--active').classList.remove('nav--active');
            target.classList.add('nav--active')
         }
         // Если уже есть полученные данные, вевести карточки на основе полученных данных
         if (checkedComics.length !== 0) {
            console.log('here')
            characterWrapper.innerHTML = '';
            for (let item of checkedComics[0]) {
               //setItem(item)
               setItem.bind(item)(item)
            }

         } else {
            show(`${baseUrl}/public/comics?offset=${offset}?limit=30&apikey=${apiKey}`);
         }
         break;
      }
      case 'characters': {
         if (target.classList.contains('nav--active')) {
            return undefined
         } else {
            offset = 0;
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
            show(`${baseUrl}/public/characters?offset=${offset}?limit=30&apikey=${apiKey}`)
         }
         break;
      }
   }
})

function setItem(item) {
   let imagePath = item.images ? item.images[0].path : item.thumbnail.path
   let extension = item.images ? item.images[0].extension : item.thumbnail.extension;
   let title = item.name ? item.name : item.title;
   const newItem = document.createElement('div');
   newItem.classList.add('character-item');
   newItem.innerHTML = `
   <div class="character-item__picture">
      <img src="${imagePath}.${extension}" alt="${title}" srcset="">
   </div>
   <div class="character-item__name">
      ${title}
   </div>
   `
   newItem.addEventListener('click', () => openCardDescription(this))
   characterWrapper.append(newItem);
}
function openCardDescription(cardInfo: Character)
function openCardDescription(cardInfo: Comic)
function openCardDescription(cardInfo) {
   card.classList.add('item-card--active');
   let title: string;
   let description = cardInfo.description;
   let image = cardInfo.thumbnail.path + '.' + cardInfo.thumbnail.extension
   cardInfo.title ? title = cardInfo.title : title = cardInfo.name;
   cardImg.src = image;
   cardTitle.innerHTML = title;
   cardDescription.innerHTML = description;
}

const card = document.getElementById('card-description');
const cardImg: HTMLImageElement = card.querySelector('.item-card__img');
const cardTitle = card.querySelector('.item-card__title');
const cardDescription = card.querySelector('.item-card__description');
const cardClose = card.querySelector('.item-card--close');

cardClose.addEventListener('click', () => {
   card.classList.remove('item-card--active');
});

function setPreloader() {
   characterWrapper.innerHTML += `
   <div class='preloader'>
      <img class='preloader-image' src='./assets/img/preloader.svg'>
   </div>
   `
}

//-----------------------Pagination-----------------------------------------

const paginationContainer = document.getElementById('pagination');

paginationContainer.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   const paginationNum = paginationContainer.querySelector('.pagination--active');
   switch (target.id) {
      case 'next':
         paginationNum.textContent = String(Number(paginationNum.textContent) + 1)
         offset += 30;
         checkedOffset++;
         //console.log(offset)
         //console.log(paginationNum.textContent)
         //console.log()
         if (isComic() === true) {
            if (checkedComics.length > checkedOffset) {
               console.log(checkedComics.length)
               console.log(checkedOffset)
               characterWrapper.innerHTML = '';
               console.log(checkedComics)
               for (let item of checkedComics[checkedOffset]) {
                  setItem.bind(item)(item)
               }
            } else {
               show(`${baseUrl}/public/comics?offset=${offset}?limit=30&apikey=${apiKey}`)
            }
         } else {
            if (checkedCharacters.length === checkedOffset) {
               characterWrapper.innerHTML = '';
               console.log(checkedCharacters)
               for (let item of checkedCharacters[checkedOffset]) {
                  setItem.bind(item)(item)
               }
            } else {
               show(`${baseUrl}/public/characters?offset=${offset}?limit=30&apikey=${apiKey}`)
            }

         }
         //isComic() === true ? show(`${baseUrl}/public/comics?offset=${offset}?limit=30&apikey=${apiKey}`) : show(`${baseUrl}/public/characters?offset=${offset}?limit=30&apikey=${apiKey}`)
         break;
      case 'previous':
         paginationNum.textContent === '1' ? false : true;
         paginationNum.textContent = String(Number(paginationNum.textContent) - 1)
         //console.log(paginationNum.textContent)
         offset -= 30;
         checkedOffset--;
         console.log(offset)
         if (isComic() === true) {
            characterWrapper.innerHTML = '';
            console.log(checkedComics)
            for (let item of checkedComics[checkedOffset]) {
               setItem.bind(item)(item)
            }
         } else {
            characterWrapper.innerHTML = '';
            console.log(checkedComics)
            for (let item of checkedCharacters[checkedOffset]) {
               setItem.bind(item)(item)
            }
         }
         //isComic() === true ? 
         //isComic() === true ? show(`${baseUrl}/public/comics?offset=${offset}?limit=30&apikey=${apiKey}`) : show(`${baseUrl}/public/characters?offset=${offset}?limit=30&apikey=${apiKey}`)
         break;
   }

})



//document.querySelector('#re').addEventListener('click', () => cardDescription.classList.add('item-card--active'))