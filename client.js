displayView = function(){
    //code req to diplay a view
    
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
        Show_message(response.message);
        if (response.success == true){
            localStorage.setItem('token', response.data);
            getProfile();
            displayView();
        }
        
        return false;
        
    } else {
        confirm("Nu blev det fel");
        return false;
        
    } 
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
        Show_message(response.message);
        if(response.success == true){
            document.getElementById(form).reset();
        }
        
        return false;
        
    } else {
        confirm("Nu blev det fel");
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
    Show_message(response.message);
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
        Show_message(response.message);
        if(response.success == true){
            document.getElementById(form).reset();
        }
        return false;
    } else {
        Show_message("Fel");
        return false;
    }
    
};

function getProfile(){
    var response = serverstub.getUserDataByToken(localStorage.getItem('token'));
    
    
    if(response.success == true){
        confirm(response.success);
        document.getElementById("profile_email").innerHTML = response.data.email;
        document.getElementById("profile_fName").innerHTML = response.data.firstname;
        document.getElementById("profile_lName").innerHTML = response.data.lastname;
        document.getElementById("profile_gender").innerHTML = response.data.gender;
        document.getElementById("profile_city").innerHTML = response.data.city;
        document.getElementById("profile_country").innerHTML = response.data.country;
        confirm("fett inne igen");
        

    } else {
        Show_message("Error loading profile information");
    }
};

// function checkOldPassword(old_password){
//     if(old_password == ){
//         return true;
//     } else {
//         return false;
//     }
// }