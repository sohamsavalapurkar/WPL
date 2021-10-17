window.onload = function(){

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input elements 
	// they are initially empty and hidden

	var email = document.getElementById("email");
    var span1 = document.createElement("span");
    span1.innerHTML = "Email should be a valid email e.g. abc@gmail.com";
	span1.style.display = "none"; //hide the span element
    email.parentNode.appendChild(span1);

    var password = document.getElementById("pwd");
    var span2 = document.createElement("span");
    span2.innerHTML = "The password field should contain at least six characters, one uppercase letter, one number and one special character.";
    span2.style.display = "none";
    password.parentNode.appendChild(span2);

    var confirmPassword = document.getElementById("confirm");
    var span3 = document.createElement("span");
    span3.innerHTML = "Password and confirm password should match.";
    span3.style.display = "none";
    confirmPassword.parentNode.appendChild(span3);
    

	

    email.onfocus = function(){
    	span1.style.display = "inline";
        email.classList.remove("error");
    }

    email.onblur = function(){
        span1.style.display = "none";
    }

    password.onfocus = function() {
        span2.style.display = "inline";
        password.classList.remove("error");
    }

    password.onblur = function() {
        span2.style.display = "none";
    }

    confirmPassword.onfocus = function() {
        span3.style.display = "inline";
        confirmPassword.classList.remove("error");
    }

    confirmPassword.onblur = function() {
        span3.style.display = "none";
    }

    var form = document.getElementById("myForm");
    form.onsubmit = function(e){
        
        if(email.value == '' || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            email.classList.add("error");
            span1.style.display = "inline";
            e.preventDefault();
        }
        if(!password.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)) {
            password.classList.add("error");  
            span2.style.display = "inline";
            
            e.preventDefault();
        }
        if(password.value != confirmPassword.value) {
            password.classList.add("error");
            
            span3.style.display = "inline";
            confirmPassword.classList.add("error");
            e.preventDefault();
        }
    	//e.preventDefault();

    }


}


