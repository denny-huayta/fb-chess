// Every 5 Seconds check the status
function NetConnect() {
    
    var objDate = new Date();
    var texto = objDate.getTime();//  + " GameID " + game.gameId;

    var game = jQuery.parseJSON(gameInfo);

    var purl = "getchessboard?gameId=" + game.gameId;

    $.ajax({ url: purl, cache: false }).done(function (html) { ParseMoves(html) });
    

    //PrintDebug(texto);
}

function ParseMoves(html) {

    
    var resultado = "Inicio";
    //$("#DebugJs").html(resultado);

    if (html == "ERROR") {
        $("#DebugJs").html("Error");
        return;
    }
    var moves = html.split("}");

    resultado = resultado + "Items " + moves.length.toString() + "<br>";


    for (var item in board) {
        
        board[item]="" ;
    }

    for(var x=0;x < moves.length-1; x++)
    {

        var item = jQuery.parseJSON(moves[x] + "}");

        if (item.status == 1) {
            board[item.final] = item.piece;
            resultado = resultado + item.piece + " " + item.final + "<br>";
        }
    }

    RuleClean();

    $("#DebugJs").html(resultado);

}

function NetConnect_SendMove(piece,source, target) {
    var objDate = new Date();
    var texto = objDate.getTime(); //  + " GameID " + game.gameId;

    var game = jQuery.parseJSON(gameInfo);

    var purl = "play?gameId=" + game.gameId + "&piece=" + piece +"&origin=" + source + "&final=" + target;

    //Debug
    //$.ajax({ url: purl, cache: false }).done(function (html) { $("#DebugJs").html("send " + piece); });
    $.ajax({ url: purl, cache: false }).done(function (html) { PrintDebug("send " + piece + " O=" +source + " F=" +target); });

    
}


function PrintStatus(value) {
    $("#DebugText2").val(value);

}

//NetConnect();
window.setInterval(NetConnect, 2000);

