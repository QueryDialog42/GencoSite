<?php

    try{
        $db_server = "localhost";
        $db_user = "root";
        $db_pass = "";
        $db_name = "gencousersdb";

        $conn = mysqli_connect(
            $db_server,
            $db_user,
            $db_pass,
            $db_name);
    } catch(mysqli_sql_exception){
        echo "Error connecting to database";
    }
?>