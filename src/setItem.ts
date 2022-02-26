import { characterWrapper } from './variables';
import { openCardDescription } from './openCard';
function setItem(item) {
   let imagePath = item.images ? item.images[0].path : item.thumbnail.path
   let extension = item.images ? item.images[0].extension : item.thumbnail.extension;
   let path = addHttpsforImages(`${imagePath}.${extension}`);
   let title: string;
   if (item.name) {
      title = item.name;
   } else if (item.fullName) {
      title = item.fullName;
   } else {
      title = item.title;
   }
   const newItem = document.createElement('div');
   newItem.classList.add('character-item');
   newItem.innerHTML = `
   <div class="character-item__picture">
      <img src="${path}" alt="${title}" srcset="">
   </div>
   <div class="character-item__name">
      ${title}
   </div>
   `
   newItem.addEventListener('click', () => openCardDescription(this))
   characterWrapper.append(newItem);
}
function addHttpsforImages(imagePath: string): string {
   let httpsPath = imagePath.replace(/http/, 'https');
   return httpsPath;
}
export { setItem, addHttpsforImages }