/* JavaScript for the game */

var characters = {
	/*Defining all characters and their stuff
	  First 8 are reserved for allies, the next 16 are for enemies*/
	names: ["Alice","Bob","Charlie","Dave","Elisa","Fiona","Gary","Henry",
			"Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy",
			"Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy"],
	health: [null, null, null, null, null, null, null, null,
			 null, null, null, null, null, null, null, null,
			 null, null, null, null, null, null, null, null],
	alive:	[false,false,false,false,false,false,false,false,
			 false,false,false,false,false,false,false,false,
			 false,false,false,false,false,false,false,false],
	moved:	[false,false,false,false,false,false,false,false,
			 false,false,false,false,false,false,false,false,
			 false,false,false,false,false,false,false,false],
	shot:	[false,false,false,false,false,false,false,false,
			 false,false,false,false,false,false,false,false,
			 false,false,false,false,false,false,false,false],
	enemyAm: 8,
	alliesAm: 8,
	weapons:["rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle",
			 "rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle",
			 "rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle"],
	items: null,
	positionx:[null, null, null, null, null, null, null, null,
			   null, null, null, null, null, null, null, null,
			   null, null, null, null, null, null, null, null],
	positiony:[null, null, null, null, null, null, null, null,
			   null, null, null, null, null, null, null, null,
			   null, null, null, null, null, null, null, null],
	moveRange: [4,4,4,4,4,4,4,4,
				4,4,4,4,4,4,4,4,
				4,4,4,4,4,4,4,4],
	abilities: [null],
	//Clears the characters, then draws all of the alive ones
	load: function(){
		for (k = 0; k<16; k++){
			for (j=0; j <16; j++){
				coordinates = k + "_" + j;
				document.getElementById(coordinates).style.backgroundImage = null;
			}
		};
		for (i = 0; i<24; i++){
			if(characters.alive[i]){
				coordinates = characters.positionx[i] + "_" + characters.positiony[i];
				if (i<8){
					document.getElementById(coordinates).style.backgroundImage = "url('img/ally.png')";
				}
				else {
					document.getElementById(coordinates).style.backgroundImage = "url('img/enemy.png')";
				}
			}
		}
	}
};

//Function to manage the links in the map.
//board.add(x, y) adds the link to square in coordinates x,y
//board.remove(x, y) removes the link from the square in coordinates x,y
var board = {
	add: function (x, y) {
		boardXY = x + "_" + y;
		boardMap = "map(" + x + ", " + y + ");";
		document.getElementById(boardXY).setAttribute("href", "#");
		document.getElementById(boardXY).setAttribute("onclick",boardMap );
		if (mapUse == 1){
			document.getElementById(boardXY).style.border = "1px solid blue";
		}
		else if (mapUse == 2){
			document.getElementById(boardXY).style.border = "1px solid red";
		};
	},
	remove: function (x, y){
		boardXY = x + "_" + y;
		document.getElementById(boardXY).removeAttribute("href");
		document.getElementById(boardXY).removeAttribute("onclick");
		document.getElementById(boardXY).style.border = "1px dotted black";
	}
}

// Function that runs through every time you start
var start = function(){
	//Clears the alive-status of all characters
	for (q = 0; q<24; q++){
		characters.alive[q]= false;
	};
	//Brings a set number of allies to life and gives them a position
	for (q = 0; q<characters.alliesAm; q++){
		characters.alive[q] = true;
		characters.health[q] = 100;
		characters.positionx[q] = 0;
		characters.positiony[q] = (2*q);
	};
	//Brings a set number of enemies to life and gives them a position
	for (q = 0; q<characters.enemyAm; q++){
		characters.alive[q+8] = true;
		characters.health[q+8] = 100;
		characters.positionx[q+8] = 15;
		characters.positiony[q+8] = (2*q);
	};
	tick();
};

// Variables to fix tick-function
var tickHealth = null;
var tickAlly = null;
var tickActionbar = null;
//Output variables for the map function
var x = null;
var y = null;
var coordinates = null;

//Outputs coordinates of the clicked square
//Acts with a control parameter mapUse
//mapUse: 0=free to choose an action, 1=move, 2=shoot 3=use item
var mapUse = 0;
var map = function(x, y){
	//This function is only in test use right now, the rest should be ok
	coordinates = x +"_" + y;
	document.getElementById(coordinates).style.backgroundColor = "red";
	if (mapUse == 1){
		characters.positionx[cancelVar] = x ;
		characters.positiony[cancelVar] = y ;
		characters.moved[cancelVar] = true;
		tick();
	}
} ;
//Functions to move character number whatever, to have it shoot, or to have it use an item
var moveChar = null;
var shootChar = null;
var itemChar = null;
var shootButtonUsed = null;
var moveButtonUsed = null;
var cancelVar = null;
//Enables all of the available squares
var move = function(moveChar){
	if (characters.alive[moveChar] && (mapUse==0) && !(characters.moved[moveChar])){
		k = null;
		j = null;
		mapUse = 1;
		//Transforms the used button to a cancel-button (tick-function)
		moveButtonUsed = "moveButton" + moveChar;
		cancelVar = moveChar;
		document.getElementById(moveButtonUsed).setAttribute("onclick", "tick();");
		document.getElementById(moveButtonUsed).style.backgroundColor = "#244C64";
		document.getElementById(moveButtonUsed).innerHTML = "Cancel";
		for (k = 0; k<16; k++){
			for (j=0; j <16; j++){
				moveDistancex = Math.abs(characters.positionx[moveChar]- k);
				moveDistancey = Math.abs(characters.positiony[moveChar]- j);
				moveDistance = (moveDistancex + moveDistancey);
				if (moveDistance<=characters.moveRange[moveChar]){
						board.add(k,j);
						}
				for (h=0; h<24; h++){
					if ((characters.alive[h] &&(characters.positionx[h]==k) && (characters.positiony[h]==j))){
						board.remove(k,j);
					}
				}
			}

		}
	}
	else {
		if (!(characters.alive[moveChar])){
			window.alert("Error: dead men don't move");
		}
		else if (mapUse!=0){
			window.alert("Cancel your action before choosing a new one!")
		}
		else if (characters.moved[moveChar]){
			window.alert("That character has already moved!")
		}
	};
};
var shoot = function(shootChar){
	if (characters.alive[shootChar] && (mapUse==0)){
		k = null;
		j = null;
		mapUse = 2;
		//Transforms the used button to a cancel-button (tick-function)
		shootButtonUsed = "shootButton" + shootChar;
		cancelVar = shootChar;
		document.getElementById(shootButtonUsed).setAttribute("onclick", "tick();");
		document.getElementById(shootButtonUsed).style.backgroundColor = "#632323";
		document.getElementById(shootButtonUsed).innerHTML = "Cancel";
		for (k = 0; k<16; k++){
			for (j=0; j <16; j++){
				moveDistancex = Math.abs(characters.positionx[shootChar]- k);
				moveDistancey = Math.abs(characters.positiony[shootChar]- j);
				moveDistance = (moveDistancex + moveDistancey);
				if (moveDistance<=characters.moveRange[shootChar]){
						board.add(k,j);
						}
				for (h=0; h<24; h++){
					if ((characters.alive[h] &&(characters.positionx[h]==k) && (characters.positiony[h]==j))){
						board.remove(k,j);
					}
				}
			}

		}
	}
	else {
		if (!(characters.alive[shootChar])){
			window.alert("Error: dead men don't shoot");
		}
		else {
			window.alert("Cancel your action before choosing a new one!")
		}
	};
};
var item = function(itemChar){};
var tick = function() {
	//Ticks after every action to refresh variables, items, health, alive and board clickability
	for (w = 0; w<24; w++) {
		tickHealth = "allyHealth"+w;
		tickAlly = "ally"+ w;
		tickActionbar="actions"+w;
		coordinates = characters.positionx[w] + "_" + characters.positiony[w];
		//Caps health to 100
		if (characters.health[w] > 100) {
			characters.health[w] = 100;
		}
		//Kills characters that are below 1 health, then removes them from the game
		if ((characters.health[w] <1) && !(characters.health[w] == null)){
			characters.alive[w] = false;
			characters.positionx[w] = null;
			characters.positiony[w] = null;
			characters.health[w] = null;
			document.getElementById(coordinates).style.backgroundImage = null;
		}
		//Removes dead allies' actionbars
		if ((!(characters.alive[w]) )) {
			if	(w <8) {
				document.getElementById(tickAlly).style.display = "none";
				document.getElementById(tickActionbar).style.display = "none";
			}
		}
		else {
			if	(w <8) {
				document.getElementById(tickAlly).style.display = "";
				document.getElementById(tickActionbar).style.display = "";
			}
		}
		//Updates allies health
		if 	(w<8) {
		document.getElementById(tickHealth).innerHTML = characters.health[w] +"/100";
		}
		};
	//This redraws the characters
	characters.load();
	//This part checks that there aren't any clickable squares left
	for (k = 0; k<16; k++){
		for (j=0; j <16; j++){
			board.remove(k,j);
		}
	};
	//Clears all cancel-buttons so that they can be used again
	if (mapUse == 1){
		document.getElementById(moveButtonUsed).style.backgroundColor = null;
		cancelVar = "move(" + cancelVar +");";
		document.getElementById(moveButtonUsed).setAttribute("onclick",cancelVar);
		document.getElementById(moveButtonUsed).innerHTML = "Move";
	};
	if (mapUse == 2){
		document.getElementById(shootButtonUsed).style.backgroundColor = null;
		cancelVar = "shoot(" + cancelVar +");";
		document.getElementById(shootButtonUsed).setAttribute("onclick",cancelVar);
		document.getElementById(shootButtonUsed).innerHTML = "Shoot";
	};
	//Clears the mapUse, so that new commands can be given
	mapUse = 0;
};

//Function to deal damage (or heal) a character
var damageTo =null;
var damageAmount =null;
var damage = function(damageTo, damageAmount) {
	//This line is for testing only
	damageTo = document.getElementById("dmgTo").value;
	damageAmount = document.getElementById("dmgAm").value;
	damageAmount = document.getElementById("dmgAm").value;
	//This line is for testing only

	characters.health[damageTo] = characters.health[damageTo] - damageAmount;
};
