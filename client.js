var lastBrowse;

displayView = function(){
    if(localStorage.getItem('token') != null){
        document.getElementById("show view").innerHTML = document.getElementById("profileview").innerHTML;
    } else {
        document.getElementById("show view").innerHTML = document.getElementById("welcomeview").innerHTML;
    }
};

window.onload=function(){
    displayView();
};

function submitLogin(form){
    var password = document.getElementById('login_pass').value;
    var username = document.getElementById('login_email').value;
    if(checkCharaters(password)){
        var response = serverstub.signIn(username, password);
        if (response.success == true){
            localStorage.setItem('token', response.data);
            displayView();
            getProfile(username);
            UpdateWall();
        }
    } else {
        Show_message(response.message);
    }
    return false;
};

function submitSignUp(form){
    var password = document.getElementById('signup_pass').value;
    var repeat_password = document.getElementById('signup_repeatpass').value;
    if(checkSame(password, repeat_password) && checkCharaters(password)){
        var signUpData = {
            "email": form.signup_email.value,
            "password": form.signup_pass.value,
            "firstname": form.signup_fname.value,
            "familyname": form.signup_lname.value,
            "gender": form.signup_gender.value,
            "city": form.signup_city.value,
            "country": form.signup_country.value
        };
        var response = serverstub.signUp(signUpData);
        if(response.success == true){
            document.getElementById(form).reset();
        }
        return false;
    } else {
        Show_message(response.message);
        return false;
        
    } 
  
};

function Show_message(message) {
    confirm(message);
    
}

function checkSame(password, repeat_password){
    if (password == repeat_password) {
           return true;
    } else {
            return false;
    } 
};


function checkCharaters(password){
    if ( password.length < 8) {
              return false;
    } else {
            return true;  
    } 
};

function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tabs");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(tabName).style.display = "block";  
};


function submitSignOut(){
    var response = serverstub.signOut(localStorage.getItem('token'));
    if(response.success == true){
        localStorage.removeItem('token');
    }
    displayView();

    
};

function submitChangePassword(form){
    var old_password = form.change_old.value;
    var new_password = form.change_new.value;
    var repeat_password = form.change_repeat.value;
    if(checkSame(new_password, repeat_password) && checkCharaters(new_password)){
        var response = serverstub.changePassword(localStorage.getItem('token'), old_password, new_password);
        if(response.success == true){
            document.getElementById(form).reset();
        }
        return false;
    } else {
        Show_message(response.message);
        return false;
    }
    
};

function getProfile(email){
    var response = serverstub.getUserDataByEmail(localStorage.getItem('token'), email);
    if(response.success == true){
        document.getElementById("profile_email").innerHTML = "Email: " + response.data.email;
        document.getElementById("profile_fName").innerHTML = "First name: " +  response.data.firstname;
        document.getElementById("profile_lName").innerHTML = "Last name: " + response.data.familyname;
        document.getElementById("profile_gender").innerHTML = "Gender: " + response.data.gender;
        document.getElementById("profile_city").innerHTML = "City: " + response.data.city;
        document.getElementById("profile_country").innerHTML = "Country: " + response.data.country;
    } else {
        Show_message(response.message);
    }
};

function getOtherProfile(){
    var response = serverstub.getUserDataByEmail(localStorage.getItem('token'), lastBrowse);
    if(response.success == true){
        document.getElementById("browse_email").innerHTML = "Email: " + response.data.email;
        document.getElementById("browse_fName").innerHTML = "First name: " +  response.data.firstname;
        document.getElementById("browse_lName").innerHTML = "Last name: " + response.data.familyname;
        document.getElementById("browse_gender").innerHTML = "Gender: " + response.data.gender;
        document.getElementById("browse_city").innerHTML = "City: " + response.data.city;
        document.getElementById("browse_country").innerHTML = "Country: " + response.data.country;
    } else {
        Show_message(response.message);
    }
};
 
function UpdateWall(){
    var response = serverstub.getUserMessagesByToken(localStorage.getItem('token'));
    if(response.success == true){
        var amount = response.data;
        document.getElementById('wall_messages').innerHTML ="";
        for(var i = 0; i < amount.length; i++){
            document.getElementById('wall_messages').innerHTML += "<div>" + response.data[i].writer + " : " + response.data[i].content + "</div>";
        }
    } else {
        Show_message(response.message);
    }
};
 
// Rensa faltet efter post
function submitPost(){
    var message = document.getElementById("postText").value;
    var user = serverstub.getUserDataByToken(localStorage.getItem('token'));
    var response = serverstub.postMessage(localStorage.getItem('token'), message, user.data.email);
    
    if(response.success == true){
        UpdateWall();
    } else {
        Show_message(response.message);
    }
};

function submitBrowse(form){
   var email = form.browse_useremail.value;
   lastBrowse = email;
   var response = serverstub.getUserDataByEmail(localStorage.getItem('token'), email);
    
    if(response.success == true){
        getOtherProfile();
        UpdateWallBrowse();
    } else {
        Show_message(response.message);
    }
    
};

function openBrowse(browseName) {
    var i;
    var x = document.getElementsByClassName("browsebox");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(browseName).style.display = "block";  
};

// Rensa faltet efter post
function submitPostBrowse(){ 
    var message = document.getElementById("postTextBrowse").value;
    var response = serverstub.postMessage(localStorage.getItem('token'), message, lastBrowse);
    
    if(response.success == true){
        UpdateWallBrowse();
    } else {
        Show_message(response.message);
    }
};



function UpdateWallBrowse(){
    var response = serverstub.getUserMessagesByEmail(localStorage.getItem('token'), lastBrowse);
    if(response.success == true){
        var amount = response.data;
        document.getElementById('wall_messagesBrowse').innerHTML ="";
        for(var i = 0; i < amount.length; i++){
            document.getElementById('wall_messagesBrowse').innerHTML += "<div>" + response.data[i].writer + " : " + response.data[i].content + "</div>"; 
        }
    } else {
        Show_message(response.message);
    }
};