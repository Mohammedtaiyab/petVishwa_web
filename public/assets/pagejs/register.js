var usercollection = database.collection("users");
var formvrtadd = document.getElementById('registeruser');
formvrtadd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    alert("1");
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
    alert("2");
    // We are using the test code we created before
    var code = document.getElementById("registercode").value;
    //var code = document.querySelector("#code").value;
    console.log(code);
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
            console.log(user.uid);
            usercollection.doc(user.uid).set(object).then((res) => {
               window.location.reload();
             })
         
            //refresh();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function registersubmitPhoneNumberAuth() {
    alert("3");
    document.querySelector("#registercodediv").style.display = "block";
    document.querySelector("#verifybtn").style.display="none";
    document.querySelector("#registerbtn").style.display="block";
    var phoneNumber = "+965" + document.querySelector("#phoneNumber2").value;

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
            document.querySelector("#registercodediv").style.display = "block";
            document.querySelector("#verifybtn").style.display="none";
            document.querySelector("#registerbtn").style.display="block";
            registersubmitPhoneNumberAuth();
        },
    }
);
var storage = firebase.storage();
const ref = firebase.storage().ref();
$("input[type=file]").on('change',function(){
    document.getElementById("loadimg").style.display="block";
    const image =$("input[type=file]")[0].files[0];
    const path =ref.child("imagefolder/" + image.name);
    path.put(image).then(function() {
      path.getDownloadURL().then(function(url) {
        $("#PetImageURL").val(url);
        $("#loadimg").attr("src","assets/img/check.gif");
      })
    })
});

