<head>
    <script src = "mainFuckSakesYouLittleBitch.js"></script>
    <style><?php include('main.css'); ?></style>
</head>
<body>

    <header>
        <div class = "Header">
        <h3>Hangman A5</h3>
        </div>
    </header>
    <div id = "Login" class = "loginPane">
        <div id = "login_Background">
            <div id = "login_Information">
                <h2>LOGIN</h2>
                <label for = "username_Field_Login">Username: </label>
                <input type = "text" id = "username_Field_Login">
                <label for = "password_Field_Login">Password: </label>
                <input type = "password" id = "password_Field_Login">
                <button id = "loginBut">LOGIN</button>
                <button id = "GuestBut">Or play as guest</button>
                <p>Or create an account <a id = "SignUp_A_Tag">here</a></p>
            </div>
        </div>
    </div>

    <div id = "SignUp" class = "loginPane hidden">
        <div id = "login_Background">
            <div id = "Signup_Information">
                <h2>SIGNIN</h2>
                <label for = "username_Field_SignUp">Username: </label>
                <input type = "text" id = "username_Field_SignUp" value = "">
                <label for = "password_Field_SignUp">Password: </label>
                <input type = "password" id = "password_Field_SignUp" value = "">
                <label for = "Conf_password_Field_SignUp">Confirm Password: </label>
                <input type = "password" id = "Conf_password_Field_SignUp" value = "">
                <button id = "SignupBut">SIGNUP</button>
                <p>Or login to an account <a id = "LogIn_A_tag">here</a></p>
            </div>
        </div>
    </div>
</body>
