const firebaseConfig = {
  apiKey: "AIzaSyAyaOmmzlJHH4OmWsKt5XdG2N5p7naIHcI",
  authDomain: "petvishwa-924f3.firebaseapp.com",
  projectId: "petvishwa-924f3",
  storageBucket: "petvishwa-924f3.appspot.com",
  messagingSenderId: "61527684517",
  appId: "1:61527684517:web:85b700047c240b8d3ee44c",
  measurementId: "G-R4DJWWDBQW"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();




function Logout() {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  //   document.getElementById("user_div").value = "";
  //   document.getElementById("login_div").value = "";
  console.log("Logged out")
   // window.location.replace("login.html");
  }).catch(function(error) {
    // An error happened.
      console.log("Error : " + error)
  }); 
}


const otpdiv = document.querySelector(".otp");
otpdiv.style.display = "none";
const otpbtn = document.querySelector("#otpbtn");
const signbtn = document.querySelector("#signbtn");
signbtn.style.display = "none";

function submitPhoneNumberAuth() {
    var phoneNumber = "+91" + document.querySelector("#phoneNumber").value;
    console.log(phoneNumber);
    var appVerifier = window.recaptchaVerifier;
    firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
        })
        .catch(function (error) {
            console.log(error);
        });
}


window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
        size: "invisible",
        callback: function (response) {
            otpdiv.style.display = "block";
            otpbtn.style.display = "none";
            signbtn.style.display = "block";
            very.style.display = "";
            submitPhoneNumberAuth();
        },
    }
);

function submitPhoneNumberAuthCode() {
    // We are using the test code we created before
    var code = document.getElementById("codenumber").value;
    //var code = document.querySelector("#code").value;
    console.log(codenumber);
    confirmationResult
        .confirm(code)
        .then(function (result) {
            var user = result.user;
            window.location.reload();
            //refresh();
        })
        .catch(function (error) {
            console.log(error);
        });
}


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $("#userlogid").val(user.uid);
    document.querySelector("#accountdiv").style.display = "block";
    document.querySelector("#logindiv").style.display = "none";
  } else {
     document.querySelector("#logindiv").style.display = "block";
     document.querySelector("#accountdiv").style.display = "none";
  }
});






function timeformate(data){
  var timestamp=data*1000;
   return new Date(timestamp).toLocaleTimeString()
}
function dateformate(data){
  var timestamp = data.toDate().toISOString();
  return new Date(timestamp).toLocaleDateString();
}