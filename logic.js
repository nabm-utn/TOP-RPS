function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    let choice = randomChoice(choices);
    return choice;
}

function randomChoice(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function playRound(playerSelection, computerSelection) {
    let answer = "";
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection === computerSelection) {
        answer = "It's a Tie! :s";
    } else if (playerSelection === "rock") {
        if (computerSelection === "paper") {
            answer = "You Loose! Paper beats Rock :(";
        } else {
            answer = "You Win! Rock beats Scissors :)";
        }
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            answer = "You win! Paper beats Rock :)";
        } else {
            answer = "You Loose! Scissors beats Paper :(";
        }
    } else if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            answer = "You Loose! Rock beats Scissors :(";
        }
        else {
            answer = "You Win! Scissors beats Paper :)";
        }
    } else {
        answer = "Your choice was invalid :/ Try again!"
    }
    console.log([playerSelection, computerSelection])
    return answer;
}

function askPlayerSelection() {
    const msg = "Type in your choice, either 'Rock', 'Paper' or 'Scissors' (case insensitive)...";
    let answer = window.prompt(msg);
    return answer.toLowerCase();
}


function bestOfFive() {
    let playerPoints = 0;
    let computerPoints = 0;
    let winner = "";

    for (let i = 1; i < 6; i++) {
        let result = playRound(askPlayerSelection(), computerPlay());
        if (result.includes("Win")) {
            playerPoints += 1;
        } else if (result.includes("Loose")) {
            computerPoints += 1;
        }
        console.log(`Round ${i}:`)
        console.log(result);
        msg = `Player: ${playerPoints} | Computer: ${computerPoints} \n`
        console.log(msg)
    }

    if (playerPoints > computerPoints) {
        console.log("You have won the game! Congratulations!")
    } else if (playerPoints < computerPoints) {
        console.log("You have been beaten by the computer... Better luck next time!")
    } else {
        console.log("The game concludes in a draw. Better luck next time!")
    }

}

let buttons = document.querySelectorAll('.choice-button');
buttons.forEach(button => button.addEventListener("click", playRound2));

function playRound2(e) {
    const log = document.querySelector(".log");
    const playerScore = document.querySelector("#player-score");
    const pcScore = document.querySelector("#pc-score");
    playerSelection = this.id;
    computerSelection = computerPlay();
    let answer = playRound(playerSelection, computerSelection);
    
    log.innerHTML += "<br>" + answer;
    log.scrollTop = log.scrollHeight;
    if (answer.includes("Win")) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else if (answer.includes("Loose")) {
        pcScore.textContent = parseInt(pcScore.textContent) + 1;
    }
}
