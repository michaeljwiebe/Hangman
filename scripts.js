// This project is your time to shine and showcase your skills in front end web development. 

// A single page app allowing the user to play a simple game of Wheel of Fortune. Use JavaScript to give the user a word to guess letter by letter. Will the user lose points as they guess wrong? Will they try to beat the clock? Do they only get 3 guesses? You decide! Make it clear to the user what their goal is. The app should be styled with simple but modern design trends and fun for the user. Remember keep your user engaged.

// word to guess letter by letter, hints given for each word, several rounds available
// Make your game multiplayer. Players should be objects.
// Without using a library, construct a wheel that spins and has values, wheel of fortune style. When the wheel lands on a value, the user should get that many points upon answering the word correctly (or go bankrupt).


var wordBank = ["sunshine","JavaScript","gyro","Amsterdam"];
var hintBank = ["brightnass", "adaptive, interactive!", "Kostas' snack", "Across the pond"];
var startBtn = document.getElementsByClassName("start")[0];
var guessInput = document.getElementsByClassName("guess")[0];
var guesses = document.getElementsByClassName("guesses")[0];
var hintDisplay = document.getElementsByClassName("hint")[0];
var gameBoard = document.getElementsByClassName("game-board")[0];
var round = 0;
var i;
var wordArrayBeingGuessed;
var letterDivArray = [];

startBtn.addEventListener("click", function(){
	initGame()
	startBtn.style.display = "none";
});
document.addEventListener("keypress", function(){
		guessLetter(event.key);
});

function initGame(){
	i = 0;
	wordArrayBeingGuessed = wordBank[round].split("");
	wordArrayBeingGuessed.forEach(function(letter){
		gameBoard.innerHTML += "<div class='underscoreDiv underscoreDiv" + i + "'>___</div>";
		gameBoard.innerHTML += "<div class='letter letter" + i + "'>" + letter + "</div>";
		makeVar();
		i += 1;
	})
}
function makeVar(){
	var tempLetterDiv = document.getElementsByClassName("letter" + i)[0];
	letterDivArray.push(tempLetterDiv);
}

function guessLetter(letter){
	guesses.innerHTML += " " + letter;
	for(let i = 0; i < wordArrayBeingGuessed.length; i++){
		if (letter === wordArrayBeingGuessed[i]){
			// show letter
		}
	}
	setTimeout(function(){guessInput.value = ""}, 2000);
}












