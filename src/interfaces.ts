interface DataResult {
   data: {
      results: {
         //[key: number]: {
         //   images: arrayOfObjects,
         //   title: string,
         //   thumbnail: {
         //      extension: string,
         //      path: string
         //   },
         //   name: string
         //};
      }
   }
}
interface DataResultArray extends DataResult {
   [key: number]: {
      images: arrayOfObjects,
      title: string,
      thumbnail: {
         extension: string,
         path: string
      },
      name: string
   };
}
interface ArrayOfComics extends Comic {
   [index: number]: [

   ]
}
interface ArrayOfCharacters extends Character {
   [index: number]: {

   }
}
interface arrayOfObjects {
   [index: number]: {
      path: string;
      extension: string;
   }
}
interface Comic {
   images: {
      [index: number]: {
         path: string;
         extension: string;
      }
      length?: number
   },
   title: string,
   description?: string
}
interface Character {
   name: string,
   thumbnail: {
      path: string;
      extension: string;
   }
}
export type { DataResult, arrayOfObjects, Comic, Character, ArrayOfComics, ArrayOfCharacters };