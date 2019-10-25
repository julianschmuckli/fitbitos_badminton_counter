import document from "document";
import { display } from "display";
import { vibration } from "haptics";

var player1 = 0,
    player2 = 0;
var auto_display_off = false;

let background_winner = document.getElementById("background_winner");
let background_loser = document.getElementById("background_loser");

let counter = document.getElementById("counter");
let btnTR = document.getElementById("btn-tr");
let btnBR = document.getElementById("btn-br");
let btnTL = document.getElementById("btn-tl");
let btnBL = document.getElementById("btn-bl");
let auto_screen_off_settings = document.getElementById(
    "auto_screen_off_settings"
);

counter.text = "0 - 0";

//Listener
document.onkeypress = function(e) {
    checkScreenOff();
    switch (e.key) {
        case "down":
            up2();
            break;
        case "up":
            up1();
            break;
    }
};
btnBR.onclick = function(evt) {
    checkScreenOff();
    up2();
};
btnTR.onclick = function(evt) {
    checkScreenOff();
    up1();
};
btnBL.onclick = function(evt) {
    checkScreenOff();
    down2();
};
btnTL.onclick = function(evt) {
    checkScreenOff();
    down1();
};

auto_screen_off_settings.onactivate = function(evt) {
    console.log("Settings activated");
    if (auto_display_off) {
        auto_display_off = false;
        auto_screen_off_settings.style.background = "";
    } else {
        auto_display_off = true;
        display.on = false;
    }
};

function checkScreenOff() {
    if (auto_display_off) {
        display.on = false;
    }
}

function up1() {
    if (player1 < 30) {
        player1++;
    }
    updateCounterText();
}
function up2() {
    if (player2 < 30) {
        player2++;
    }
    updateCounterText();
}

function down1() {
    if (player1 > 0) {
        player1--;
    }
    updateCounterText();
}
function down2() {
    if (player2 > 0) {
        player2--;
    }
    updateCounterText();
}

function updateCounterText() {
    counter.text = player1 + " - " + player2;
    if ((player1 >= 21 && player2 <= player1 - 2) || player1 === 30) {
        //Spieler 1 gewonnen
        changeBackgroundColor("winner");

        console.log("Spieler 1 hat gewonnen");
        vibration.start("celebration-short");
    } else if ((player2 >= 21 && player1 <= player2 - 2) || player2 === 30) {
        //Spieler 2 gewonnen
        changeBackgroundColor("loser");

        console.log("Spieler 2 hat gewonnen");
        vibration.start("ping");
    } else {
        changeBackgroundColor("default");
        vibration.start("confirmation");
    }
}

/**
 * Changing the background and font colors of the app, depending on the state
 */
function changeBackgroundColor(state) {
    switch (state) {
        case "winner":
            background_winner.style.visibility = "visible";
            background_loser.style.visibility = "hidden";

            counter.style.fill = "#000000";
            auto_screen_off_settings.style.fill = "#000000";
            break;
        case "loser":
            background_winner.style.visibility = "hidden";
            background_loser.style.visibility = "visible";

            counter.style.fill = "#ffffff";
            auto_screen_off_settings.style.fill = "#ffffff";
            break;
        default:
            background_winner.style.visibility = "hidden";
            background_loser.style.visibility = "hidden";

            counter.style.fill = "#ffffff";
            auto_screen_off_settings.style.fill = "#ffffff";
            break;
    }
}
