import { reverseArr } from "./util.js";
import { chessboard } from "./chessboard.js";

// Function for filter function inside of traverseChessboard() function on availableMoves variable declaration line
function isPreviousMove(currMove, prevMoves) {
    if (prevMoves.length < 1) return;

    const x = currMove[0];
    const y = currMove[1];

    for (let i = 0; i < prevMoves.length; i++) {
        if(prevMoves[i][0] === x && prevMoves[i][1] === y) return false;
    }

    return true;
}

// Function that returns the unique moves by checking if the currently available moves are not already in the que
function removeDuplicates(q, availableMoves) {
    if (q.length < 1) return availableMoves;
    
    const unique = [];

    for (let i = 0; i < availableMoves.length; i++) {

        let isUnique = true;
        
        for (let j = 0; j < q.length; j++) {
            
            if(availableMoves[i][0] === q[j][0] && availableMoves[i][1] === q[j][1])  {
                isUnique = false;
            }
        }

        if (isUnique) unique.push(availableMoves[i]);
    }

    return unique;
}

// Checks if any of the current possible moves are destination
function isDestination(possibleMoves, dest) {
    for (let i = 0; i < possibleMoves.length; i++) {
        if (possibleMoves[i][0] === dest[0] && possibleMoves[i][1] === dest[1]) return true;
    }

    return false;
}

// Function that traverses the graph / matrix array with all of the possible moves and returns the moves it has captured along the way while traversing to the destination in BFS manner
function traverseChessboard(curr, dest, q = [], prevMoves = []) {
    if (curr[0] < 0 || curr[1] < 0) throw new Error(`Current index can't be lower than 0!`);
    if (curr[0] > 7 || curr[1] > 7) throw new Error(`Current index can't be greater than 7!`);    
    
    if (dest[0] < 0 || dest[1] < 0) throw new Error(`Destination index can't be lower than 0!`);
    if (dest[0] > 7 || dest[1] > 7) throw new Error(`Destination index can't be greater than 7!`);

    if (curr[0] === dest[0] && curr[1] === dest[1]) console.log(`You're already there nigguh!`);

    const currX = curr[0];
    const currY = curr[1];

    prevMoves.push(curr);

    if (q.length > 0) q.shift();
    
    const possibleMoves = chessboard[currX][currY];
    const destination = isDestination(possibleMoves, dest)

    if (destination) {
        prevMoves.push(dest);
        return prevMoves;
    }

    const availableMoves = possibleMoves.filter(isPreviousMove);
    const uniqueMoves = removeDuplicates(q, availableMoves);

    if (uniqueMoves.length > 0) q.push(...uniqueMoves)

    return traverseChessboard(q[0], dest, q, prevMoves);
}

// Function that takes the traversed path to the destination and strips down the alternative path that didn't make it to the destination and returns only the shortest path, starting from 0,0
function findShortestPath(arr) {
    if (arr.length < 1) throw new Error('The traverseChessboard array is empty!');

    const shortestPath = [];

    let currMove = arr[arr.length - 1];

    for (let i = arr.length - 1; i >= 0 ; i--) {
        if (i === arr.length - 1) shortestPath.push(arr[i]);
        
        if (
            (currMove[0] - arr[i][0] === 2 ||
             currMove[0] - arr[i][0] === -2) &&

            (currMove[1] - arr[i][1] === 1 ||
             currMove[1] - arr[i][1] === -1)
            ) {
                currMove = arr[i];
                shortestPath.push(arr[i]);
        } else if (
            (currMove[1] - arr[i][1] === 2 ||
             currMove[1] - arr[i][1] === -2) &&

            (currMove[0] - arr[i][0] === 1 ||
             currMove[0] - arr[i][0] === -1)
        ) {
            currMove = arr[i];
            shortestPath.push(arr[i]);
        }
    }

    // Reverses the shortestPath var so that it starts from the 0,0 position
    const reversedPath = reverseArr(shortestPath);

    return reversedPath;
}

// Main function that returns to the user how many moves it took to get from the current position to the destination, and it returns all the moves it took to get there
function knightMoves(curr, dest) {
    const traversedChessboard = traverseChessboard(curr, dest);
    const shortestPath = findShortestPath(traversedChessboard);
    
    console.log('You made it in: ' + (shortestPath.length - 1) + ' moves! Here is your path:')
    shortestPath.forEach(move => console.log(move));
}

knightMoves([7,7], [0,0])