import { Comic, Character } from './interfaces';
import { checkedComics, checkedCharacters } from './variables';
function checkItem(item: Comic): void;
function checkItem(item: Character): void;
function checkItem(item): void {
   if ('images' in item) {
      if (checkedComics.length === 12) {
         return undefined
      }
      if (item.images.length !== 0 && !item.images[0].path.includes('not_available')) {
         if (item.description !== '' && item.description !== '#N/A') {
            checkedComics.push(item);
         }
      }
   } else
      if ('thumbnail' in item) {
         if (checkedCharacters.length === 12) {
            return undefined
         }
         if (item.thumbnail.length !== 0 && !item.thumbnail.path.includes('not_available')) {
            if (item.description !== '' && item.description !== '#N/A') {
               checkedCharacters.push(item);
            }
         }
      }
}
export { checkItem }