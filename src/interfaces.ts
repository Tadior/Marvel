interface DataResult {
   data: {
      results: {
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
   },
   title: string
}
interface Character {
   name: string,
   thumbnail: {
      path: string;
      extension: string;
   }
}
export type { DataResult, arrayOfObjects, Comic, Character };