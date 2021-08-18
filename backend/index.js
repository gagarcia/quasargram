/*
    dependencies
*/

    const express = require('express')
    const admin = require('firebase-admin');

/*
    config - express
*/

    const app = express()
    const port = 3000

    /*
    config - Firebase
    */


    const serviceAccount = require('./serviceAccountKey.json');

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();


/*
    endpoint - GET POSTS
*/

    app.get('/posts', (request, response) => {
        response.set('Access-Control-Allow-Origin', '*')
        posts = []

        db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
            snapshot.forEach((doc) => {
                posts.push(doc.data())
            })
            response.send(posts)
        })
        
    })

/*
    endpoint - push POSTS
*/

app.post('/createPost', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    response.send(request.headers)
    
})


/*
    Listen
*/

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })