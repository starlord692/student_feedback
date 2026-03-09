<?php

$conn = mysqli_connect("localhost","root","","feedback_db");

$name = $_POST['studentName'];
$email = $_POST['studentEmail'];
$course = $_POST['course'];
$feedback = $_POST['feedback'];

$sql = "INSERT INTO feedback(name,email,course,feedback)
VALUES('$name','$email','$course','$feedback')";

mysqli_query($conn,$sql);

echo "success";

?>
