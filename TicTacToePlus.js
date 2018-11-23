const readlineSync = require('./node_modules/readline-sync');

// user sets size of board
let numRows;

let invalidInput = true;
do {
	numRows = readlineSync.question('How many rows should there be in the square board? (Must be between 3 and 10.) ');
	numRows = parseInt(numRows, 10);
	if (numRows && numRows >= 3 && numRows <= 10) {
		invalidInput = false;
	} else {
		console.log('You must enter a number between 3 and 10.');
	}
} while (invalidInput);

let totalSquares = Math.pow(numRows, 2);


// set up two arrays, one for checking on game status and another for displaying the board

let mainArray = [];
let displayArray = [];

for (let i = 1; i <= totalSquares; i++) {
  mainArray.push('');
  if (i < 10) {
  	displayArray.push(` ${i} `);
  } else if (i < 100) {
  	displayArray.push(` ${i}`);
  } else {
  	displayArray.push(`${i}`);
  }
}


// set up 'in-between' row for displaying the board

let fillerRow = '';
const fillerCell = '\u2014\u2014\u2014';

for (let i = 1; i <= numRows; i++) {
	if (i < numRows) {
		fillerRow = fillerRow.concat(`${fillerCell}|`);
	} else {
		fillerRow = fillerRow.concat(`${fillerCell}`);
	}
}



function displayBoard(displayArray, numRows, totalSquares, fillerRow) {

	for (let i = 0; i <= totalSquares - numRows; i += numRows) {
		let displayRow = '';
		for (let j = 0; j <= numRows - 1; j++) {
			if (j < numRows - 1) {
				displayRow = displayRow.concat(`${displayArray[i+j]}|`);
			} else {
				displayRow = displayRow.concat(`${displayArray[i+j]}`);
			}
		}
		console.log(displayRow);
		if (i < totalSquares - numRows) {
			console.log(fillerRow);
		}
	}
}



function gameOverChecker(mainArray, numRows, totalSquares) {
	// check columns
	for (let i = 0; i < numRows; i++) {
		if (mainArray[i]) {
			for (let j = 0; ; j += numRows) {
				if (mainArray[i+j] !== mainArray[i+j+numRows]) { // no winner in this column
					break;
				}
				if (i+j+(2*numRows) > totalSquares) { // winner
					return (mainArray[i] === 'X') ? 1 : 2;
				}
			}
		}
	}

	// check rows
	for (let i = 0; i < totalSquares; i += numRows) {
		if (mainArray[i]) {
			for (let j = 0; ; j++) {
				if (mainArray[i+j] !== mainArray[i+j+1]) { // no winner in this row
					break;
				}
				if (i+j+2 === i + numRows) { // winner
					return (mainArray[i] === 'X') ? 1 : 2;
				}
			}
		}
	}

	// check first diagonal
	if (mainArray[0]) {
		for (let i = 0; ; i += numRows + 1) {
			if (mainArray[0] !== mainArray[i]) { // no winner
				break;
			}
			if (i+1 === totalSquares) { // winner
				return (mainArray[i] === 'X') ? 1 : 2;
			}
		}
	}

	// check second diagonal
	if (mainArray[numRows-1]) {
		for (let i = numRows-1; ; i += numRows - 1) {
			if (mainArray[numRows-1] !== mainArray[i]) { // no winner
				break;
			}
			if (i + numRows === totalSquares) { // winner
				return (mainArray[i] === 'X') ? 1 : 2;
			}
		}
	}

	return 0; // game isn't over yet
}


let winner = 0;


for (let counter = 0; ; counter++) {

	displayBoard(displayArray, numRows, totalSquares, fillerRow);

  if (counter >= numRows + (numRows - 1)) { // there might be a winner
    winner = gameOverChecker(mainArray, numRows, totalSquares);
      if (winner !== 0) { // there's a winner
        break;
      }
  }
  if (counter === totalSquares) { // tie game
    winner = 3;
    break;
  }

	let playerTurn = (counter % 2 === 0) ? '1' : '2';
	let marker = (playerTurn === '1') ? 'X' : 'O';

	let badInput = true

	do {
		let num = readlineSync.question('Player ' + playerTurn + ', place an ' + marker + ' on an available square (enter the square\'s number). ');
		num = parseInt(num, 10);
		if (num && num >= 1 && num <= totalSquares && !mainArray[num - 1]) {
			mainArray[num - 1] = marker;
			displayArray[num - 1] = ' ' + marker + ' ';
			badInput = false;
		} else {
			console.log('You must enter an available number.');
		}
	} while (badInput);
}

console.log(winner);
let winnerMsg = (winner === 1) ? 'Player 1 wins!' : (winner === 2) ? 'Player 2 wins!' : 'Tie game!';

console.log(winnerMsg);
