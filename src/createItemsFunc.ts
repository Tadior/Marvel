import { characterWrapper } from './variables';
import { ArrayOfComics, ArrayOfCharacters } from './interfaces';
function createItems(item: ArrayOfComics[]): void; //Overload
function createItems(item: ArrayOfCharacters[]): void; //Overload
function createItems(item): any { //Overload main function
   let imagePath: string;
   let extension: string;
   let title: string;

   item.forEach(element => {
      if ('name' in element) {
         //console.log(element)
         imagePath = element.thumbnail.path;
         extension = element.thumbnail.extension;
         title = element.name;
      } else if ('title' in element) {
         //console.log(element.title)
         imagePath = element.images[0].path;
         extension = element.images[0].extension;
         title = element.title;
      }

      characterWrapper.innerHTML += `
         <div class="character-item">
            <div class="character-item__picture">
               <img src="${imagePath}.${extension}" alt="${title}" srcset="">
            </div>
            <div class="character-item__name">
               ${title}
            </div>
         </div>
         `
   });
}
export { createItems };