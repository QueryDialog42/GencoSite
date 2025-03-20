let man = document.getElementById("man");
let line = document.getElementById("line");
let guess = document.getElementById("guess");
let message = document.getElementById("message");
const guessbutton = document.getElementById("guessbutton");
let gletters = document.getElementById("guessedletters");
let gwords = document.getElementById("guessedwords");
const hangmanart = {
    0: "   <br>   <br>    ",
    1: " O <br>   <br>    ",
    2: " O <br> | <br>    ",
    3: " O <br>/| <br>    ",
    4: " O <br>/|\\<br>    ",
    5: " O <br>/|\\<br>/   ",
    6: ":-(<br>/|\\<br>/  \\",
    7: ":-)<br>/|\\<br>/  \\",
}
let guesscount = 1;
let falsecount = 0;
man.innerHTML = hangmanart[falsecount];
const wordlist = [  "parrot", "carrot", "strawberry", "apple", "map", "human", "doctor", "call of duty", "lahmacun", "forest", "player",
                    "music", "microphone", "television", "telephone", "private", "special", "tree", "son", "sun", "kiwi", "young",
                    "Leader", "hang man", "old", "new", "brain", "surgery", "delicious", "congratulations"];
const choosenword = wordlist[Math.floor(Math.random() * wordlist.length)];
let theline = [];
let guessedwords = ["Guessed words:"];
let guessedletters = ["Guessed letters:"];

function setGame(){
    for (let i = 0; i < choosenword.length; i++){
        if (choosenword[i] === " "){
            theline.push("-");
        }
        else {
           theline.push("_"); 
        }
    }
    line.textContent = theline.join(" ");
}

function chooseBackgroundTheme(lightstyle, darkstyle){
    if (window.localStorage.getItem("theme") === "lightstyle.css"){
        document.body.style.backgroundColor = lightstyle;
    }
    else if (window.localStorage.getItem("theme") === "darkstyle.css"){
        document.body.style.backgroundColor = darkstyle;
    }
}

function winfonts(){
    chooseBackgroundTheme("#46871", "#96cc76");
    message.style.color = "#4f9642";
    line.style.color = "#4f9642";
    man.innerHTML = hangmanart[7];
    line.textContent = "You found the word '" + choosenword + "' at " + guesscount + ". try!";
    message.textContent = "YOU WIN!";
    document.body.style.transition = "0.5s";
    guess.disabled = true;
    guessbutton.disabled = true;
}
function losefonts(){
    man.innerHTML = hangmanart[6];
    message.textContent = "YOU LOSE!"; 
    line.textContent = "You could not find the word '" + choosenword + "'!";
    line.style.color = "#f27474";
    chooseBackgroundTheme("#eba19b", "#734b48");
    document.body.style.transition = "0.5s";
    guess.disabled = true;
    guessbutton.disabled = true;
}
function dogamelogic(){
    if (guess.value.length == 1){
        if (theline.includes(guess.value)){
            message.textContent = "The letter already in the word!";
        }
        else if (guessedletters.includes(guess.value)){
            message.textContent = "You already guessed the letter!";
        }
        else{
          let founded = false;
            for (let i = 0; i < choosenword.length; i++){
                if (guess.value === choosenword[i]){
                    theline[i] = guess.value;
                    founded = true;
                }
            }
            line.textContent = theline.join(" ");
            if (founded){
                chooseBackgroundTheme("#caffab", "#7fa16c")
                document.body.style.transition = "0.5s";
            }
            else{
                falsecount++;
                man.innerHTML = hangmanart[falsecount];
                guessedletters.push(guess.value);
                chooseBackgroundTheme("#ffb0ab", "#9c6764");
                document.body.style.transition = "0.5s";
            }
            message.textContent = "";
        }
        guesscount++;
    }    
    else if (guess.value.length > 1){
        if (guessedwords.includes(guess.value)){
            message.textContent = "You already guessed the word!";
        }
        else {
            if (guess.value === choosenword){
                winfonts();
            }
            else{
                falsecount++;
                man.innerHTML = hangmanart[falsecount];
                guessedwords.push(guess.value);
                message.textContent = "";
                chooseBackgroundTheme("#ffb0ab", "#9c6764");
                document.body.style.transition = "0.5s";
                guesscount++;
            }
        }  
    }
    guess.value = "";
    gletters.textContent = guessedletters.join(" ");
    gwords.textContent = guessedwords.join(" ");
    if (falsecount == 6 || !theline.includes("_")){
        losefonts();
    }
}
guess.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        dogamelogic();
    }
});
setGame();
guessbutton.onclick = function(){dogamelogic()}