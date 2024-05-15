{\rtf1\ansi\ansicpg936\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // script.js\
const boardSize = 15;\
let board = [];\
let currentPlayer = 'X';\
let gameOver = false;\
\
document.addEventListener("DOMContentLoaded", () => \{\
    const boardElement = document.getElementById('board');\
    const statusElement = document.getElementById('status');\
    const restartButton = document.getElementById('restart');\
\
    // \uc0\u21021 \u22987 \u21270 \u26827 \u30424 \
    function initBoard() \{\
        board = [];\
        for (let i = 0; i < boardSize; i++) \{\
            const row = [];\
            for (let j = 0; j < boardSize; j++) \{\
                row.push('');\
            \}\
            board.push(row);\
        \}\
    \}\
\
    // \uc0\u28210 \u26579 \u26827 \u30424 \
    function renderBoard() \{\
        boardElement.innerHTML = '';\
        for (let i = 0; i < boardSize; i++) \{\
            for (let j = 0; j < boardSize; j++) \{\
                const cell = document.createElement('div');\
                cell.classList.add('cell');\
                cell.dataset.row = i;\
                cell.dataset.col = j;\
                cell.innerText = board[i][j];\
                cell.addEventListener('click', onCellClick);\
                boardElement.appendChild(cell);\
            \}\
        \}\
    \}\
\
    // \uc0\u22788 \u29702 \u28857 \u20987 \u20107 \u20214 \
    function onCellClick(event) \{\
        if (gameOver) return;\
        const row = event.target.dataset.row;\
        const col = event.target.dataset.col;\
        if (board[row][col] === '') \{\
            board[row][col] = currentPlayer;\
            if (checkWin(row, col)) \{\
                statusElement.innerText = `$\{currentPlayer\} \uc0\u36194 \u20102 \u65281 `;\
                gameOver = true;\
            \} else \{\
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';\
                statusElement.innerText = `\uc0\u24403 \u21069 \u29609 \u23478 : $\{currentPlayer\}`;\
            \}\
            renderBoard();\
        \}\
    \}\
\
    // \uc0\u26816 \u26597 \u32988 \u21033 \u26465 \u20214 \
    function checkWin(row, col) \{\
        return (\
            checkDirection(row, col, 1, 0) || // \uc0\u27700 \u24179 \
            checkDirection(row, col, 0, 1) || // \uc0\u22402 \u30452 \
            checkDirection(row, col, 1, 1) || // \uc0\u26012 \u23545 \u35282 \u65288 \\\u65289 \
            checkDirection(row, col, 1, -1)   // \uc0\u26012 \u23545 \u35282 \u65288 /\u65289 \
        );\
    \}\
\
    function checkDirection(row, col, rowDir, colDir) \{\
        let count = 1;\
        count += countStones(row, col, rowDir, colDir);\
        count += countStones(row, col, -rowDir, -colDir);\
        return count >= 5;\
    \}\
\
    function countStones(row, col, rowDir, colDir) \{\
        let count = 0;\
        let r = parseInt(row) + rowDir;\
        let c = parseInt(col) + colDir;\
        while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === currentPlayer) \{\
            count++;\
            r += rowDir;\
            c += colDir;\
        \}\
        return count;\
    \}\
\
    // \uc0\u37325 \u26032 \u24320 \u22987 \u28216 \u25103 \
    restartButton.addEventListener('click', () => \{\
        gameOver = false;\
        currentPlayer = 'X';\
        statusElement.innerText = `\uc0\u24403 \u21069 \u29609 \u23478 : $\{currentPlayer\}`;\
        initBoard();\
        renderBoard();\
    \});\
\
    // \uc0\u21021 \u22987 \u21270 \u28216 \u25103 \
    initBoard();\
    renderBoard();\
    statusElement.innerText = `\uc0\u24403 \u21069 \u29609 \u23478 : $\{currentPlayer\}`;\
\});\
}