let progressBar = document.getElementById("progressBar");
let allcards = [];
for (let i = 1; i <= 100; i++) {
    allcards.push(document.getElementById(String(i)));
}
let ready = true;
let waitingfor;
let highscore;
let currentButton;
let countdown;
let score = 0;
let speed = 60000;
if (window.localStorage.getItem("highscore") === null){
    window.localStorage.setItem("highscore", 0);
    highscore = window.localStorage.getItem("highscore");
}
else {
    highscore = window.localStorage.getItem("highscore");
}
function chooseBackgroundTheme(lightstyle, darkstyle){
    if (window.localStorage.getItem("theme") === "lightstyle.css"){
        return lightstyle;
    }
    else if (window.localStorage.getItem("theme") === "darkstyle.css"){
        return darkstyle;
    }
}
waitingfor = setTimeout(() => {
    window.alert("Bro what are you waiting for?");
}, speed);
function gamerun(){
    function nextCard(){
        let nextButton = allcards[Math.floor(Math.random() * allcards.length)];
        nextButton.style.backgroundColor = chooseBackgroundTheme("rgb(26, 26, 24)", "bisque");
        nextButton.disabled = false;
        progressBar.style.width = "0%";
        countdown = setTimeout(() => {
                window.alert("STOP! Your score is " + score);
                nextButton.disabled = true;
                document.getElementById("highscore").textContent = "Your high score is " + highscore;
                if (score > highscore){
                    document.body.style.transition = "0.25s";
                    document.body.style.backgroundColor = chooseBackgroundTheme("#99db8c", "#96cc76");
                    for (let card of allcards){
                        card.style.transition = "0.25s";
                        card.style.backgroundColor = chooseBackgroundTheme("#99db8c", "#96cc76");
                    }
                    document.getElementById("highscore").textContent = "New High Score!"
                    window.localStorage.setItem("highscore", score);
                }
            }, speed);
    
        nextButton.onclick = function(){
            score++;
            document.getElementById("score").textContent = score;
            nextButton.style.backgroundColor = chooseBackgroundTheme("bisque", "rgb(26, 26, 24)");
            nextButton.disabled = true;
            // Reset the progressBar animation
            progressBar.style.width = "100%";
            progressBar.style.transition = "0s";
            void progressBar.offsetParent; // Trigger reflow
            if (score >= 5 && score < 10){
                progressBar.style.transition = "width 5s linear";
                speed = 5000;
                clearTimeout(countdown);
            }
            else if (score >= 10 && score < 20){
                progressBar.style.transition = "width 3.5s linear";
                speed = 3500;
                clearTimeout(countdown);
            }
            else if (score >= 20 && score < 30){
                progressBar.style.transition = "width 2.5s linear";
                speed = 2500;
                clearTimeout(countdown);
            }
            else if (score >= 30 && score < 40){
                progressBar.style.transition = "width 2s linear";
                speed = 2000;
                clearTimeout(countdown);
            }
            else if (score >= 40 && score < 50){
                progressBar.style.transition = "width 1.5s linear";
                speed = 1500;
                clearTimeout(countdown);
            }
            else if (score >= 50 && score < 60){
                progressBar.style.transition = "width 1s linear";
                speed = 1000;
                clearTimeout(countdown);
            }
            else if (score >= 60 && score < 70){
                progressBar.style.transition = "width 0.7s linear";
                speed = 700;
                clearTimeout(countdown);
            }
            else if (score >= 70){
                progressBar.style.transition = "width 0.5s linear";
                speed = 500;
                clearTimeout(countdown);
            }
            else {
                progressBar.style.transition = "width 10s linear";
                speed = 10000;
                clearTimeout(countdown);
            }
            currentButton = nextCard();
        };
        return nextButton;
    }
    currentButton = nextCard();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        if (ready){
            ready = false;
            speed = 10000;
            document.getElementById("highscore").textContent = "";
            clearTimeout(waitingfor);
            gamerun(); 
        }
    }
});
