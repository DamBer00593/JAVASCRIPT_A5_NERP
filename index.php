<head>
    <script src = "main.js"></script>
    <style><?php include('main.css'); ?></style>
</head>
<body>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste eligendi ipsa soluta nisi suscipit minus cum debitis optio asperiores ab. Quaerat, cum, itaque. Architecto temporibus illo eos perferendis itaque ut!</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio vitae, suscipit similique sapiente odit animi minus illo amet nemo dicta autem iusto repellendus, ab, nobis. Reiciendis numquam consectetur tempore repellat.</p>
    <div id = "Login" class = "loginPane">
        <div id = "login_Background">
            <div id = "login_Information">
                <h2>LOGIN</h2>
                <label for = "username_Field_Login">Username: </label>
                <input type = "text" id = "username_Field_Login">
                <label for = "password_Field_Login">Password: </label>
                <input type = "text" id = "password_Field_Login">
                <button id = "but">LOGIN</button>
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
                <input type = "text" id = "password_Field_SignUp" value = "">
                <label for = "Conf_password_Field_SignUp">Confirm Password: </label>
                <input type = "text" id = "Conf_password_Field_SignUp" value = "">
                <button id = "SignupBut">SIGNUP</button>
                <p>Or login to an account <a id = "LogIn_A_tag">here</a></p>
            </div>
        </div>
    </div>
</body>
