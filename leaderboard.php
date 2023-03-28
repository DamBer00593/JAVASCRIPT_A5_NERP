<?php

include 'dbConn.php';
$UserName = $_GET["A"];
$GameScore = $_GET["B"];
$CategoryName = $_GET["C"];
$GameWord = $_GET["D"];
$GameGuesses = $_GET["E"];






$conn = openCon();
$sql = "SELECT UserID from UserData where UserName = \"$UserName\"";
echo $sql;
$result = $conn->query($sql);
while($row = mysqli_fetch_assoc($result)) {
    $usrID = $row["UserID"]; 

}     
$sql = "SELECT * from Category where CategoryName = \"$CategoryName\"";
$result = $conn->query($sql);
while($row = mysqli_fetch_assoc($result)) {
    $CatID = $row["CategoryID"];      
}
$sql = "INSERT INTO `GamesPlayed`(`GamePlayerID`, `Score`, `CategoryID`, `Word`, `guesses`) VALUES ($usrID,$GameScore,$CatID,\"$GameWord\",$GameGuesses)";
$result = $conn->query($sql);
if ($result->num_rows > 0) {

}

CloseCon($conn);
?>