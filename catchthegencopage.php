<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="lightstyle.css">
    <title>GencoGames</title>
</head>
<body>
    <button type="button" id="games" class="menu" onclick="window.location.href = 'mainpage.html'">Genco Games</button>
    <button type="button" id="" class="menu" onclick="window.location.href = 'aboutgenco.html'">About Genco</button>
    <button type="button" id="mark">GencoSite</button>

    <div id="catchtherun">
        <p id="score">0</p>
        <p id="highscore">Press ENTER to start</p>
        <div id="progressBar"></div>
        
        <script>
            for (let i = 1; i <= 100; i++) {
                document.write(`<button id="${i}" disabled></button>`);
                if (i % 10 === 0) {
                    document.write('<br>');
                }
            }
        </script>
    </div>

    <div id="contact">
        <a href="https://www.instagram.com/batugencpiano/"><img src="" alt="instagram" id="instagram"></a>
    </div>
    <p id="datetime">YYYY-MM-DD</p>
</body>
<script>
    function setTheme(theme, instagram){
        let oldlink = document.getElementsByTagName("link").item(0);
        let newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", theme);

        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
        document.body.style.display = 'block';

        document.getElementById("instagram").src = instagram;
    };
    document.body.style.zoom = "80%";
    document.getElementById("datetime").innerText = new Date().toISOString().split("T")[0];
    let theme = window.localStorage.getItem("theme");
    let instagram = window.localStorage.getItem("instagram");
    if (theme && instagram){
        setTheme(theme, instagram);
    }
    else{
        window.alert("An error occured about theme. Light style will be used");
        setTheme("lightstyle.css", "images/instagramdark.ico");
    }
</script>
<script src="catchthegamepage.js"></script>
</html>
