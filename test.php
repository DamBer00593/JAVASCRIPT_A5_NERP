<?php
$UserName = $_GET["A"];
$UserPassword = $_GET["B"];


//echo $UserName . $UserPassword . "\n";
//Database Connection
 
$servername = "localhost:3306";
$username = "rolandre_HangmanCreds";
$password = "UwUPassword";
$dbname = "rolandre_LIGHTGAMING_A5Hangman";

# connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

# execute a query and output its results
$sql = "SELECT * FROM UserData where UserName = \"$UserName\"";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        //echo "bundle: " . $row["Password"]. ", " . $row["UserID"]. ", " . $row["UserName"]. "</br>";
        
        $verify = password_verify($password,$row["Password"]);
        if (password_verify($UserPassword,$row["Password"])){
        echo ("ACC_CONN_TRUE" . "\n");
        }else{
        echo ("ACC_CONN_FALSE". "\n");
        }

        
    }
} 
else 
{
    echo "ACC_ERR";
}

$conn->close();

//Expected password: "SuperSecure"
?>

