<?php
include 'dbConn.php';
$UserName = $_GET["A"];
$UserPassword = $_GET["B"];

$conn = openCon();

# execute a query and output its results
$sql = "SELECT * FROM UserData where UserName = \"$UserName\"";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        //echo "bundle: " . $row["Password"]. ", " . $row["UserID"]. ", " . $row["UserName"]. "</br>";
        
        
        echo ("3" . "\n");

        
    }
} 
else 
{
    echo ("1". "\n");
    
    $sql = "INSERT INTO `UserData`(`UserName`, `Password`) VALUES (\"$UserName\",\"".password_hash($UserPassword,PASSWORD_DEFAULT)."\")";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
        }
    }
}

CloseCon($conn);
?>

