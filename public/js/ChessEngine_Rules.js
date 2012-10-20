// Rules Action

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

    if (player == 'BlackTower') {
        Rule_Tower('Black', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'WhiteTower') {
        Rule_Tower('White', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'BlackBishop') {
        Rule_Bishop('Black', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'WhiteBishop') {
        Rule_Bishop('White', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'BlackHorse') {

        Rule_Horse('Black', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }
    if (player == 'WhiteHorse') {
        Rule_Horse('White', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }
    if (player == 'WhiteKing') {
        Rule_King('White', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }
    if (player == 'BlackKing') {
        Rule_King('Black', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'BlackQueen') {
        Rule_Queen('Black', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

    if (player == 'WhiteQueen') {
        Rule_Queen('White', paramCurrentX, paramCurrentY);
        RulesPaint(RuleValidMoves);
        return;
    }

}


// Rules

function Rule_WhitePawn(paramCurrentX, paramCurrentY) {
    CurrentX = paramCurrentX;
    CurrentY = parseInt(paramCurrentY);
    contador = 0;

    FirstFriend = false;

    // Fist Pawn Move
    CurrentY++;

    FirstFriend = !RuleIsValidPos("White", look123[CurrentX] + CurrentY) || !RuleIsValidPos("Black", look123[CurrentX] + CurrentY);

    if (IsInBoard(look123[CurrentX], CurrentY) && !FirstFriend ) {
        RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
        contador++;
    }
    
    // Second Pawn Move

    if (paramCurrentY == 2 && !FirstFriend) {
        CurrentY++;
        if (IsInBoard(look123[CurrentX], CurrentY) && RuleIsValidPos("White", look123[CurrentX] + CurrentY)  && RuleIsValidPos("Black", look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }
    
    // Enemy in range 9
    CurrentX = parseInt(paramCurrentX) + 1;
    CurrentY = parseInt(paramCurrentY) + 1;

    if (!RuleIsValidPos("Black", look123[CurrentX] + CurrentY))
    {
     RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
     contador++;
     
     PrintDebug('Valid Pos ' + look123[CurrentX] + ' ' + CurrentY + ' b='  + board[look123[CurrentX] + CurrentY] + ' V=' + board[look123[CurrentX] + CurrentY].indexOf("White", 0) );
     
    }
    
    // Enemy in range 7
        CurrentX = parseInt(paramCurrentX) - 1;
        CurrentY = parseInt(paramCurrentY) + 1;
    
    if (!RuleIsValidPos("Black", look123[CurrentX] + CurrentY))
    {
         RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
         contador++;
    }

    return;
}

function Rule_BlackPawn(paramCurrentX, paramCurrentY) {
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    contador = 0;
    CurrentY--;

    FirstFriend = !RuleIsValidPos("Black", look123[CurrentX] + CurrentY) || !RuleIsValidPos("White", look123[CurrentX] + CurrentY);

    if (IsInBoard(look123[CurrentX], CurrentY) && !FirstFriend) {
        RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
        contador++;
    }
    
    // Second Pawn Move
    
    if (paramCurrentY == 7 && !FirstFriend) {
        CurrentY--;
        if (IsInBoard(look123[CurrentX], CurrentY) && RuleIsValidPos("Black", look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

 // Enemy in range 3
    CurrentX = parseInt(paramCurrentX) - 1;
    CurrentY = parseInt(paramCurrentY) - 1;

    if (!RuleIsValidPos("White", look123[CurrentX] + CurrentY))
    {
     RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
     contador++;
      
    }
    
    // Enemy in range 1
        CurrentX = parseInt(paramCurrentX) + 1;
        CurrentY = parseInt(paramCurrentY) - 1;
    
    if (!RuleIsValidPos("White", look123[CurrentX] + CurrentY))
    {
         RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
         contador++;
    }


    return;
}

function Rule_Tower(color, paramCurrentX, paramCurrentY) {
    var CurrentX = paramCurrentX;
    var CurrentY = parseInt(paramCurrentY);

    var Dir2 = true;
    var Dir8 = true;
    var Dir4 = true;
    var Dir6 = true;

    var ColorEnemy = 'Black';
    if (color == 'Black') ColorEnemy = 'White';

    contador = 0;

    for (x = 1; x <= 8; x++) {

        if (Dir6 && RuleIsValidPos(color, look123[CurrentX + x] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX + x] + CurrentY;
            contador++;

            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX + x] + CurrentY)) Dir6 = false;

        }
        else {
            Dir6 = false;
        }

        if (Dir4 && RuleIsValidPos(color, look123[CurrentX - x] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX - x] + CurrentY;
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX - x] + CurrentY)) Dir4 = false;
        }
        else {
            Dir4 = false;
        }

        if (Dir2 && RuleIsValidPos(color, look123[CurrentX] + (CurrentY - x))) {
            RuleValidMoves[contador] = look123[CurrentX] + (CurrentY - x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX] + (CurrentY - x))) Dir2 = false;
        }
        else {
            Dir2 = false;
        }

        if (Dir8 && RuleIsValidPos(color, look123[CurrentX] + (CurrentY + x))) {
            RuleValidMoves[contador] = look123[CurrentX] + (CurrentY + x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX] + (CurrentY + x))) Dir8 = false;
        }
        else {
            Dir8 = false;
        }

    }

    return;
}

function Rule_Bishop(color, paramCurrentX, paramCurrentY) {
    var CurrentX = paramCurrentX;
    var CurrentY = parseInt(paramCurrentY);

    var Dir1 = true;
    var Dir3 = true;
    var Dir7 = true;
    var Dir9 = true;

    var ColorEnemy = 'Black';
    if (color == 'Black') ColorEnemy = 'White';

    contador = 0;

    for (x = 1; x <= 8; x++) {

        if (Dir1 && RuleIsValidPos(color, look123[CurrentX - x] + (CurrentY - x))) {
            RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY - x);
            contador++;

            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX - x] + (CurrentY - x))) Dir1 = false;

        }
        else {
            Dir1 = false;
        }

        if (Dir3 && RuleIsValidPos(color, look123[CurrentX + x] + (CurrentY + x))) {
            RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY + x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX + x] + (CurrentY + x))) Dir3 = false;
        }
        else {
            Dir3 = false;
        }

        if (Dir7 && RuleIsValidPos(color, look123[CurrentX - x] + (CurrentY + x))) {
            RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY + x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX - x] + (CurrentY + x))) Dir7 = false;
        }
        else {
            Dir7 = false;
        }

        if (Dir9 && RuleIsValidPos(color, look123[CurrentX + x] + (CurrentY - x))) {
            RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY - x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX + x] + (CurrentY - x))) Dir9 = false;
        }
        else {
            Dir9 = false;
        }

    }

    RulesPaint(RuleValidMoves);
    return;
}

