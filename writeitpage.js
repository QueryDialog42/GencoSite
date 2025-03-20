let score = 0;
let countdown = 60;
let running = false;
let scorep = document.getElementById("score");
let question = document.getElementById("question");
let answer = document.getElementById("answer");
let countdownp = document.getElementById("countdown");

if (window.localStorage.getItem("highscorewrite") === null){
    window.localStorage.setItem("highscorewrite", 0);
    highscore = window.localStorage.getItem("highscorewrite");
}
else {
    highscore = window.localStorage.getItem("highscorewrite");
}
function chooseBackgroundTheme(lightstyle, darkstyle){
    if (window.localStorage.getItem("theme") === "lightstyle.css"){
        return lightstyle;
    }
    else if (window.localStorage.getItem("theme") === "darkstyle.css"){
        return darkstyle;
    }
}

const level1 = ["apple", "ball", "cat", "dog", "egg", "face", "glow", "hope", "jump", "kite",
  "lion", "milk", "neck", "open", "park", "quiz", "rain", "snow", "tree", "use",
  "vase", "wall", "yard", "zip", "bike", "cloud", "duck", "earn", "fish", "gift",
  "hand", "ice", "joke", "king", "lamp", "moon", "nest", "oven", "pen", "queen",
  "rock", "sand", "tip", "unit", "web", "xray", "yarn", "zero", "arm"];
const level2 = [ "ladder", "basket", "window", "jumper", "breeze", "rocket", "candle", "pocket", "chase", "jacket",
  "forest", "beacon", "doctor", "glisten", "castle", "master", "giant", "mister", "player", "tissue",
  "climber", "bitter", "fluffy", "bricks", "monkey", "lifter", "trophy", "sunset", "travel", "butter",
  "timer", "speaker", "writer", "builder", "nature", "humble", "dancer", "sweater", "carter", "creator",
  "tennis", "ranger", "venture", "chilly", "marble", "spirit", "power", "linger", "hacker", "crater", "/", "?", ",", "&", "%",
    "+", "-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const level3 = ["abandoning", "sensitive", "signature", "adventure", "authority", "chemistry", "temporary", "upgrading", "delicate", "enterprise",
  "education", "wonderful", "collective", "circulars", "important", "inspiring", "productive", "professor", "discovery", "courageous",
  "reflector", "conquest", "performer", "broadcast", "influence", "solution", "detriment", "additional", "attention", "immersion",
  "cautionary", "forecaster", "confident", "generator", "tolerated", "permanent", "discovery", "fragment", "frequent", "radiation",
  "commented", "innocence", "emergency", "volunteer", "accurate", "character", "contract", "eliminate", "indicated", "conscious", "{","}", "@", "=", "[", "]",
    "$", "#", "^"];
const level4 = [ "abomination", "considerate", "consequence", "impression", "metropolitan", "intolerance", "introduction", "appreciation", "aggression", "relationship",
  "unfortunate", "acceleration", "misunderstood", "congratulation", "reputation", "convinced", "interpretation", "deliberation", "recollection", "predominance", "accomplishment",
  "distinction", "contradiction", "underestimate", "contribution", "substantial", "unnecessary", "preliminary", "development", "unpredictable", "apprehension",
  "complication", "communicate", "understanding", "information", "demonstration", "subsequent", "persuasion", "contemplation", "destination", "consideration",
  "elimination", "resurrection", "manipulated", "inspiration", "entertainment", "confirmation", "explanation", "imagination", "hypothetical", "concentration"];
const level5 = [ "`", "~", "\\", "|", ";", ":", "'", "\"", "<", ">", "/", "", "€", "₺", "←", "î", "¨", "â", "§", "ª", "|", "»", "¢", "„", "“", "µ", "lahmacun", "ayran"];

function setLevel(){
    if (score < 5){
        question.textContent = level1[Math.floor(Math.random() * level1.length)];
    }
    else if (score >= 5 && score < 10){
        question.textContent = level2[Math.floor(Math.random() * level2.length)];
    }
    else if (score >= 10 && score < 20){
        question.textContent = level3[Math.floor(Math.random() * level3.length)];
    }
    else if (score >= 20 && score < 25){
        question.textContent = level4[Math.floor(Math.random() * level4.length)];
    }
    else if (score >= 25){
        question.textContent = level5[Math.floor(Math.random() * level5.length)];
    }
}
question.textContent = "Press ENTER to start";
// Define the event listener function separately
const handleKeyDown = (event) => {
    if (running) {
        if (event.key === "Enter") {
            if (answer.value === question.textContent) {
                score++;
                scorep.textContent = score;
                answer.value = "";
                answer.style.backgroundColor = "#5a8c76";
                setTimeout(() => {
                    answer.style.backgroundColor = ""; // Reset to original color after 1 second
                }, 200);
            } else {
                answer.style.backgroundColor = "#943838";
                setTimeout(() => {
                    answer.style.backgroundColor = ""; // Reset to original color after 1 second
                }, 200);
                answer.value = "";
            }
            setLevel();
        }
    } 
    else {
        running = true;
        setLevel();
        let time = setInterval(() => {
            countdown--;
            countdownp.textContent = countdown;
            if (countdown == 0) {
                window.alert("STOP! Your score is " + score);
                answer.value = "";
                answer.disabled = true;
                clearInterval(time);
                // Remove the event listener when the game finishes
                document.removeEventListener("keydown", handleKeyDown);
                if (score <= highscore) {
                    question.textContent = "Your high score is " + highscore;
                } else {
                    document.body.style.backgroundColor = chooseBackgroundTheme("#99db8c", "#96cc76");
                    question.textContent = "New High Score!";
                    window.localStorage.setItem("highscorewrite", score);
                }
            }
        }, 1000);
    }
};

// Add the event listener
document.addEventListener("keydown", handleKeyDown);