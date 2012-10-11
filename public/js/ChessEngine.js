var dragSrcEl = null;
var SourceItem = '';

var board = null;
var boardcolor = null;

var lookABC = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8
}

var look123 = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H'
}

var RuleValidMoves = null;

function handleDragStart(e) {

    // this = e.target is the source node.  

    dragSrcEl = null;

    // No item
    if (board[this.id] == '') {
        PrintDebug('None');
        e.cancel = true;
        return;
    }

    // Check Rules
    Rule(board[this.id], this.id);


    this.style.opacity = '0.4';

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    SourceItem = this.id;
    //PrintDebug('Start ' + this.id + ' moving ' + board[this.id]);

    dragSrcEl = this;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    //PrintDebug('Move to ' + this.id);

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.

}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.className = 'BaseBox Color' + boardcolor[this.id] + ' ' + board[dragSrcEl.id];
        dragSrcEl.className = 'BaseBox Color' + boardcolor[SourceItem];
        PrintDebug('Done from ' + SourceItem + ' to ' + this.id);

        var TmpPlayer = board[SourceItem];
        board[this.id] = TmpPlayer;
        board[SourceItem] = '';
    }

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.

    [ ].forEach.call(cols, function (col) {
        col.classList.remove('over');
        col.style.opacity = '1';  // this / e.target is the source node.
    });

    //Remove Rules Cells
    RuleClean();
}

var cols = document.querySelectorAll('.BaseBox');

[ ].forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});


//Init Board

function InitBoard() {
    board =
    {
        'A8': 'BlackTower', 'B8': 'BlackHorse', 'C8': 'BlackBishop', 'D8': 'BlackQueen', 'E8': 'BlackKing', 'F8': 'BlackBishop', 'G8': 'BlackHorse', 'H8': 'BlackTower',
        'A7': 'BlackPawn', 'B7': 'BlackPawn', 'C7': 'BlackPawn', 'D7': 'BlackPawn', 'E7': 'BlackPawn', 'F7': 'BlackPawn', 'G7': 'BlackPawn', 'H7': 'BlackPawn',
        'A6': '', 'B6': '', 'C6': '', 'D6': '', 'E6': '', 'F6': '', 'G6': '', 'H6': '',
        'A5': '', 'B5': '', 'C5': '', 'D5': '', 'E5': '', 'F5': '', 'G5': '', 'H5': '',
        'A4': '', 'B4': '', 'C4': '', 'D4': '', 'E4': '', 'F4': '', 'G4': '', 'H4': '',
        'A3': '', 'B3': '', 'C3': '', 'D3': '', 'E3': '', 'F3': '', 'G3': '', 'H3': '',
        'A2': 'WhitePawn', 'B2': 'WhitePawn', 'C2': 'WhitePawn', 'D2': 'WhitePawn', 'E2': 'WhitePawn', 'F2': 'WhitePawn', 'G2': 'WhitePawn', 'H2': 'WhitePawn',
        'A1': 'WhiteTower', 'B1': 'WhiteHorse', 'C1': 'WhiteBishop', 'D1': 'WhiteQueen', 'E1': 'WhiteKing', 'F1': 'WhiteBishop', 'G1': 'WhiteHorse', 'H1': 'WhiteTower'
    };

    boardcolor =
    {
        'A8': 'W', 'B8': 'B', 'C8': 'W', 'D8': 'B', 'E8': 'W', 'F8': 'B', 'G8': 'W', 'H8': 'B',
        'A7': 'B', 'B7': 'W', 'C7': 'B', 'D7': 'W', 'E7': 'B', 'F7': 'W', 'G7': 'B', 'H7': 'W',
        'A6': 'W', 'B6': 'B', 'C6': 'W', 'D6': 'B', 'E6': 'W', 'F6': 'B', 'G6': 'W', 'H6': 'B',
        'A5': 'B', 'B5': 'W', 'C5': 'B', 'D5': 'W', 'E5': 'B', 'F5': 'W', 'G5': 'B', 'H5': 'W',
        'A4': 'W', 'B4': 'B', 'C4': 'W', 'D4': 'B', 'E4': 'W', 'F4': 'B', 'G4': 'W', 'H4': 'B',
        'A3': 'B', 'B3': 'W', 'C3': 'B', 'D3': 'W', 'E3': 'B', 'F3': 'W', 'G3': 'B', 'H3': 'W',
        'A2': 'W', 'B2': 'B', 'C2': 'W', 'D2': 'B', 'E2': 'W', 'F2': 'B', 'G2': 'W', 'H2': 'B',
        'A1': 'B', 'B1': 'W', 'C1': 'B', 'D1': 'W', 'E1': 'B', 'F1': 'W', 'G1': 'B', 'H1': 'W'
    };


    for (var item in board) {
        //alert(item + " " + board[item]);
        $("#" + item).addClass(board[item]); ;
    }

}

InitBoard();

//DEBUG
function PrintDebug(value) {
    $("#DebugText").val(value);
}


// RULESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

