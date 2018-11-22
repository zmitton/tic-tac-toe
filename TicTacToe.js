const readlineSync = require('./node_modules/readline-sync');


let mainArray = ['', '', '', '', '', '', '', '', ''];


function displayBoard(mainArray) {
	
	let square1 = (mainArray[0]) ? mainArray[0] : '1';
	let square2 = (mainArray[1]) ? mainArray[1] : '2';
	let square3 = (mainArray[2]) ? mainArray[2] : '3';
	let square4 = (mainArray[3]) ? mainArray[3] : '4';
	let square5 = (mainArray[4]) ? mainArray[4] : '5';
	let square6 = (mainArray[5]) ? mainArray[5] : '6';
	let square7 = (mainArray[6]) ? mainArray[6] : '7';
	let square8 = (mainArray[7]) ? mainArray[7] : '8';
	let square9 = (mainArray[8]) ? mainArray[8] : '9';

	let displayArray = [square1, square2, square3, square4, square5, square6, square7, square8, square9];

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


for (let counter = 0; ;) {

	// Player 1's turn

	displayBoard(mainArray);

	let badInput = true
		
	do {
		let num = readlineSync.question('Player 1, place an X on an available square (enter the square\'s number). ');
		num = parseInt(num, 10);
		if (num && num >= 1 && num <= 9 && !mainArray[num - 1]) {
			mainArray[num - 1] = 'X';
			badInput = false;
		} else {
			console.log('You must enter an available number.');
		}
	} while (badInput);

	counter++;
	if (counter >= 5) { // there might be a winner
		winner = gameOverChecker(mainArray);
		if (winner !== 0) { // game is over
			break;
		}
	}


	//Player 2's turn

	displayBoard(mainArray);

	badInput = true
		
	do {
		let num = readlineSync.question('Player 2, place an O on an available square (enter the square\'s number). ');
		num = parseInt(num, 10);
		if (num && num >= 1 && num <= 9 && !mainArray[num - 1]) {
			mainArray[num - 1] = 'O';
			badInput = false;
		} else {
			console.log('You must enter an available number.');
		}
	} while (badInput);

	counter++;
	if (counter >= 5) { // there might be a winner
		winner = gameOverChecker(mainArray);
		if (winner !== 0) { // game is over
			break;
		}
	}
}

if (winner === 1) {
	displayBoard(mainArray);
	console.log('Player 1 wins!')
}

if (winner === 2) {
	displayBoard(mainArray);
	console.log('Player 2 wins!')
}

if (winner === 3) {
	displayBoard(mainArray);
	console.log('Tie game!')
}
