<?php
function OpenCon()
 {
    $servername = "ExampleServerName";
    $username = "ExampleUsername";
    $password = "ExamplePassword";
    $dbname = "ExampleDatabaseName";
    $conn = new mysqli($servername, $username, $password, $dbname) or die("Connect failed: %s\n". $conn -> error); 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
?>
