$(document).ready(function () {
    $('.modal').modal();
    firebase.auth().signOut();
});
$(document).ready(function () {
    $('select').formSelect();
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAlr3QZJrTDfA3zBPVxjzqf8o-G6wmjovE",
    authDomain: "project2-7c927.firebaseapp.com",
    databaseURL: "https://project2-7c927.firebaseio.com",
    projectId: "project2-7c927",
    storageBucket: "project2-7c927.appspot.com",
    messagingSenderId: "40852562411"
};
firebase.initializeApp(config);


const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnlogin');
const btnSignup = document.getElementById('btnsignup');
const btnLogout = document.getElementById('btnlogout');
const btnLogin1 = document.getElementById('login1');
const modal2 = document.getElementById('modal2');


//login 
btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => window.alert(e.message));
});

//signup
btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    //TODO: (maybe) check for real email
    const promise = auth.createUserWithEmailAndPassword(email, password);
    console.log("user creation works");
    promise.catch(e => window.alert(e.message));
});

//logout
btnLogout.addEventListener('click', e => {
    console.log("working event listener");
    firebase.auth().signOut();
});

//User dependant functions
var user;
var firebaseUser;
var email, uid;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        loggedIn = true;
        btnLogout.classList.remove('hide');
        btnLogin1.classList.add('hide');
        user = firebase.auth().currentUser;
        $("#welcome").text("welcome: " + user.email);
        var email = user.email;
        var uid = user.uid;
        //-----------------
        console.log("WORKING!" + user.email);
        window.alert("Welcome " + user.email)
        database.ref('users/' + uid).on("value", function (snapshot) {
            var sv = snapshot.val();
            //console.log("snapshot works: " + sv.email);
            var title = sv.favorites;
            console.log(title);
            $("#fav-list").empty();
            if (favArray.length === 0) {
                favArray = title;
                console.log(favArray);
            };
            for (var i = 0; i < title.length; i++) {
                var newBullet = $("<li>");
                newBullet.addClass("collection-item")
                newBullet.html(title[i]);
                $("#fav-list").append(newBullet);
            };
        });
    } else {
        // User is signed out.
        loggedIn = false;
        btnLogout.classList.add('hide');
        btnLogin1.classList.remove('hide');
        $("#welcome").text(" ");
    }
});

//Storing event in firebase


$(document).on("click", ".favorite", function () {
    if (loggedIn) {
        database.ref().child('users').child(uid).set({
            email: user.email,
            favorites: favArray,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        database.ref('users/' + uid).on("value", function (snapshot) {
            var sv = snapshot.val();
            //console.log("snapshot works: " + sv.email);
            var title = sv.favorites;
            console.log(title);
            //$("#fav-list").empty();
            if (favArray.length === 0) {
                favArray = title;
                console.log(favArray);
            };
            for (var i = 0; i < title.length; i++) {
                var newBullet = $("<li>");
                newBullet.addClass("collection-item")
                newBullet.html(title[i]);
                $("#fav-list").append(newBullet)
            };
        });
        this.className = "btn disabled";
    };
});