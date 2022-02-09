import { searchByComic, searchByCharacter, checkedCharacters, checkedComics } from './variables';
import { main } from './index';
let limitValue = 100;
let offsetComicValue = 0;
let offsetCharacterValue = 0;
const paginationContainer = document.getElementById('pagination');
const paginationItem = paginationContainer.querySelector('.pagination__item');
paginationContainer.addEventListener('click', (event) => {
   const target = event.target as Element;
   switch (target.id) {
      case 'previous':
         if (paginationItem.textContent == '1') {
            return false;
         } else {
            const currentValue = parseInt(paginationItem.textContent);
            paginationItem.textContent = (currentValue - 1).toString();
            if (offsetComicValue >= 0 || offsetCharacterValue >= 0) {
               switch (getNavActiveAttribute()) {
                  case 'characters':
                     offsetCharacterValue = offsetCharacterValue - limitValue;
                     clearArray(checkedCharacters);
                     main(searchByCharacter);
                     break;
                  case 'comic':
                     offsetComicValue = offsetComicValue - limitValue;
                     console.log(checkedComics)
                     clearArray(checkedComics);
                     main(searchByComic);
                     break;
               }
            } else {
               return undefined
            }
         }
         break;
      case 'next':
         const currentValue = parseInt(paginationItem.textContent);
         paginationItem.textContent = (currentValue + 1).toString();
         switch (getNavActiveAttribute()) {
            case 'characters':
               offsetCharacterValue = offsetCharacterValue + limitValue;
               clearArray(checkedCharacters);
               main(searchByCharacter);
               break;
            case 'comic':
               offsetComicValue = offsetComicValue + limitValue;
               console.log(checkedComics)
               clearArray(checkedComics);
               main(searchByComic);
               break;
         }
         break;
   }
   if (target.classList.contains('pagination__item')) {
      const paginationActive = paginationContainer.querySelector('.pagination--active');
      paginationActive.classList.remove('pagination--active');
      target.classList.add('pagination--active')
   }
});

function getNavActiveAttribute(): string {
   return document.querySelector('.nav--active').getAttribute('data-setting')
}

function clearArray(array) {
   array.splice(0, array.length);
}
function resetPagination() {
   paginationItem.textContent = '1'
}

export { resetPagination, offsetCharacterValue, offsetComicValue, limitValue }