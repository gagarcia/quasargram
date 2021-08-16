const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.posts = functions.https.onRequest((request, response) => {
  let posts = [
    {
        caption: "Golden Gate",
        location: "Sam Francisco, ca"
      },
      {
        caption: "Chicago",
        location: "Chicago, il"
      }
      
  ];
  response.send(posts);
});
