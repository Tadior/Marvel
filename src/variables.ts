//import { DataResult, arrayOfObjects, Comic, Character, ArrayOfComics, ArrayOfCharacters } from './interfaces';
const characterWrapper = document.querySelector('.character-wrapper');
const apiKey = 'c62bbb0f00fa60e1e4e3bd2c186aba94';
const baseUrl = 'http://gateway.marvel.com/v1';
const searchByComic = 'comics';
const searchByCharacter = 'characters';
const searchByNameStart = 'nameStartsWith'
const navigations = document.querySelector('.navigation-list');
const mainContainer = document.getElementById('main-container');

//let checkedComics: ArrayOfComics[] = [];
//let checkedCharacters: ArrayOfCharacters[] = [];

export {
   characterWrapper, apiKey, baseUrl, searchByComic, searchByCharacter, searchByNameStart, navigations, mainContainer
}