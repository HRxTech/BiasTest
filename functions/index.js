const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fetch = require('isomorphic-fetch');

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

    let ipAddress = req.ip;
    let testId = req.body.testId;

    function add(a, b) {
        return a + b;
    }

    let r1Sum = r1Times.reduce(add, 0);
    let r2Sum = r2Times.reduce(add, 0);
    let r3Sum = r3Times.reduce(add, 0);
    let r4Sum = r4Times.reduce(add, 0);

    let iat = ((r3Sum / r3Times.length + r4Sum / r4Times.length) / 2) - ((r1Sum / r1Times.length + r2Sum / r2Times.length) / 2);
    if (!admin.apps.length) {
        admin.initializeApp(functions.config().firebase);
    }
    var db = admin.firestore();

    return db.collection('BiasTest').add({
        testId: testId,
        score: iat,
        ipAddress: ipAddress,
        createdAt: Date.now()
    }).then(ref => {
        console.log('Added document with ID: ', ref.id);
        return res.json({
            score: iat,
            refId: ref.id
        });
    });
});

/**
 * update user info given the ref id
 * race, gender, age, and email
 */
exports.updateTest = functions.https.onRequest((req, res) => {
    console.log('starting');

    // TODO: error checking

    if (req.method !== 'POST') {
        return res.status(403).send('POST only');
    }

    let refId = req.body.refId;
    let race = req.body.race;
    let gender = req.body.gender;
    let age = req.body.age;
    let email = req.body.email;

    if (!admin.apps.length) {
        admin.initializeApp(functions.config().firebase);
    }
    var db = admin.firestore();

    var testRef = db.collection('BiasTest').doc(refId);

    // Set the user info
    return testRef.update({
        race: race,
        gender: gender,
        age: age,
        email: email
    }).then(ref => {
        res.status(200).end();
    })
});

/**
 * Retrieve Geo info based on IP
 * when a new test is submitted.
 */
exports.updateGeo = functions.firestore.document('BiasTest/{id}').onCreate(event => {
    console.log('Starting function updateGeoData');
    console.log(event.data.data());

    // Get the test that was just submitted.
    let ipAddress = event.data.data().ipAddress;

    // Get Geo info based on IP and save it to the database.
    // NOTE: Cannot access external network without attaching a billing
    // account to firebase.
    return fetch('https://freegeoip.net/json/' + ipAddress)
        .then((response) => {
            console.log('received geo data.');
            console.log(response);
            event.data.ref.set({
                geoData: response
            }, { merge: true });
        }).catch((error) => {
            console.log(error);
        });
});