function Rule_Horse(color, paramCurrentX, paramCurrentY) {
    var CurrentX = 0;
    var CurrentY = 0;

    contador = 0;

    // Horse Position 3 
    CurrentX = parseInt(paramCurrentX) + 1;
    CurrentY = parseInt(paramCurrentY) - 2;


    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // Horse Position 1 
    CurrentX = parseInt(paramCurrentX) - 1;
    CurrentY = parseInt(paramCurrentY) - 2;

    if (IsInBoard(CurrentX, CurrentY)) {

        if (RuleIsValidPos(color, look123[CurrentX] + (CurrentY))) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // Horse Position 7 
    CurrentX = parseInt(paramCurrentX) - 1;
    CurrentY = parseInt(paramCurrentY) + 2;

    if (IsInBoard(CurrentX, CurrentY)) {

        if (RuleIsValidPos(color, look123[CurrentX] + (CurrentY))) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }
    // Horse Position 9 
    CurrentX = parseInt(paramCurrentX) + 1;
    CurrentY = parseInt(paramCurrentY) + 2;

    if (IsInBoard(CurrentX, CurrentY)) {

        if (RuleIsValidPos(color, look123[CurrentX] + (CurrentY))) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // Horse Position 91 
    CurrentX = parseInt(paramCurrentX) + 2;
    CurrentY = parseInt(paramCurrentY) + 1;

    if (IsInBoard(CurrentX, CurrentY)) {

        if (RuleIsValidPos(color, look123[CurrentX] + (CurrentY))) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }
    // Horse Position 71 
    CurrentX = parseInt(paramCurrentX) - 2;
    CurrentY = parseInt(paramCurrentY) + 1;

    if (IsInBoard(CurrentX, CurrentY)) {

        if (RuleIsValidPos(color, look123[CurrentX] + (CurrentY))) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // Horse Position 31 
    CurrentX = parseInt(paramCurrentX) + 2;
    CurrentY = parseInt(paramCurrentY) - 1;

    if (IsInBoard(CurrentX, CurrentY)) {

        if (RuleIsValidPos(color, look123[CurrentX] + (CurrentY))) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }
    // Horse Position 11
    CurrentX = parseInt(paramCurrentX) - 2;
    CurrentY = parseInt(paramCurrentY) - 1;

    if (IsInBoard(CurrentX, CurrentY)) {

        if (RuleIsValidPos(color, look123[CurrentX] + (CurrentY))) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }

    }
    return;

}

function Rule_King(color, paramCurrentX, paramCurrentY) {
    contador = 0;

    // King Position 9
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    CurrentY++;
    CurrentX++;

    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // King Position 8
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    CurrentY++;

    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // King Position 7
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    CurrentY++;
    CurrentX--;
    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // King Position 6
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    CurrentX++;
    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // King Position 4
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    //CurrentY--;
    CurrentX--;
    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // King Position 3
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    CurrentY--;
    CurrentX++;
    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // King Position 2
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    CurrentY--;
    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    // King Position 1
    CurrentX = paramCurrentX;
    CurrentY = paramCurrentY;
    CurrentY--;
    CurrentX--;
    if (IsInBoard(CurrentX, CurrentY)) {
        if (RuleIsValidPos(color, look123[CurrentX] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX] + CurrentY;
            contador++;
        }
    }

    return;
}

function Rule_Queen(color, paramCurrentX, paramCurrentY) {
    var CurrentX = paramCurrentX;
    var CurrentY = parseInt(paramCurrentY);

    var Dir1 = true;
    var Dir3 = true;
    var Dir7 = true;
    var Dir9 = true;

    var Dir2 = true;
    var Dir8 = true;
    var Dir4 = true;
    var Dir6 = true;


    var ColorEnemy = 'Black';
    if (color == 'Black') ColorEnemy = 'White';

    contador = 0;

    for (x = 1; x <= 8; x++) {

        if (Dir1 && RuleIsValidPos(color, look123[CurrentX - x] + (CurrentY - x))) {
            RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY - x);
            contador++;

            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX - x] + (CurrentY - x))) Dir1 = false;

        }
        else {
            Dir1 = false;
        }

        if (Dir3 && RuleIsValidPos(color, look123[CurrentX + x] + (CurrentY + x))) {
            RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY + x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX + x] + (CurrentY + x))) Dir3 = false;
        }
        else {
            Dir3 = false;
        }

        if (Dir7 && RuleIsValidPos(color, look123[CurrentX - x] + (CurrentY + x))) {
            RuleValidMoves[contador] = look123[CurrentX - x] + (CurrentY + x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX - x] + (CurrentY + x))) Dir7 = false;
        }
        else {
            Dir7 = false;
        }

        if (Dir9 && RuleIsValidPos(color, look123[CurrentX + x] + (CurrentY - x))) {
            RuleValidMoves[contador] = look123[CurrentX + x] + (CurrentY - x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX + x] + (CurrentY - x))) Dir9 = false;
        }
        else {
            Dir9 = false;
        }

        if (Dir6 && RuleIsValidPos(color, look123[CurrentX + x] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX + x] + CurrentY;
            contador++;

            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX + x] + CurrentY)) Dir6 = false;

        }
        else {
            Dir6 = false;
        }

        if (Dir4 && RuleIsValidPos(color, look123[CurrentX - x] + CurrentY)) {
            RuleValidMoves[contador] = look123[CurrentX - x] + CurrentY;
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX - x] + CurrentY)) Dir4 = false;
        }
        else {
            Dir4 = false;
        }

        if (Dir2 && RuleIsValidPos(color, look123[CurrentX] + (CurrentY - x))) {
            RuleValidMoves[contador] = look123[CurrentX] + (CurrentY - x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX] + (CurrentY - x))) Dir2 = false;
        }
        else {
            Dir2 = false;
        }

        if (Dir8 && RuleIsValidPos(color, look123[CurrentX] + (CurrentY + x))) {
            RuleValidMoves[contador] = look123[CurrentX] + (CurrentY + x);
            contador++;


            //Si existe un enemigo del color inverso dejar de validar
            if (!RuleIsValidPos(ColorEnemy, look123[CurrentX] + (CurrentY + x))) Dir8 = false;
        }
        else {
            Dir8 = false;
        }

    }
    return;
}