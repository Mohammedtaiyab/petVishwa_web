var user = database.collection("users");
var formvrtadd = document.getElementById('registeruser');


formvrtadd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var phoneNumber = "+965" + document.querySelector("#phoneNumber2").value;
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

});


function showPosition(position) {
    return  new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
 }

 function submitPhoneNumberAuthCoderegister() {
    // We are using the test code we created before
    var code = document.getElementById("codenumber").value;
    //var code = document.querySelector("#code").value;
    console.log(codenumber);
    confirmationResult
        .confirm(code)
        .then(function (result) {
            var user = result.user;
            var formData = new FormData(formvrtadd);
            var object = {};
            formData.forEach((value, key) => object[key] = value);
            object.name = object.fname + " " + object.lname;
            object.dob = new Date(object.dob);
            object.petDob = new Date(object.petDob);
            object.location = object.city;
            if (object.isDogSocialWithOther) {
                object.isDogSocialWithOther = true;
            } else {
                object.isDogSocialWithOther = false;
        
            }
            if (object.isPetRegister) {
                object.isPetRegister = true;
            } else {
                object.isPetRegister = false;
        
            }
            if (object.isPetVacinated) {
                object.isPetVacinated = true;
            } else {
                object.isPetVacinated = false;
        
            }
            if (object.isPetFriendlyWithHumans) {
                object.isPetFriendlyWithHumans = true;
            } else {
                object.isPetFriendlyWithHumans = false;
            }
            if (navigator.geolocation) {
                //object.location_coordinates =navigator.geolocation.getCurrentPosition(showPosition);
                navigator.geolocation.getCurrentPosition(function(location) {
                    object.location_coordinates =new firebase.firestore.GeoPoint(location.coords.latitude, location.coords.longitude);
                  });
            } else {
                object.location_coordinates = "";
            }
             user.doc(user.id).set(object).then((res) => {
                window.location.reload();
             })
         
            //refresh();
        })
        .catch(function (error) {
            console.log(error);
        });
}










function registersubmitPhoneNumberAuth() {

    var phoneNumber = "+965" + document.querySelector("#phoneNumber2").value;
    console.log(phoneNumber);
    var appVerifier = window.recaptchaVerifier;
    firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            document.querySelector("#registercode").style.display = "";
            document.querySelector("#verifybtn").style.display="none";
            document.querySelector("#registerbtn").style.display="";
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
            registersubmitPhoneNumberAuth();
        },
    }
);