const characterWrapper = document.querySelector('.character-wrapper');
const apiKey = '';
const baseUrl = 'https://gateway.marvel.com/v1';
const searchByComic = 'comics';
const searchByCharacter = 'characters';
const searchByNameStart = 'nameStartsWith'
const navigations = document.querySelector('.navigation-list');
const mainContainer = document.getElementById('main-container');

const paginationContainer = document.getElementById('pagination');
const paginationNum = paginationContainer.querySelector('.pagination--active');

const checkedComics = [];
const checkedCharacters = [];
const checkedItems = [];
const iterationOffset = 30;
const iterationLimit = 30;

const card = document.getElementById('card-description');
const cardImg: HTMLImageElement = card.querySelector('.item-card__img');
const cardTitle = card.querySelector('.item-card__title');
const cardDescription = card.querySelector('.item-card__description');
const cardClose = card.querySelector('.item-card--close');

let checkedOffset = 0;
let offset = 0;
let characterOffset;
let comicOffset;
const requestVariables = { checkedOffset, offset, characterOffset, comicOffset };

export {
   characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer, paginationContainer, paginationNum, checkedComics, checkedCharacters, checkedItems, iterationOffset, iterationLimit, card, cardImg, cardClose, cardDescription, cardTitle, requestVariables
}