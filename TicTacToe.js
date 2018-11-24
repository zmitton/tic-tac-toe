const readlineSync = require('./node_modules/readline-sync');

let mainArray = [];
let displayArray = [];

for (let i = 1; i <= 9; i++) {
    mainArray.push('');
    displayArray.push('\x1b[2m' + i.toString() + '\x1b[0m');
}

function displayBoard(displayArray) {
	process.stdout.write('\033c\033[3J');
	console.log(' ' + displayArray[0] + ' | ' + displayArray[1] + ' | ' + displayArray[2] + ' ');
	console.log('\u2014\u2014\u2014|\u2014\u2014\u2014|\u2014\u2014\u2014');
	console.log(' ' + displayArray[3] + ' | ' + displayArray[4] + ' | ' + displayArray[5] + ' ');
	console.log('\u2014\u2014\u2014|\u2014\u2014\u2014|\u2014\u2014\u2014');
	console.log(' ' + displayArray[6] + ' | ' + displayArray[7] + ' | ' + displayArray[8] + ' ');
}



function gameOverChecker(mainArray) {
	for (let i = 0; i <= 2; i++) { // check columns
		if (mainArray[i] && mainArray[i] === mainArray[i+3] && mainArray[i] === mainArray[i+6]) {
			return (mainArray[i] === 'X') ? 1 : 2;
		}
	}
	for (let i = 0; i <= 6; i += 3) { // check rows
		if (mainArray[i] && mainArray[i] === mainArray[i+1] && mainArray[i] === mainArray[i+2]) {
			return (mainArray[i] === 'X') ? 1 : 2;
		}
	}
	if (mainArray[4] && mainArray[4] === mainArray[2] && mainArray[4] === mainArray[6]) { // check diagonal 1
		return (mainArray[4] === 'X') ? 1 : 2;
	}
	if (mainArray[4] && mainArray[4] === mainArray[0] && mainArray[4] === mainArray[8]) { // check diagonal 2
		return (mainArray[4] === 'X') ? 1 : 2;
	}
	for (let i = 0; i <= 8; i++) { // check for tie game
		if (!mainArray[i]) {
			break;
		}
		if (i === 8) {
			return 3;
		}
	}
	return 0; // game isn't over yet
}


let winner = 0;


for (let counter = 0; ; counter++) {

	displayBoard(displayArray);

    if (counter >= 5) { // there might be a winner
        winner = gameOverChecker(mainArray);
        if (winner !== 0) { // game is over
            break;
        }
    }

	let playerTurn = (counter % 2 === 0) ? '1' : '2';
	let marker = (playerTurn === '1') ? 'X' : 'O';

	let badInput = true

	do {
		let num = readlineSync.question('Player ' + playerTurn + ', place an ' + marker + ' on an available square (enter the square\'s number). ');
		num = parseInt(num, 10);
		if (num && num >= 1 && num <= 9 && !mainArray[num - 1]) {
			mainArray[num - 1] = marker;
			displayArray[num - 1] = marker;
			badInput = false;
		} else {
			console.log('You must enter an available number.');
		}
	} while (badInput);
}


let winnerMsg = (winner === 1) ? 'Player 1 wins!' : (winner === 2) ? 'Player 2 wins!' : 'Tie game!';

console.log(winnerMsg);
