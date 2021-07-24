function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    let choice = randomChoice(choices);
    return choice;
}

function randomChoice(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function playRound(e) {
    const log = document.querySelector(".log");
    playerSelection = this.id;
    computerSelection = computerPlay();
    let message = roundMessage(playerSelection, computerSelection);
    let result = roundResult(message);
    log.appendChild(roundDiv(message, result));
    log.scrollTop = log.scrollHeight;


    const playerScore = document.querySelector("#player-score");
    const pcScore = document.querySelector("#pc-score");
    if (result === "WIN") {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else if (result === "LOOSE") {
        pcScore.textContent = parseInt(pcScore.textContent) + 1;
    }

    checkEndGame(playerScore, pcScore, log);
}

function checkEndGame(playerScore, pcScore, log) {
    const playerScoreInt = parseInt(playerScore.textContent);
    const pcScoreInt = parseInt(pcScore.textContent);
    if (playerScoreInt >= 5 || pcScoreInt >= 5) {
        let buttons = document.querySelectorAll('.choice-button');
        buttons.forEach(button => button.removeEventListener("click", playRound));
    } else return;

    let winnerPs = null;
    let finalMessage = null;
    if (playerScoreInt > pcScoreInt) {
        winnerPs = [document.querySelector("#player-name"), playerScore];
        finalMessage = "Congratulations!\nYou have won the game!";
    } else {
        winnerPs = [document.querySelector("#pc-name"), pcScore];
        finalMessage = "Sorry! You have been defeated!";
    }
    winnerPs[0].classList.toggle("winner-left");
    winnerPs[1].classList.toggle("winner-right");
    const finalDiv = roundDiv(finalMessage, "WIN");
    finalDiv.classList.add("final-message");
    log.appendChild(finalDiv);
    log.scrollTop = log.scrollHeight;
    
}
    

function roundDiv(message, result) {
    const div = document.createElement("div");
    div.textContent = message;
    let color = "rgb(158, 233, 115)";
    if (result === "LOOSE") {
        color = "rgb(247, 104, 68)";
    } else if (result === "TIE") {
        color = "rgb(240, 253, 167)";
    }
    div.style.backgroundColor = color;
    div.classList.add("log-div");
    return div;
}

function roundMessage(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    let message = `${playerSelection} VS ${computerSelection}`;
    return message;
}

function roundResult(message) {
    let result = NaN;
    switch (message) {
        case "rock VS rock":
        case "paper VS paper":
        case "scissors VS scissors":
            result = "TIE";
            break;

        case "rock VS scissors":
        case "paper VS rock": 
        case "scissors VS paper":
            result = "WIN";
            break;

        case "rock VS paper":
        case "paper VS scissors":
        case "scissors VS rock":
            result = "LOOSE";
            break;

        default:
            result = "something wrong happened!";
            break;
    }
    return result;

}

let buttons = document.querySelectorAll('.choice-button');
buttons.forEach(button => button.addEventListener("click", playRound));