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
    <div id="menu">
        <button type="button" id="games" class="menu" onclick="window.location.href = 'mainpage.html'">Genco Games</button>
        <button type="button" id="" class="menu" onclick="window.location.href = 'aboutgenco.html'">About Genco</button>
        <button type="button" id="mark">GencoSite</button><br>
    </div>

    <form action="comment.php" method="post">
        <div id="forum">
            <ul id="forummessages">

            </ul><br>
            <input id="docomment" name="docomment" autocomplete="off" required maxlength="250" placeholder="write something">
            <p id="limitwarning"></p>
        </div>
    </form>
    
    
    <div id="contact">
        <a href="https://www.instagram.com/batugencpiano/"><img src="images/instagramdark.ico" alt="instagram" id="instagram"></a>        
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

    let forummessages = document.getElementById("forummessages");
    let docomment = document.getElementById("docomment");
    const username = window.localStorage.getItem("username");
    const usercolor = window.localStorage.getItem("usercolor");
    let warning = document.getElementById("limitwarning");
    const usrname = "<?php echo $_SESSION["username"]; ?>";
    let commentlimit = 0;
    const limit = 15;

    let invisibleHolders = chooseBackgroundTheme("antiquewhite", "rgb(36, 36, 36)");

    window.onload = checkForHighLimit();

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter"){
            addComment(docomment);
        }
    });

    function chooseBackgroundTheme(lightstyle, darkstyle){
        return window.localStorage.getItem("theme") == "lightstyle.css" ? lightstyle : darkstyle;
    }

    function addComment(message){
        if (message.value != ""){
            let hello = document.createElement("li");
            hello.innerHTML = `<span style='color: ${usercolor}'>${usrname}:</span> ${message.value}`;
            forummessages.appendChild(hello);
            docomment.value = "";
            checkForHighLimit();
            checkForCommentLimit();
        }
    }

    function checkForHighLimit(){
        if (forummessages.children.length >= limit){
            forummessages.firstChild.remove();
        }
        else {
            while (forummessages.children.length != limit){
                let hello = document.createElement("li");
                hello.textContent = 0;
                hello.style.color = invisibleHolders;
                forummessages.appendChild(hello);
            }
        }
    }

    function checkForCommentLimit(){
        commentlimit++;
        localStorage.setItem("commentlimit", commentlimit);
        if (localStorage.getItem("commentlimit") == 15){
            docomment.disabled = true;
            warning.textContent = "You have reached 15 message limit! Please wait for 10 seconds."
            setTimeout(() => {
                warning.textContent = "";
                docomment.disabled = false;
                commentlimit = 0;
            }, 10000);
        }
    }
</script>
</html>