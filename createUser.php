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
        
        
        echo ("ACC_ALREADY_EXISTS" . "\n");

        
    }
} 
else 
{
    echo ("CREATING_ACC". "\n");
    
    $sql = "INSERT INTO `UserData`(`UserName`, `Password`) VALUES (\"$UserName\",\"".password_hash($UserPassword,PASSWORD_DEFAULT)."\")";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            echo $row;
        }
    }
}

$conn->close();

//Expected password: "SuperSecure"
?>

