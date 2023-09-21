export default function createObjectFromEntries(entriesArray:Array<[string, string]>) {
  let objectWithEntries:FormObjectKeyString = {};
  entriesArray.forEach(entry => {
    const path = entry[0].split('&')[0];
    const key = entry[0].split('&')[1];
    if(entry[1] !== '') {
      if(objectWithEntries[path]) {
        objectWithEntries = {
          ...objectWithEntries,
          [path]: {
            ...objectWithEntries[path],
            [key]: entry[1]
          }
        }
      } else {
        objectWithEntries = {
          ...objectWithEntries,
          [path]: {
            [key]: entry[1]
          }
        }
      }
    }
  });
  return objectWithEntries;
}