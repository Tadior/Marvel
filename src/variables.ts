const characterWrapper = document.querySelector('.character-wrapper');
const apiKey = '';
const baseUrl = 'http://gateway.marvel.com/v1';
const searchByComic = 'comics';
const searchByCharacter = 'characters';
const searchByNameStart = 'nameStartsWith'
const navigations = document.querySelector('.navigation-list');
const mainContainer = document.getElementById('main-container');
export {
   characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer
}