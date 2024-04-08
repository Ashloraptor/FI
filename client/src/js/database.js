import { openDB } from 'idb';

const indexedDB =
   window.indexedDB ||
   window.mozIndexedDB ||
   window.webkitIndexedDB ||
   window.msIndexedDB ||
   window.shimIndexedDB;

const initdb = async () =>
  openDB('fi', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('fi')) {
        console.log('fi database already exists');
        return;
      }
      db.createObjectStore('fi', { keyPath: 'id', autoIncrement: true });
      console.log('fi database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

    console.log('Post to the database')
    // Create a connection to the database database and version we want to use.
    const fiDb = await openDB('fi', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = fiDb.transaction('fi', 'readwrite');
    // Open up the desired object store.
    const store = tx.objectStore('fi');
    // Use the .add() method on the store and pass in the content.
    const request = store.add({ content });
    // Get confirmation of the request.
    const result = await request;
    console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET from the database');
    // Create a connection to the database database and version we want to use.
    const fiDb = await openDB('fi', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = fiDb.transaction('fi', 'readonly');
    // Open up the desired object store.
    const store = tx.objectStore('fi');
    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();
    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
}

initdb();
