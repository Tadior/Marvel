
import { card, cardImg, cardTitle, cardDescription, cardClose } from './variables';
import { addHttpsforImages } from './setItem';
function openCardDescription(cardInfo: Character)
function openCardDescription(cardInfo: Comic)
function openCardDescription(cardInfo: Creator)
function openCardDescription(cardInfo) {
   card.classList.add('item-card--active');
   let title: string;
   let description = cardInfo.description;
   let image = addHttpsforImages(`${cardInfo.thumbnail.path}.${cardInfo.thumbnail.extension}`)
   if (cardInfo.title) {
      title = cardInfo.title;
   } else if (cardInfo.fullName) {
      title = cardInfo.fullName
   } else {
      title = cardInfo.name
   }
   cardImg.src = image;
   cardTitle.innerHTML = title;
   cardDescription.innerHTML = description;
}

cardClose.addEventListener('click', () => {
   card.classList.remove('item-card--active');
});

export { openCardDescription }