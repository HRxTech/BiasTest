const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fetch = require('isomorphic-fetch');
const cors = require('cors')({ origin: true });

exports.averageScore = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log('starting');

        if (req.method !== 'GET') {
            return res.status(403).send('GET only');
        }

        if (!admin.apps.length) {
            admin.initializeApp(functions.config().firebase);
        }
        var db = admin.firestore();

        return db.collection('BiasTest')
            .get()
            .then((querySnapshot) => {
                const averages = {};
                querySnapshot.forEach((doc, i) => {
                    const data = doc.data()
                    if (!averages[data.testId]) {
                        averages[data.testId] = {
                            scores: [],
                            total: 0,
                            avg: 0,
                            count: 0
                        }
                    }
                    let currentAverage = averages[data.testId]
                    currentAverage.count++
                    currentAverage.scores.push(data.score)
                    currentAverage.total += data.score
                    currentAverage.avg = currentAverage.avg + ((data.score - currentAverage.avg) / currentAverage.count)                    
                })
                return averages
            })
            .then((averages) => {
                console.log('averages', averages);
                console.log('Finished');
                return res.json(averages);
            })
    })
})

/**
 * Submit 4 arrays, r1Times, r2Times, r3Times, r4Times
 * each array contains the response time in miliseconds for each response
 * return the IAT score.
 */
exports.submitTest = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log('body: ' + JSON.stringify(req.body));
        console.log('starting');

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
            source: req.body.source,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
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
                geoData: response.json()
            }, { merge: true });
        }).catch((error) => {
            console.log(error);
        });
});
