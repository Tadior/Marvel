
import { card, cardImg, cardTitle, cardDescription, cardClose } from './variables'
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

cardClose.addEventListener('click', () => {
   card.classList.remove('item-card--active');
});

export { openCardDescription }