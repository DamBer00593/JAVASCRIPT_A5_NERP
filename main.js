window.onload = function(){
    document.querySelector("#but").addEventListener("click",function(){
        console.log(document.querySelector("#username_Field_Login"))
        console.log(document.querySelector("#password_Field_Login"))
        let user = document.querySelector("#username_Field_Login").value;
        
        let pass = document.querySelector("#password_Field_Login").value;
        
        parameters = "p="+user+"?q="+pass
        let list = [user,pass]
        sendData("test.php",list)
    })


    //Event Listners
    document.querySelector("#SignUp_A_Tag").addEventListener("click",SignupSwitchState)
    document.querySelector("#SignupBut").addEventListener("click",SignupUseraccount)
}

function SignupSwitchState(event){
    console.log("clicked")  
    document.querySelector("#Login").classList.add("hidden")
    document.querySelector("#SignUp").classList.remove("hidden")
}

function SignupUseraccount(){
    console.log("I Clicked")
    //username_Field_SignUp     
    //password_Field_SignUp
    //Conf_password_Field_SignUp
    let signupUser = document.querySelector("#username_Field_SignUp").value
    let SignupPass = document.querySelector("#password_Field_SignUp").value
    let SignupPassConf = document.querySelector("#Conf_password_Field_SignUp").value
    if ((SignupPass && SignupPassConf) == false){
        alert("Passwords Dont Match");
    } else{
        sendData("createUser.php",[signupUser,SignupPass]);
    }
}


function sendData(url, lst){
    let args = "";
    for (let i = 65; i<lst.length + 65; i++){
        args += String.fromCharCode(i) + "=" + lst[i-65];
        if (i-65 != lst.length-1)
            args+="&";
    }
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
            console.log(xhr.responseText);       
        }
    }
    xhr.open("GET", url+"?"+args, true);
    xhr.send();
    
}