function Rule(player, start) {

    var paramCurrentX = parseInt(lookABC[start[0]]);
    var paramCurrentY = parseInt(start[1]);
    //var obj = null;

    RuleValidMoves = new Array();

    if (player == 'BlackPawn') {
        Rule_BlackPawn(paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
    }

    if (player == 'WhitePawn') {
        Rule_WhitePawn(paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'BlackTower' || player == 'WhiteTower') {
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        contador = 0;

        for (x = 1; x <= 8; x++) {

            if (CurrentX != x) {
                RuleValidMoves[contador] = look123[x] + CurrentY;
                contador++;
            }

            if (CurrentY != x) {
                RuleValidMoves[contador] = look123[CurrentX] + x;
                contador++;
            }
        }

        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'BlackBishop' || player == 'WhiteBishop') {

        contador = 0;
        // Bishop Position 1 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX - x, CurrentY - x)) {
                RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY - x);
                contador++;
            }
            else {
                break;
            }
        }

        // Bishop Position 3 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX + x, CurrentY - x)) {
                RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY - x);
                contador++;
            }
            else {
                break;
            }
        }

        // Bishop Position 7 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX - x, CurrentY + x)) {
                RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY + x);
                contador++;
            }
            else {
                break;
            }
        }

        // Bishop Position 8 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX + x, CurrentY + x)) {
                RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY + x);
                contador++;
            }
            else {
                break;
            }
        }

        // Paint Methods ----------------------------------------------------------------------------------
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'BlackHorse' || player == 'WhiteHorse') {
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        contador = 0;

        // Horse Position 3 
        CurrentX = paramCurrentX + 1;
        CurrentY = paramCurrentY - 2;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
        // Horse Position 1 
        CurrentX = paramCurrentX - 1;
        CurrentY = paramCurrentY - 2;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // Horse Position 7 
        CurrentX = paramCurrentX - 1;
        CurrentY = paramCurrentY + 2;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
        // Horse Position 9 
        CurrentX = paramCurrentX + 1;
        CurrentY = paramCurrentY + 2;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // Horse Position 91 
        CurrentX = paramCurrentX + 2;
        CurrentY = paramCurrentY + 1;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
        // Horse Position 71 
        CurrentX = paramCurrentX - 2;
        CurrentY = paramCurrentY + 1;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // Horse Position 31 
        CurrentX = paramCurrentX + 2;
        CurrentY = paramCurrentY - 1;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
        // Horse Position 11
        CurrentX = paramCurrentX - 2;
        CurrentY = paramCurrentY - 1;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;

        }
        RulesPaint(RuleValidMoves);
        return;
    }

    // King
    if (player == 'WhiteKing' || player == 'BlackKing') {

        contador = 0;

        RuleValidMoves = new Array();

        // King Position 9
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        CurrentY++;
        CurrentX++;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // King Position 8
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        CurrentY++;

        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // King Position 7
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        CurrentY++;
        CurrentX--;
        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // King Position 6
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        CurrentX++;
        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // King Position 4
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        //CurrentY--;
        CurrentX--;
        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // King Position 3
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        CurrentY--;
        CurrentX++;
        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // King Position 2
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        CurrentY--;
        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // King Position 1
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;
        CurrentY--;
        CurrentX--;
        if (IsInBoard(CurrentX, CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

        // Paint
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'BlackQueen' || player == 'WhiteQueen') {

        contador = 0;
        // Queen Position 1 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX - x, CurrentY - x)) {
                RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY - x);
                contador++;
            }
            else {
                break;
            }
        }

        // Queen Position 3 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX + x, CurrentY - x)) {
                RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY - x);
                contador++;
            }
            else {
                break;
            }
        }

        // Queen Position 7 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX - x, CurrentY + x)) {
                RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY + x);
                contador++;
            }
            else {
                break;
            }
        }

        // Queen Position 8 ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 7; x++) {
            if (IsInBoard(CurrentX + x, CurrentY + x)) {
                RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY + x);
                contador++;
            }
            else {
                break;
            }
        }

        // Queen Position Horizontal and Vertical ----------------------------------------------------------------------------------
        CurrentX = paramCurrentX;
        CurrentY = paramCurrentY;

        for (x = 1; x <= 8; x++) {

            if (CurrentX != x) {
                RuleValidMoves[contador] = look123[x] + CurrentY;
                contador++;
            }

            if (CurrentY != x) {
                RuleValidMoves[contador] = look123[CurrentX] + x;
                contador++;
            }
        }

        // Paint Methods ----------------------------------------------------------------------------------
        RulesPaint(RuleValidMoves);
        return;
    }
}

function RuleClean() {

    for (CurrentX = 1; CurrentX <= 8; CurrentX++) {
        for (CurrentY = 1; CurrentY <= 8; CurrentY++) {

            var CurrentPos = look123[CurrentX] + CurrentY;
            obj = document.getElementById(CurrentPos);

            if (obj.className.indexOf('ColorV')) {
                obj.className = 'BaseBox Color' + boardcolor[CurrentPos] + ' ' + board[CurrentPos];
            }
        }
    }
}

function RulesPaint(moves) {

    if ($.isArray(moves) == false) return;

    var i = moves.length;

    for (x = 0; x < i; x++) {
        var CurrentPos = moves[x];

        obj = document.getElementById(CurrentPos);

        if (obj) {
            obj.className = 'BaseBox ColorV ' + board[CurrentPos];
        }
    }
}

function IsInBoard(x, y) {
    var result = true;

    if (x > 8) result = false;
    if (x < 1) result = false;

    if (y > 8) result = false;
    if (y < 1) result = false;

    return result;
}

// Rules

function Rule_WhitePawn(paramCurrentX, paramCurrentY) {
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;

    CurrentY++;

    RuleValidMoves[0] = look123[CurrentX] + CurrentY;

    if (paramCurrentY == 2) {
        CurrentY++;
        RuleValidMoves[1] = look123[CurrentX] + CurrentY;
    }

    return;
}

function Rule_BlackPawn(paramCurrentX, paramCurrentY) {
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;

    CurrentY--;

    RuleValidMoves[0] = look123[CurrentX] + CurrentY;

    if (paramCurrentY == 7) {
        CurrentY--;
        RuleValidMoves[1] = look123[CurrentX] + CurrentY;
    }

    return;
}