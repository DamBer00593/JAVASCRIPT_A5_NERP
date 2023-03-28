<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hangman A5</title>
    <script><?php include('mainV6.js');?></script>
    <style><?php include('main.css'); ?></style>
</head>
<body>

    <header>
        <h3>Hangman A5</h3>
        <div id = "usernameField">
            SampleUsername teehee
        </div>
    </header>

    <div id="content">
        <div id = "categoryButtons"></div>
        <div id = "gameDiv" class = "hidden">
            <div id = "images">
                <img src = "Images/Hangman1.png" alt = "6 lives remaining" id = "Lives6">
                <img src = "Images/Hangman2.png" alt = "5 lives remaining" class = "hidden" id = "Lives5">
                <img src = "Images/Hangman3.png" alt = "4 lives remaining" class = "hidden" id = "Lives4">
                <img src = "Images/Hangman4.png" alt = "3 lives remaining" class = "hidden" id = "Lives3">
                <img src = "Images/Hangman5.png" alt = "2 lives remaining" class = "hidden" id = "Lives2">
                <img src = "Images/Hangman6.png" alt = "1 lives remaining" class = "hidden" id = "Lives1">
                <img src = "Images/Hangman7.png" alt = "0 lives remaining" class = "hidden" id = "Lives0">
            </div>
            <div id="letters"></div>
            <div id = "leaderboard">
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Category</th>
                    </tr>
                    <?php
                        include 'dbConn.php';

                        $conn = openCon();
                        $sql = "SELECT UserName, max(Score) as Score, CategoryName 
                        from GamesPlayed g join UserData u on u.UserID = g.GamePlayerID join Category c on c.CategoryID = g.CategoryID 
                        group by UserName, CategoryName
                        order by Score desc";

                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo "<tr><td>" . $row["UserName"] . "</td><td>" . $row["Score"] . "</td><td>" . $row["CategoryName"] . "</td></tr>";
                            }
                        }
                        CloseCon($conn);
                    ?>
                </table>
            </div>

            <div id="buttons"></div>
            <button id = "playAgain">Play Again</button>
        </div>
        
    </div>

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

    <footer>
        <p>Assignment Group Members</p>
        <ul>
            <li>Hunter McQuinn</li>
            <li>Damian Bernatchez</li>
        </ul>
    </footer>
</body>
