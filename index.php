<?php
    if (isset($_SESSION["username"])){
        session_destroy();
    }
    session_start();
    include("database.php");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $_SESSION["username"] = $_POST["username"];
        $_SESSION["password"] = $_POST["password"];

        try {
            // Check if the username already exists
            $stmt = $conn->prepare("SELECT * FROM users WHERE usernames = ?");
            $stmt->bind_param("s", $_SESSION["username"]);
            $stmt->execute();
            $result = $stmt->get_result();

            // If the username does not exist, insert the new user
            if ($result->num_rows === 0) {
                $hash = password_hash($_SESSION["password"], PASSWORD_DEFAULT);
                $insertStmt = $conn->prepare("INSERT INTO users (usernames, passwords) VALUES (?, ?)");
                $insertStmt->bind_param("ss", $_SESSION["username"], $hash);
                $insertStmt->execute();

                // Close the prepared statement
                $insertStmt->close();

                // Redirect to the main page
                header("Location: mainpage.html");
                exit();
            } else {
                echo "Username already exists";
            }

            // Close the prepared statement
            $stmt->close();
        } catch (mysqli_sql_exception $e) {
            echo "An error occurred while processing your request: ", $e->getMessage();
        } finally {
            // Close the database connection
            $conn->close();
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>login</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' href="lightstyle.css">
</head>
<body>

    <div id="loginfor">
        <form action="index.php" method="post">
            <p>Hey hey hey! Who are you?</p>
            <input id="username" name="username" placeholder="Your username here" required maxlength="25"><br>
            <input id="password" name="password" placeholder="Your password here" required maxlength="10"><br>
            <button type="submit" onclick="SaveDatas()">Register</button><br>
            <img src="" id="randomimage" alt="gameimg"><br>
            Do you have an account? Then <a href="login.php">login</a>
        </form>
    </div>
    <p id="datetime">YYYY-MM-DD</p>
</body>
<script>
    function SaveDatas(){
        const name = <?php echo $_SESSION['username']; ?>;
        const usercolor = ["#ffe396", "#d0ff96", "#96ffc7", "#96b8ff", "#c296ff", "#ff9696", "#96b8ff", "#69ff63", "#ffb963", "#ff63fa"][Math.floor(Math.random() * 10)];
        window.localStorage.setItem("username", username.value);
        window.localStorage.setItem("usercolor", usercolor);
    }
    function setTheme(theme){
        let oldlink = document.getElementsByTagName("link").item(0);
        let newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", theme);

        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
        document.body.style.display = 'block';
    };
    window.onload = function(){
        document.body.style.zoom = "80%";
        document.getElementById("datetime").innerText = new Date().toISOString().split("T")[0];
        let theme = window.localStorage.getItem("theme");
        if (theme){
            setTheme(theme);
        }
        else{
            window.alert("An error occured about theme. Light style will be used");
        }
        const randomimages = ["images/face.ico", "images/sudoku.ico", "images/gencocards.ico", "images/catchthegenco.ico", "images/writeitgenco.ico"];
        document.getElementById("randomimage").src = randomimages[Math.floor(Math.random() * 5)];
    }
</script>
</html>