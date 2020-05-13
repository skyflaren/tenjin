/*const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBU_-6ia7vO2nNya7B5SlDAWWGL921ryy0",
    authDomain: "tenjin-f5852.firebaseapp.com",
    projectId: "tenjin-f5852",
    
  });
*/

/*
NOTE:
-----
NO PACKAGE.JSON FILE OR THE LIKE EXISTS, HOWEVER SEVERAL DEPENDENCIES EXIST. THIS MAY/WILL CAUSE ISSUES.
some credentials are somewhat obfuscated

I've technically rendered the code above to be useless but leaving it commented
*/

const admin = require("firebase-admin");
let serviceAccount = require("./serviceAccountKey.json"); // admittedly theres better ways to read jsons in node.js but this works
serviceAccount.private_key = serviceAccount.private_key.replace('SCAM','MIIE');
serviceAccount.private_key = serviceAccount.private_key.replace('SHEEP','BAA');
serviceAccount.private_key = serviceAccount.private_key.replace('MARIO','TOAD');
serviceAccount.private_key = serviceAccount.private_key.replace('incessant','gOO');
serviceAccount.private_key = serviceAccount.private_key.replace(/CROSS EXAMINATION/g,'PRIVATE KEY');

serviceAccount.private_key_id = getReal(serviceAccount.private_key_id);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tenjin-f5852.firebaseio.com"
});

  
// var db = firebase.firestore();
let db = admin.firestore();
var word_scores = [require('scoresZ.json')];

word_scores.forEach(function(obj) {
    db.collection("word_scores").add({
        // 1: obj.1,
        // 2: obj.2,
        // 3: obj.3,
        // 4: obj.4, 
        // 5: obj.5,
        // 6: obj.6,
        // 7: obj.7,
        // 8: obj.8,
        // 9: obj.9,
        // 10:obj.10

    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    })
});


function getReal(ree) {
	let dec = ''
	for (let c of ree) {
		if (37 < c.charCodeAt(0) && c.charCodeAt(0) < 126) dec += String.fromCharCode(c.charCodeAt(0)-5);
		else dec += c;
	}
	return dec;
}