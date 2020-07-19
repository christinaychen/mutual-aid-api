const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert({
      "project_id": process.env.FIREBASE_PROJECT_ID.replace("",""),
      "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      "clientEmail": process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: 'https://mutual-aid-site.firebaseio.com'
  });


  async function verifyToken(idToken) {
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      return True
    }).catch(function(error) {
      console.log(error)
      return False
    });

  }

async function getDb() {
    return admin.database();
}

async function signUp(firstName, lastName, uuid) {
    var db = await getDb()
    var userRef = db.ref("users").child(uuid)
    userRef.set({
        first_name: firstName,
        last_name: lastName
    })
}


module.exports = {
  signUp,
  getDb
}