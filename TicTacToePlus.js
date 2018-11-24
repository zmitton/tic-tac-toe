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



function winnerChecker(mainArray, numRows, totalSquares) {
	
	function rowAndColumnChecker(mainArray, iLessThan, iAdder, jAdder, finalAdder) {
		for (let i = 0; i < iLessThan; i += iAdder) {
			if (mainArray[i]) {
				for (let j = 0; ; j += jAdder) {
					if (mainArray[i+j] !== mainArray[i+j+jAdder]) { // no winner, try next row/column
						break;
					}
					if (i+j+(2*jAdder) === i + finalAdder) { // winner
						return (mainArray[i] === 'X') ? 1 : 2;
					}
				}
			}
		}
	}

	function diagonalChecker(mainArray, startingCorner, firstAdder, secondAdder) {
		if (mainArray[startingCorner]) {
			for (let i = startingCorner; ; i += firstAdder + secondAdder) {
				if (mainArray[startingCorner] !== mainArray[i]) { // no winner
					break;
				}
				if (i + firstAdder === totalSquares) { // winner
					return (mainArray[i] === 'X') ? 1 : 2;
				}
			}
		}
	}

	// check columns
	let columnWinner = rowAndColumnChecker(mainArray, numRows, 1, numRows, totalSquares);
	if (columnWinner) {
		return columnWinner;
	}

	// check rows
	let rowWinner = rowAndColumnChecker(mainArray, totalSquares, numRows, 1, numRows);
	if (rowWinner) {
		return rowWinner;
	}

	// check first diagonal
	let firstDiagonalWinner = diagonalChecker(mainArray, 0, 1, numRows);
	if (firstDiagonalWinner) {
		return firstDiagonalWinner;
	}

	// check second diagonal
	let secondDiagonalWinner = diagonalChecker(mainArray, numRows - 1, numRows, -1);
	if (secondDiagonalWinner) {
		return secondDiagonalWinner;
	}
}



// the game

let winner;

for (let turnsTaken = 0; ; turnsTaken++) {

	displayBoard(displayArray, numRows, totalSquares, fillerRow);

  if (turnsTaken >= (2*numRows) - 1) { // there might be a winner
    winner = winnerChecker(mainArray, numRows, totalSquares);
      if (winner) { // there's a winner
        break;
      }
  }
  if (turnsTaken === totalSquares) { // tie game (board is full, no winner)
    break;
  }

	let playerTurn = (turnsTaken % 2 === 0) ? '1' : '2';
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



// announce the results

let winnerMsg = (winner === 1) ? 'Player 1 wins!' : (winner === 2) ? 'Player 2 wins!' : 'Tie game!';

console.log(winnerMsg);
