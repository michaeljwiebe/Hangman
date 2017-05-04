// This project is your time to shine and showcase your skills in front end web development. 

// A single page app allowing the user to play a simple game of Wheel of Fortune. Use JavaScript to give the user a word to guess letter by letter. Will the user lose points as they guess wrong? Will they try to beat the clock? Do they only get 3 guesses? You decide! Make it clear to the user what their goal is. The app should be styled with simple but modern design trends and fun for the user. Remember keep your user engaged.

// word to guess letter by letter, hints given for each word, several rounds available
// Make your game multiplayer. Players should be objects.
// Without using a library, construct a wheel that spins and has values, wheel of fortune style. When the wheel lands on a value, the user should get that many points upon answering the word correctly (or go bankrupt).


var wordBank = ["sunshine","JavaScript","gyro","Amsterdam"];
var hintBank = ["brightnass", "adaptive, interactive!", "Kostas' snack", "Across the pond"];
var startBtn = document.getElementsByClassName("start")[0];
var nextRound = document.getElementsByClassName("next-round")[0];
var guessInput = document.getElementsByClassName("guess")[0];
var guesses = document.getElementsByClassName("guesses")[0];
var hintDisplay = document.getElementsByClassName("hint")[0];
var gameBoard = document.getElementsByClassName("game-board")[0];
var wordArrayBeingGuessed;

startBtn.addEventListener("click", function(){
	initGame(0);
	startBtn.style.display = "none";
});
nextRound.addEventListener("click", function(){
	var round = 1;
	initGame(round);
	round++;
})
document.addEventListener("keypress", function(){
	guessLetter(event.key);
});

function initGame(index){
	gameBoard.innerHTML = "";
	guesses.innerHTML = "";
	hintDisplay.innerText = "The hint for this word is: " + hintBank.pop();
	wordArrayBeingGuessed = wordBank.pop().split("");
	wordArrayBeingGuessed.forEach(function(letter, index){
		var underscoreDiv = document.createElement("div");
		underscoreDiv.classList.add("underscore", "underscore" + index);
		underscoreDiv.innerHTML = "___";
		var letterDiv = document.createElement("div");
		letterDiv.classList.add("letter", "letter" + index);
		letterDiv.innerHTML = letter;

		gameBoard.append(underscoreDiv);
		gameBoard.append(letterDiv);
	})
}

function guessLetter(letter){
	guesses.innerHTML += " " + letter;
	for(let i = 0; i < wordArrayBeingGuessed.length; i++){
		if (letter === wordArrayBeingGuessed[i]){
			document.getElementsByClassName("underscore")[i].style.display = "none";
			document.getElementsByClassName("letter")[i].style.display = "block";
		}
	}
	//checkWord();
	setTimeout(function(){guessInput.value = ""}, 2000);
}

function nextRound(){
	var index = 1;
	var round = 1;
}


//might not need to use this function, just keep button around
// function checkWord(){
// 	var letterDivs = document.getElementsByClassName("letter");

// 	[].forEach.call(letterDivs, function(letterDiv){
// 		var done = false;
// 		if (letterDiv.style.display === "none"){
// 			return
// 		} else {}
// 	})
// }










