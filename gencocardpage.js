let allcards = [];
for (let i = 1; i <= 100; i++) {
    let card = document.getElementById(String(i));
    allcards.push(card);
    card.onclick = function() {
        pressAndControl(card);
    };
}
let [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20,
    b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40,
    b41, b42, b43, b44, b45, b46, b47, b48, b49, b50, b51, b52, b53, b54, b55, b56, b57, b58, b59, b60,
    b61, b62, b63, b64, b65, b66, b67, b68, b69, b70, b71, b72, b73, b74, b75, b76, b77, b78, b79, b80,
    b81, b82, b83, b84, b85, b86, b87, b88, b89, b90, b91, b92, b93, b94, b95, b96, b97, b98, b99, b100
] = allcards;
let allpics = [
        "url('images/astro.ico')", "url('images/astro.ico')",
        "url('images/at.ico')", "url('images/at.ico')",
        "url('images/battery.ico')", "url('images/battery.ico')",
        "url('images/belt.ico')", "url('images/belt.ico')",
        "url('images/book.ico')", "url('images/book.ico')",
        "url('images/car.ico')", "url('images/car.ico')",
        "url('images/cat.ico')", "url('images/cat.ico')",
        "url('images/chicken.ico')", "url('images/chicken.ico')",
        "url('images/clouds.ico')", "url('images/clouds.ico')",
        "url('images/cursor.ico')", "url('images/cursor.ico')",
        "url('images/dice.ico')", "url('images/dice.ico')",
        "url('images/disk.ico')", "url('images/disk.ico')",
        "url('images/dog.ico')", "url('images/dog.ico')",
        "url('images/droplets.ico')", "url('images/droplets.ico')",
        "url('images/eight.ico')", "url('images/eight.ico')",
        "url('images/face.ico')", "url('images/face.ico')",
        "url('images/flag.ico')", "url('images/flag.ico')",
        "url('images/foot.ico')", "url('images/foot.ico')",
        "url('images/fork.ico')", "url('images/fork.ico')",
        "url('images/gencocards.ico')", "url('images/gencocards.ico')",
        "url('images/golf.ico')", "url('images/golf.ico')",
        "url('images/hand.ico')", "url('images/hand.ico')",
        "url('images/human.ico')", "url('images/human.ico')",
        "url('images/immigrant.ico')", "url('images/immigrant.ico')",
        "url('images/key.ico')", "url('images/key.ico')",
        "url('images/lock.ico')", "url('images/lock.ico')",
        "url('images/money.ico')", "url('images/money.ico')",
        "url('images/mouse2.ico')", "url('images/mouse2.ico')",
        "url('images/pacman2.ico')", "url('images/pacman2.ico')",
        "url('images/panda.ico')", "url('images/panda.ico')",
        "url('images/paper.ico')", "url('images/paper.ico')",
        "url('images/pen.ico')", "url('images/pen.ico')",
        "url('images/pizza.ico')", "url('images/pizza.ico')",
        "url('images/planet.ico')", "url('images/planet.ico')",
        "url('images/printer.ico')", "url('images/printer.ico')",
        "url('images/robot.ico')", "url('images/robot.ico')",
        "url('images/settings.ico')", "url('images/settings.ico')",
        "url('images/ship.ico')", "url('images/ship.ico')",
        "url('images/sleep.ico')", "url('images/sleep.ico')",
        "url('images/square2.ico')", "url('images/square2.ico')",
        "url('images/stellite.ico')", "url('images/stellite.ico')",
        "url('images/sudoku.ico')", "url('images/sudoku.ico')",
        "url('images/suprised.ico')", "url('images/suprised.ico')",
        "url('images/tea.ico')", "url('images/tea.ico')",
        "url('images/temple.ico')", "url('images/temple.ico')",
        "url('images/trash.ico')", "url('images/trash.ico')",
        "url('images/usb.ico')", "url('images/usb.ico')",
        "url('images/van.ico')", "url('images/van.ico')",
        "url('images/view.ico')", "url('images/view.ico')",
        "url('images/yoga.ico')", "url('images/yoga.ico')",
];
let timer = document.getElementById("gencotimer");
// Chronometer functionality
let startTime;
let timerInterval;
function startChronometer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}
function stopChronometer() {
    clearInterval(timerInterval);
}
function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    // Format time as HH:MM:SS
    const formattedTime = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0');
    
    timer.innerText = formattedTime;
}
// Start the chronometer when the page loads
window.onload = startChronometer;
let openedcards = [];
let foundedcards = [];
let remainedcards = 100;
function disableEverything(){
    if (waittime.value == 3000 || waittime.value == 2000 || waittime.value == 1500){
        for (let card of allcards){
            if (!foundedcards.includes(card)){
                card.disabled = true;
            }
        }
    }  
}
function enableEverything(){
    for (let card of allcards){
        if (!foundedcards.includes(card) && card.disabled){
            card.disabled = false;
        }
    }
}
function pressAndControl(input){
    let waittime = document.getElementById("waittime").value;
    function reset(){
        for (let card of openedcards){
            if (window.localStorage.getItem("theme") === "lightstyle.css"){
                card.style.backgroundColor = "#faee66"; //light block yellow
            }
            else if (window.localStorage.getItem("theme") === "darkstyle.css"){
                card.style.backgroundColor = "#cbc153"; //dark block yellow
            } 
            card.style.backgroundImage = "none";
            card.disabled = false;
        }
        enableEverything();
        openedcards = [];
    }
    input.style.backgroundImage = tableDict[input.id];
    openedcards.push(input);
    input.disabled = true;
    if (openedcards.length == 2){
        if (tableDict[openedcards[0].id] === tableDict[openedcards[1].id]){
            for (let card of openedcards){
                card.style.backgroundColor = "#a3f7ba"; //green
                card.disabled = true;
                foundedcards.push(card);
            }
            openedcards = [];
            remainedcards -= 2;
            if (remainedcards == 0){
                window.alert("Congratulations! You find all the cards!");
                document.body.style.backgroundColor = "#96cc76"; //win green
                document.body.style.transition = "0.5s";
                stopChronometer();
            }
        }
        else{
            for (let card of openedcards){
                card.style.backgroundColor = "#f7aea3"; //red
            }
            disableEverything();
            setTimeout(reset, waittime);
        }
    }
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(allcards);
let tableDict = {};
for (let i = 0; i < allcards.length; i++){
    tableDict[allcards[i].id] = allpics[i]; 
}