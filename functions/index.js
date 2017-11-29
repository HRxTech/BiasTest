const admin = require('firebase-admin');
const functions = require('firebase-functions');


/**
 * Submit 4 arrays, r1Times, r2Times, r3Times, r4Times
 * each array contains the response time in miliseconds for each response
 * return the IAT score.
 */
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

    let iat = ((r3Sum / r3Times.length + r4Sum / r4Times.length) / 2) - ((r1Sum / r1Times.length + r2Sum / r2Times.length) / 2);
    admin.initializeApp(functions.config().firebase);
    var db = admin.firestore();

    var addDoc = db.collection('BiasTest').add({
        score: iat
    }).then(ref => {
        console.log('Added document with ID: ', ref.id);
    });

    return res.json({ score: iat });
});