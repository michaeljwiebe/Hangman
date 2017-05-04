// This project is your time to shine and showcase your skills in front end web development. 

// A single page app allowing the user to play a simple game of Wheel of Fortune. Use JavaScript to give the user a word to guess letter by letter. Will the user lose points as they guess wrong? Will they try to beat the clock? Do they only get 3 guesses? You decide! Make it clear to the user what their goal is. The app should be styled with simple but modern design trends and fun for the user. Remember keep your user engaged.

// Make your game multiplayer. Players should be objects.
// Without using a library, construct a wheel that spins and has values, wheel of fortune style. When the wheel lands on a value, the user should get that many points upon answering the word correctly (or go bankrupt).


var rounds = [];
var players = [];
var startBtn = document.getElementsByClassName("start")[0];
var nextRound = document.getElementsByClassName("next-round")[0];
var guessInput = document.getElementsByClassName("guess")[0];
var guesses = document.getElementsByClassName("guesses")[0];
var hintDisplay = document.getElementsByClassName("hint")[0];
var gameBoard = document.getElementsByClassName("game-board")[0];
var scoreBoard = document.getElementsByClassName("score-board")[0];
var wordArrayBeingGuessed;


startBtn.addEventListener("click", function(){
	loadRounds();
	initGame();
});
nextRound.addEventListener("click", function(){
	initGame();
})
document.addEventListener("keypress", function(){
	guessLetter(event.key);
});

function Round(word, hint){
	this.word = word,
	this.hint = hint
	rounds.push(this);
}

function Player(name){
	this.name = name,
	this.score = 0
	var playerDiv = document.createElement("div");
	var playerName = document.createElement("h2");
	var playerScore = document.createElement("h2");
	playerDiv.append(playerName);
	playerDiv.append(playerScore);
	playerName.innerHTML = this.name;
	playerScore.innerHTML = this.score;
}

function loadRounds(){
	var round1 = new Round("sunshine", "brightnass");
	var round2 = new Round("JavaScript", "adaptive, interactive!");
	var round3 = new Round("gyro", "Kostas snack");
	var round4 = new Round("Amsterdam", "City across the pond");
	var round5 = new Round("rotweiler", "Scary dog");
	var round6 = new Round("Gary Fisher", "fast bike");
	var round7 = new Round("New Zealand", "Maori country");
	var round8 = new Round("HTML+CSS", "WebDev languages");
};

function initGame(){
	if (rounds.length > 0){
		var random = Math.floor(Math.random()*(rounds.length));
		gameBoard.innerHTML = "";
		guesses.innerHTML = "";
		var currentRound = rounds.splice(random, 1)[0];
		var roundWord = currentRound.word;
		var roundHint = currentRound.hint;
		hintDisplay.innerText = "The hint for this word is: " + roundHint;
		wordArrayBeingGuessed = roundWord.split("");
		wordArrayBeingGuessed.forEach(function(letter, index){
			var underscoreDiv = document.createElement("div");
			underscoreDiv.classList.add("underscore", "underscore" + index);
			underscoreDiv.innerHTML = "___";
			var letterDiv = document.createElement("div");
			letterDiv.classList.add("letter", "letter" + index);
			letterDiv.innerHTML = letter;

			gameBoard.append(underscoreDiv);
			gameBoard.append(letterDiv);
		});
	} else {
		alert("The game is finished!");
	}
}

function guessLetter(letter){
	guesses.innerHTML += " " + letter;
	for(let i = 0; i < wordArrayBeingGuessed.length; i++){
		if (letter === wordArrayBeingGuessed[i]){
			document.getElementsByClassName("underscore")[i].style.display = "none";
			document.getElementsByClassName("letter")[i].style.display = "block";
		}
	}
	setTimeout(function(){guessInput.value = ""}, 2000);
}






