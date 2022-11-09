//code developed with assistance of the tutor

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { //console.log('put implemented in DB');

// connection to the database and version that will be used.
const startDb = await openDB('jate', 1);
  
// new transaction, database and data privileges readwrite specified.
const tx = startDb.transaction('jate', 'readwrite');

// Opens desired object store.
const store = tx.objectStore('jate');
const request = store.put({ id: 1, value: content });

// confirmation of the request.
const result = await request;
console.log('data saved in database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { //console.log('get implemented in DB');
    // connection to the database and version that will be used.
    const startDb = await openDB('jate', 1);
  
    // new transaction, database and data privileges readonly specified.
    const tx = startDb.transaction('jate', 'readonly');
  
    // Opens desired object store.
    const store = tx.objectStore('jate');
  
    // get all data in the database.
    const request = store.getAll();
  
    // confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result?.value;
  };
initdb();
