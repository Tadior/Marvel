import { characterWrapper } from './variables';
import { openCardDescription } from './openCard';
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
export { setItem }