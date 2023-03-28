<?php
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
        
        $verify = password_verify($password,$row["Password"]);
        if (password_verify($UserPassword,$row["Password"])){
        echo ("1");
        }else{
        echo ("2");
        }

        
    }
} 
else 
{
    echo "3";
}

CloseCon($conn);
?>

