// script.js
const boardSize = 15;
let board = [];
let currentPlayer = 'X';
let gameOver = false;
let moveHistory = [];

document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const undoButton = document.getElementById('undo');

    // 初始化棋盘
    function initBoard() {
        board = [];
        for (let i = 0; i < boardSize; i++) {
            const row = [];
            for (let j = 0; j < boardSize; j++) {
                row.push('');
            }
            board.push(row);
        }
    }

    // 渲染棋盘
    function renderBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.innerText = board[i][j];
                cell.addEventListener('click', onCellClick);
                boardElement.appendChild(cell);
            }
        }
    }

    // 处理点击事件
    function onCellClick(event) {
        if (gameOver) return;
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            moveHistory.push({ row, col, player: currentPlayer });
            if (checkWin(row, col)) {
                statusElement.innerText = `${currentPlayer} 赢了！`;
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusElement.innerText = `当前玩家: ${currentPlayer}`;
            }
            renderBoard();
        }
    }

    // 检查胜利条件
    function checkWin(row, col) {
        return (
            checkDirection(row, col, 1, 0) || // 水平
            checkDirection(row, col, 0, 1) || // 垂直
            checkDirection(row, col, 1, 1) || // 斜对角（\）
            checkDirection(row, col, 1, -1)   // 斜对角（/）
        );
    }

    function checkDirection(row, col, rowDir, colDir) {
        let count = 1;
        count += countStones(row, col, rowDir, colDir);
        count += countStones(row, col, -rowDir, -colDir);
        return count >= 5;
    }

    function countStones(row, col, rowDir, colDir) {
        let count = 0;
        let r = parseInt(row) + rowDir;
        let c = parseInt(col) + colDir;
        while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }
        return count;
    }

    // 重新开始游戏
    restartButton.addEventListener('click', () => {
        gameOver = false;
        currentPlayer = 'X';
        moveHistory = [];
        statusElement.innerText = `当前玩家: ${currentPlayer}`;
        initBoard();
        renderBoard();
    });

    // 悔棋功能
    undoButton.addEventListener('click', () => {
        if (moveHistory.length > 0 && !gameOver) {
            const lastMove = moveHistory.pop();
            board[lastMove.row][lastMove.col] = '';
            currentPlayer = lastMove.player;
            statusElement.innerText = `当前玩家: ${currentPlayer}`;
            renderBoard();
        }
    });

    // 初始化游戏
    initBoard();
    renderBoard();
    statusElement.innerText = `当前玩家: ${currentPlayer}`;
});
