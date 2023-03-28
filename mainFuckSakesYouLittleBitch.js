window.onload = function(){

    //Event Listners
       
    document.querySelector("#loginBut").addEventListener("click",serverStuff.LogintoAccount)
    document.querySelector("#SignupBut").addEventListener("click",serverStuff.SignupUseraccount)
    document.querySelector("#SignUp_A_Tag").addEventListener("click",pageEvents.SignupSwitchState)
    document.querySelector("#LogIn_A_tag").addEventListener("click",pageEvents.LoginSwitchState)
}
const serverStuff = {
    dataReturned:"",
    SignupUseraccount : function(){
        let signupUser = document.querySelector("#username_Field_SignUp").value
        let SignupPass = document.querySelector("#password_Field_SignUp").value
        let SignupPassConf = document.querySelector("#Conf_password_Field_SignUp").value
        if ((SignupPass == SignupPassConf) == false){
            alert("Passwords Dont Match");
        } else{
            serverStuff.sendData("createUser.php",[signupUser,SignupPass]);
            pageEvents.logState = Number(serverStuff.dataReturned);
            switch (pageEvents.logState){
                case 0:
                    break;
                case 1:
                    pageEvents.userName = signupUser;
                    break;
                case 3:
                    alert(signupUser + " already exists");
                    break;
            }
        }
        
    },
    LogintoAccount : function(){
        let user = document.querySelector("#username_Field_Login").value;
            
        let pass = document.querySelector("#password_Field_Login").value;
        
        let list = [user,pass]
        serverStuff.sendData("LoginUser.php",list)
        pageEvents.logState = Number(serverStuff.dataReturned);

        switch (pageEvents.logState){
            case 0:
                break;
            case 1:
                pageEvents.userName = user;
                break;
            case 2:
                alert("Password Incorrect");
                break;
            case 3:
                alert(user + " does not exist");
                break;
        }

    },
    sendData : function(url, lst){
        let args = "";
        for (let i = 65; i<lst.length + 65; i++){
            args += String.fromCharCode(i) + "=" + lst[i-65];
            if (i - 65 != lst.length-1)
                args+="&";
        }

        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                serverStuff.dataReturned = xhr.responseText;     
                               
            }
        }
        xhr.open("GET", url+"?"+args, false);
        xhr.send();        
    }

}

const pageEvents = {
    userName : "",
    logState : 0,
    // State 0 guest

    // State 1 Success
    // State 2 Passowrd Error
    // State 3 Does not exist

    // State 1 Success
    // State 2 Passwords dont match
    // State 3 Accounts exists

    loginState : function(){
        document.querySelector("#Login").classList.remove("hidden")
    },
    SignupSwitchState : function(){
        document.querySelector("#Login").classList.add("hidden")
        document.querySelector("#SignUp").classList.remove("hidden")
    },
    LoginSwitchState : function(){
        document.querySelector("#Signup").classList.add("hidden")
        document.querySelector("#Login").classList.remove("hidden")
    },
    updateLeaderboard : function(){
        //Unfinished???
        let lb = document.querySelector("#leaderboard");
        lb.innerHTML = "<table><tr><th>Name</th><th>Score</th></tr>";
        lb.innerHTML += this.dataReturned + "</table>";
    }
}
    
