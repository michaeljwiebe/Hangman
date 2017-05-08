var startBtn = document.getElementsByClassName("start")[0];
var nextRound = document.getElementsByClassName("next-round")[0];
var guesses = document.getElementsByClassName("guesses")[0];
var hintDisplay = document.getElementsByClassName("hint")[0];
var gameBoard = document.getElementsByClassName("game-board")[0];
var scoreBoard = document.getElementsByClassName("score-board")[0];
var playerDiv = document.getElementsByClassName("player")[0];
var playerScoreDivs = document.getElementsByClassName("score");
var addPlayerBtn = document.getElementsByClassName("add-player")[0];
var announcements = document.getElementsByClassName("announcements")[0];

var rounds = [];
var players = [];
var playerCorrectLetters = [];
var roundWord;
var currentPlayer;
var roundCorrectLetters = [];

//for rapid testing purposes ----------------
new Player("Player 1", 1);
new Player("Player 2", 2);]
loadRounds();
currentPlayer = players[0];
players[0].currentPlayer = true;
initGame();

//end rapid testing -------------------

addPlayerBtn.addEventListener("click", function(){
	addPlayer();
})

startBtn.addEventListener("click", function(){
	loadRounds();
	currentPlayer = players[0];
	initGame();
});
nextRound.addEventListener("click", function(){
	initGame();
});
document.addEventListener("keypress", function(){
	currentPlayer.guessLetter(event.key);
});

//add Game constructor - attempted but decided to focus on other features

function addPlayer(){ //issues with this not putting up the prompt
	var playerNum = players.length + 1;
	console.log(playerNum);

	if(playerNum <=3){
		var name = prompt("Please enter your name.");
		var player = new Player(name, playerNum);
	} else {
		alert("this game is 2 player only");
	}

}

function Round(word, hint){
	this.word = word,
	this.hint = hint
	rounds.push(this);
}

function Player(name, num){
	this.name = name,
	this.score = 0,
	this.guessLetter = guessLetter,
	this.playerNum = num,
	this.currentPlayer = false,
	this.ScoreBoard = updateScoreBoard

	players.push(this);

	var playerDiv = document.getElementsByClassName("player")[0];
	var playerScoreDiv = document.createElement("div");
	var playerName = document.createElement("h2");
	var playerScore = document.createElement("h2");
	var playerTurn = document.createElement("div");

	playerScore.classList.add("playerScoreBoard");
	playerDiv.classList.add("flex");
	playerScoreDiv.classList.add("scores")
	playerName.innerHTML += this.name + ": ";
	playerScore.innerHTML += this.score;

	playerScoreDiv.append(playerTurn);
	playerScoreDiv.append(playerName);
	playerScoreDiv.append(playerScore);
	playerDiv.append(playerScoreDiv);

	function updateScoreBoard(){
		var individualScores = document.getElementsByClassName("playerScoreBoard");

		players.forEach(function(player, index){
			individualScores[index].innerHTML = player.score;
		})
	}

	function guessLetter(letter){
		//allow guessing each letter only once
		letter = letter.toLowerCase();
		guesses.innerHTML += " " + letter;
		var joinedWord = roundWord.split(" ").join("");
		var correct = 0;

		if (playerCorrectLetters.indexOf(letter) > -1){
			announcements.innerHTML = "The letter " + letter + " has already been guessed. Please guess again.";
		} else {
			for(let i = 0; i < joinedWord.length; i++){
				if (letter === joinedWord[i].toLowerCase()){
					correct += 1;
					document.getElementsByClassName("underscore")[i].style.display = "none";
					document.getElementsByClassName("letter")[i].style.display = "block";
					currentPlayer.score += 100;
				}
				if (i === joinedWord.length - 1 && correct > 0){
					playerCorrectLetters.push(letter)
				}
			}
			console.log(playerCorrectLetters);
		}

		if (correct > 0){
			announcements.innerHTML = "The letter " + letter + " was in this word " + correct + " times. You get " + correct * 100 + " points.";
		} else if(playerCorrectLetters.indexOf(letter) === -1) {
			announcements.innerHTML = "Your guess of the letter " + letter + " was incorrect. You lose 200 points.";
			this.score -= 200;
			setTimeout(function(){nextPlayer()}, 3000);
		} 
		if (playerCorrectLetters.length === roundCorrectLetters.length){
			announcements.innerHTML = "You win this round! +1000 points";
			this.score += 1000;
			setTimeout(function(){initGame()}, 3000);
		}
		updateScoreBoard();
	}
}

function nextPlayer(){
	console.log(currentPlayer);
	var playerIndicator = document.createElement("div");

	for(let i = 0; i < players.length; i++){
		if (players[i].currentPlayer === true){
			players[i].currentPlayer = false;
		} else {
			players[i].currentPlayer = true;
			currentPlayer = players[i];
		}
	}
	announcements.innerHTML = currentPlayer.name + ", guess a letter.";
}

//switches nicely between two players only
function nextPlayer(){
	console.log(currentPlayer);
	for(let i = 0; i < players.length; i++){
		if (players[i].currentPlayer === true){
			players[i].currentPlayer = false;
		} else {
			players[i].currentPlayer = true;
			currentPlayer = players[i];
		}
	}
}

function loadRounds(){
	var round1 = new Round("sunshine", "brightnass");
	var round2 = new Round("JavaScript", "adaptive, interactive!");
	var round3 = new Round("gyro", "Kostas snack");
	var round4 = new Round("Amsterdam", "City across the pond");
	var round5 = new Round("rotweiler", "Scary dog");
	var round6 = new Round("Gary Fisher", "fast bike");
	var round7 = new Round("New Zealand", "Maori country");
	var round8 = new Round("HTML + CSS", "WebDev languages");
};

function initGame(){
	roundCorrectLetters = [];
	playerCorrectLetters = [];
	nextPlayer();

	if (rounds.length > 0){
		var random = Math.floor(Math.random()*(rounds.length));
		var currentRound = rounds.splice(random, 1)[0];
		var roundHint = currentRound.hint;
		var index = 0;
		
		roundWord = currentRound.word;
		gameBoard.innerHTML = "";
		guesses.innerHTML = "";
		hintDisplay.innerText = "The hint for this word is: " + roundHint;
		roundWord.split("").forEach(function(letter){
			if (roundCorrectLetters.indexOf(letter) === -1 && letter != " "){
				roundCorrectLetters.push(letter);
			}
		})
		if (roundWord.indexOf(" ") > -1){
			var wordArray = roundWord.split(" ");
			wordArray.forEach(function(word){
				var letterArrays = word.split("");
				displayBlankDivs(letterArrays);
				var spaceDiv = document.createElement("div");
				spaceDiv.classList.add("space");
				gameBoard.append(spaceDiv);
			})
		} else {
			var letterArray = roundWord.split("");
			displayBlankDivs(letterArray);
		}
	} else {
		alert("The game is finished!");
	}

	function displayBlankDivs(letterArray){
		letterArray.forEach(function(letter){
			var underscoreDiv = document.createElement("div");
			underscoreDiv.classList.add("underscore", "underscore" + index);
			underscoreDiv.innerHTML = "";
			var letterDiv = document.createElement("div");
			letterDiv.classList.add("letter", "letter" + index);
			letterDiv.innerHTML = letter;

			gameBoard.append(underscoreDiv);
			gameBoard.append(letterDiv);
			index += 1;
		})
	}
}








