<?php
function OpenCon()
 {
    $servername = "localhost:3306";
    $username = "rolandre_HangmanCreds";
    $password = "UwUPassword";
    $dbname = "rolandre_LIGHTGAMING_A5Hangman";
    $conn = new mysqli($servername, $username, $password, $dbname) or die("Connect failed: %s\n". $conn -> error); 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
?>