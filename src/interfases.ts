interface DataResult {
   data: {
      results: {

      }
   }
}
interface ArrayOfDataResult extends DataResult {
   [key: number]: {}
}
interface DataResultItem extends ArrayOfDataResult {
   id: number;
   thumbnail: {
      path: string;
      extension: string;
   };
   description: string;
   resourseURI: string;
   urls: [{ type: string; url: string }];
}
interface Character extends DataResultItem {
   name: string;
}
interface Comic extends DataResultItem {
   title: string;
   images: [{
      path: string;
      extension: string;
   }]
}