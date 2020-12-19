"use strict";

$(document).ready(function () {
  $("#text").keypress(function () {
    change(window.event.keyCode);
  });
  $("#elenco").change(function () {
    if (document.getElementById("elenco").checked == false) {
      elenco = false;
      possibileElenco = false;
      proxTrattino = false;
    } else {
      elenco = true;
    }
  });
  /*
  var virgola = ", ";
  var duePunti = " : ";
  var elencoChar = "-";
  var cancellaDoppie = true;
  var capsDopoPunto = true;
  var caps = false;
  */

  $("#cancellaDoppie").change(function () {});
}); //potranno essere modificati

var virgola = ", ";
var duePunti = " : ";
var elencoChar = "-";
var cancellaDoppie = true;
var capsDopoPunto = true;
var caps = false; //utilities

var elenco = false;
var possibileElenco = false;
var proxTrattino = false; //indica che al prossimo carattere premuto dovrà essere inserito un trattino

function change(keyPressed) {
  //console.log(keyPressed);
  var t = $("#text").val();

  if (proxTrattino) {
    text(GetSubstring(t, 0) + "   -  ");
    proxTrattino = false;
  } //console.log(t[t.length-1] + ", stringa -> " + t + ", lunghezza -> " + t.length);


  switch (t[t.length - 1]) {
    case ',':
      text(GetSubstring(t) + virgola);

      if (cancellaDoppie) {
        if (t[t.length - 3] == ',') {
          text(GetSubstring(t, 1));
        }
      }

      break;

    case ':':
      text(GetSubstring(t) + duePunti);

      if (cancellaDoppie) {
        if (t[t.length - 3] == ':') {
          text(GetSubstring(t, 1));
        }
      }

      break;

    case '.':
      capsDopoPunto ? caps = true : caps = false;
      text(GetSubstring(t) + ". "); //console.log("caps");

      break;

    case '.':
      capsDopoPunto ? caps = true : caps = false;
      text(GetSubstring(t) + "! "); //console.log("caps");

      break;

    case '?':
      capsDopoPunto ? caps = true : caps = false;
      text(GetSubstring(t) + "? "); //console.log("caps");

      break;

    case ' ':
      if (possibileElenco && t[t.length - 2] == '-') {
        possibileElenco = false;
        elenco = true;
        $("#elenco").attr("checked", "true");
        text(GetSubstring(t, 2) + "   -  ");
      }

      break;
  }

  if (keyPressed == 13) {
    //ha spinto l'invio, potrebbe arrivare un elenco
    if (elenco) {
      proxTrattino = true;
    } else {
      possibileElenco = true;
    }
  }

  if (caps) {
    var codice = lastChar(t).charCodeAt(0); //ascii -> a -> 97, z -> 122

    if (codice >= 97 && codice <= 122) {
      codice -= 32;
      text(GetSubstring(t) + String.fromCharCode(codice));
      caps = false;
    }
  }
}

function GetSubstring(t) {
  var fine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return t.substring(0, t.length - fine);
}

function lastChar(t) {
  return t[t.length - 1];
}

function text(text) {
  $("#text").val(text);
}