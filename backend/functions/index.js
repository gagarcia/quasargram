/*
    dependencies
*/

    const functions = require("firebase-functions");
    const admin = require('firebase-admin');


/*
    config - express
*/

/*
    config - firestore
*/

    admin.initializeApp();

    const db = admin.firestore();

/*
    endpoint
*/  



    // Create and Deploy Your First Cloud Functions
    // https://firebase.google.com/docs/functions/write-firebase-functions

    exports.posts = functions.https.onRequest((request, response) => {
        response.set('Access-Control-Allow-Origin', '*')
    
        let posts = []

        db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
            
            snapshot.forEach((doc) => {
                posts.push(doc.data())
            });
            response.send(posts);

        })
    });
