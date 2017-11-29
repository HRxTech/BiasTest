const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.submitTest = functions.https.onRequest((req, res) => {
    console.log('body: ' + JSON.stringify(req.body));
    console.log('starting');

    // TODO: error checking

    if (req.method !== 'POST') {
        return res.status(403).send('POST only');
    }

    let r1Times = req.body.r1Times;
    let r2Times = req.body.r2Times;
    let r3Times = req.body.r3Times;
    let r4Times = req.body.r4Times;

    function add(a, b) {
        return a + b;
    }

    let r1Sum = r1Times.reduce(add, 0);
    let r2Sum = r2Times.reduce(add, 0);
    let r3Sum = r3Times.reduce(add, 0);
    let r4Sum = r4Times.reduce(add, 0);

    // TODO: save score to database

    let iat = ((r3Sum / r3Times.length + r4Sum / r4Times.length) / 2) - ((r1Sum / r1Times.length + r2Sum / r2Times.length) / 2);
    return res.json({ score: iat });
});