
function NetConnect() {
    var objDate = new Date();
    var texto = objDate.getTime();//  + " GameID " + game.gameId;

    var game = jQuery.parseJSON(gameInfo);

    var purl = "play?gameId=" + game.gameId + "&piece=BlackTower\&origin=A8\&final=A8";
    

    PrintStatus(texto + purl);

    //var json = $.ajax("play?gameId=" + game.gameId + "&piece=BlackHose&origin=A2&final=A5");
    
    $.ajax({ url: purl, cache: false }).done(function (html) { $("#DebugJs").html(html); });

    
    //setInterval(NetConnect, 5000);
}

function PrintStatus(value) {
    $("#DebugInfo").val(value);
}

//NetConnect();
window.setInterval(NetConnect, 2000);

