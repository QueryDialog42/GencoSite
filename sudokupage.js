const all2d = [];
const rows = [];
const cols = [];
const groups = [];
for (let i = 1; i <= 81; i++) {
    all2d.push(document.getElementById(i.toString()));
}
for (let i = 0; i < 9; i++) {
    rows.push(all2d.slice(i * 9, (i + 1) * 9));
    cols.push(all2d.filter((_, index) => index % 9 === i));
}
for (let i = 0; i < 9; i++) {
    const group = [];
    const startRow = Math.floor(i / 3) * 3;
    const startCol = (i % 3) * 3;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            group.push(all2d[(startRow + row) * 9 + (startCol + col)]);
        }
    }
    groups.push(group);
}
const clear = document.getElementById("clear");
const control = document.getElementById("control");
const timer = document.getElementById("sudokutimer");
// Ensure 'all' is a 2D array with 9 lists, each containing 9 elements
const all = [];
for (let i = 0; i < 9; i++) {
    all.push(all2d.slice(i * 9, (i + 1) * 9));
}
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
function shuffleFirstLine(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function chooseSudokuGround(lightstyle, darkstyle){
    if (window.localStorage.getItem("theme") === "lightstyle.css"){
        return lightstyle;
    }
    else if (window.localStorage.getItem("theme") === "darkstyle.css"){
        return darkstyle;
    }
}
function findDuplicates(array) {
    const frequencyCounter = {};
    let duplicates = [];
    array.forEach(item => {
        frequencyCounter[item] = (frequencyCounter[item] || 0) + 1;
    });
    for (const item in frequencyCounter) {
        if (frequencyCounter[item] > 1) {
        duplicates.push(item);
        }
    }
    return duplicates;
}
function createSudokuTable() {
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    shuffleFirstLine(numbers);
    for (let col = 0; col < 9; col++){
        all[0][col].value = numbers[col];
    }
    function isValid(row, col, num){
        //Check the rows
        for (let i = 0; i < 9; i++){
            if (all[row][i].value === String(num)) return false;
        }
        //Check the columns
        for (let i = 0; i < 9; i++){
            if (all[i][col].value === String(num)) return false;
        }
        //Check 3x3 groups
        let startRow = 3 * (Math.floor(row / 3));
        let startCol = 3 * (Math.floor(col / 3));
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (all[startRow + i][startCol + j].value === String(num)) return false;
            }
        }
        return true;
    }
    function solveSudoku(row, col){
        if (row == 9) return true;
        if (col == 9) return solveSudoku(row + 1, 0);
        if (all[row][col].value != "") return solveSudoku(row, col + 1);
        for (let num = 1; num < 10; num++){
            if (isValid(row, col, num)){
                all[row][col].value = String(num)
                if (solveSudoku(row, col + 1)) return true;
                all[row][col].value = "";
            } 
        }
        return false;
    }
    solveSudoku(0, 0);
    for (let i = 0; i < 15; i++){
        let randominput = all[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)];
        if (!randominput.disabled){
            randominput.style.backgroundColor = chooseSudokuGround("#dffa7d", "#9cb53f");
            randominput.disabled = true;
        }
        else{
            i -= 1;
        }   
    }
    //Clear table
    for (let list of all){
        for (let input of list){
            if (!input.disabled){
                input.value = "";
            }
        }
    }
}
createSudokuTable();
function checkSudokuTable(){
    let win = true;
    for (let rowlist of rows){
        let numbers = [];
        for (let input of rowlist){
            if (input.value === ""){
                input.style.backgroundColor = chooseSudokuGround("rgb(249, 249, 113)", "rgb(186, 186, 86)");
                win = false;
                continue;
            }
            else if (isNaN(input.value)){
                input.style.backgroundColor = chooseSudokuGround("rgb(249, 249, 113)", "rgb(186, 186, 86)");
                input.value = "";
                win = false;
                continue;
            }
            else {
                numbers.push(input.value);
            }
        }
        let result = findDuplicates(numbers);
        for (let input of rowlist){
            if (input.value === "") continue;
            else if (input.disabled) continue;
            else if (result.includes(input.value)){
                input.style.backgroundColor = "#f7aea3";
                win = false;
            }
            else input.style.backgroundColor = "#a3f7ba";
        }
    }
    for (let collist of cols){
        let numbers = [];
        for (let input of collist){
            if (input.value === ""){
                continue;
            }
            else if (isNaN(input.value)){
                input.value = "";
                continue;
            }
            else {
                numbers.push(input.value);
            }
        }
        let result = findDuplicates(numbers);
        for (let input of collist){
            if (input.value === "") continue;
            else if (input.disabled) continue;
            else if (result.includes(input.value)){
                input.style.backgroundColor = "#f7aea3";
                win = false;
            }
        }
    }
    for (let grouplist of groups){
        let numbers = [];
        for (let input of grouplist){
            if (input.value === ""){
                continue;
            }
            else if (isNaN(input.value)){
                input.value = "";
                continue;
            }
            else {
                numbers.push(input.value);
            }
        }
        let result = findDuplicates(numbers);
        for (let input of grouplist){
            if (input.value === "") continue;
            else if (input.disabled) continue;
            else if (result.includes(input.value)){
                input.style.backgroundColor = "#f7aea3";
                win = false;
            } 
        }
    }
    if (win){
        window.alert("Congratulations! You solved the table!");
        document.body.style.backgroundColor = "#96cc76";
        document.body.style.transition = "0.5s";
        stopChronometer();
    } 
}
control.onclick = checkSudokuTable;
clear.onclick = function(){
    if (confirm("Are you sure about to clear table?")){
        for (let list of all){
            for (let input of list){
                if (!input.disabled){
                    input.value = "";
                    input.style.backgroundColor = chooseSudokuGround("rgb(249, 249, 113)", "rgb(186, 186, 86)");
                }
            }
        }      
    }
}
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkSudokuTable();
});