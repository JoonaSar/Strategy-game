/* JavaScript for the game */

var characters = {
	/*Defining all characters and their stuff
	  First 8 are reserved for allies, the next 16 are for enemies*/
	names: ["Alice","Bob","Charlie","Dave","Elisa","Fiona","Gary","Henry",
			"Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy",
			"Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy","Enemy"],
	health: [100,100,100,100,100,100,100,100,
			 100,100,100,100,100,100,100,100,
			 100,100,100,100,100,100,100,100],
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
	//draws all characters
	load: function(){
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
		document.getElementById(boardXY).style.border = "1px solid blue";
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
	for (s = 0; s<characters.alliesAm; s++){
		characters.alive[s] = true;
		characters.positionx[s] = 0;
		characters.positiony[s] = (2*s);
	};
	//Brings a set number of enemies to life and gives them a position
	for (q = 0; q<characters.enemyAm; q++){
		characters.alive[q+8] = true; 
		characters.positionx[q+8] = 15;
		characters.positiony[q+8] = (2*q);
	};
	tick();
	characters.load();
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
var map = function(x, y){
	//This function is only in test use right now, the rest should be ok
	coordinates = x +"_" + y;
	document.getElementById(coordinates).style.backgroundColor = "red";
} ;
//Functions to move character number whatever, to have it shoot, or to have it use an item
var moveChar = null;
var shootChar = null;
var itemChar = null;
var mapUse = 0;
var moveButtonUsed = null;
var cancelVar = null;
//Enables all of the available squares
var move = function(moveChar){
	if (characters.alive[moveChar] && (mapUse==0)){
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
			window.alert("Error: dead men don't move #1");
		}
		else {
			window.alert("Cancel your action before choosing a new one!")
		}
	};
};
/*Moves a character in itself
	ok: function(moveChar){
		if (characters.alive[moveChar]){
			
		}
		else {
			window.alert("Error: dead men don't move #2")
		};
	};
*/
var shoot = function(shootChar){};
var item = function(itemChar){};
var tick = function() {
	//Ticks after every action to refresh items, health, alive and board clickability
	for (w = 0; w<24; w++) {
		tickHealth = "allyHealth"+w;
		tickAlly = "ally"+ w;
		tickActionbar="actions"+w;
		coordinates = characters.positionx[w] + "_" + characters.positiony[w];
		//Caps health to 100
		if (characters.health[w] >= 101) {
			characters.health[w] = 100;
		}
		//Removes dead allies' actionbars
		if ((characters.health[w] <= 0 || !(characters.alive[w]) )) {
			characters.alive[w] = false;
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
		//Removes dead characters
		if (!(characters.alive[w])){
			
		}
		//Updates allies health
		if 	(w<8) {
		document.getElementById(tickHealth).innerHTML = characters.health[w] +"/100";
		}
		}
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
