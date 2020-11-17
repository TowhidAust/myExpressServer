// This import loads the firebase namespace along with all its type information.
var firebase = require("firebase/app");


// These imports load individual services into the firebase namespace.

require ("firebase/auth");
require ("firebase/database");
require ("firebase/storage");



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyDs9oOwZamQjrcVaErG_S55bqSrai4Wwy4",
    authDomain: "onlineproductsellingapp.firebaseapp.com",
    databaseURL: "https://onlineproductsellingapp.firebaseio.com",
    projectId: "onlineproductsellingapp",
    storageBucket: "onlineproductsellingapp.appspot.com",
    messagingSenderId: "253823759001",
    appId: "1:253823759001:web:40bc0caa3900b16da77e08",
    measurementId: "G-STBH7K76E6"
};
  

firebase.initializeApp(config);

// module.exports = 'Hello world';
// Export the database, auth and firebase timestamp seperately for convenience
 const database = firebase.database();
 const auth = firebase.auth();
 const storage = firebase.storage();
 const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

 module.exports = {firebase, database, auth, storage, serverTimestamp};