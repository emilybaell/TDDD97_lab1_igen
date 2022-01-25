displayView = function(){
    //code req to diplay a view
    document.getElementById("show welcomeview").innerHTML = document.getElementById("welcomeview").innerHTML;
};
window.onload=function(){
    displayView();
};

function submitLogin(form){
    // let contact = {"name" : form.name.value, "number" : form.number.value};
    // let contacts = localStorage.getItem("contacts");
    // contacts = JSON.parse(contacts);
    // contacts.push(contact);
    // localStorage.setItem("contacts", JSON.stringify(contacts));
  
};

function submitSignUp(form){
    if(checkSame() && checkCharaters()){
        // document.getElementById('message').style.color = 'green';
        // document.getElementById('message').innerHTML = 'Successful signup';
        
        var signUpData = {
            "email": form.signup_email.value,
            "password": form.signup_pass.value,
            "firstname": form.signup_fname.value,
            "familyname": form.signup_lname.value,
            "gender": form.signup_gender.value,
            "city": form.signup_city.value,
            "country": form.signup_country.value
            
        };

        serverstub.signUp(signUpData);
        
    } else {
        // document.getElementById('message').style.color = 'red';
        // document.getElementById('message').innerHTML = 'Error occured';
        return false;
        
    }
  
};

function checkSame(){
    if (document.getElementById('signup_pass').value ==
          document.getElementById('signup_repeatpass').value) {
              
        //    document.getElementById('message').style.color = 'green';
        //    document.getElementById('message').innerHTML = 'matching';
           return true;
      } else {
            // document.getElementById('message').style.color = 'red';
            // document.getElementById('message').innerHTML = 'Error occured';
            return false;
      } 
  
};


function checkCharaters(){
    var password = document.getElementById('signup_pass').value;
    if ( password.length < 8) {
        // document.getElementById('message').style.color = 'red';
        //    document.getElementById('message').innerHTML = 'Too short';
              return false;
           
      } else {
        // document.getElementById('message').style.color = 'green';
        // document.getElementById('message').innerHTML = 'OK';
            return true;
             
      } 
  
};