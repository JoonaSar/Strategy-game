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

//Function to manage the links in the map and the map itself
//board.add(x, y) adds the link to square in coordinates x,y
//board.remove(x, y) removes the link from the square in coordinates x,y
//board.create() creates the map according to the elements listed below
var board = {
	elementsText: "",
	elements: "",
	//Coordinates of water
	water: ["2_0","3_0","4_0","5_0","6_0","7_0",
					"3_1","4_1","5_1","6_1","7_1","8_1",
					"4_2","5_2","6_2","7_2","8_2",
					"5_3","6_3","7_3","8_3",
					"6_4","7_4","8_4","9_4",
					"6_5","7_5","8_5","9_5",
					"6_6","7_6","8_6","9_6",
					"6_7","7_7","8_7","9_7",
					"5_8","6_8","7_8","8_8",
					"4_11","5_11","6_11","7_11","8_11",
					"5_12","6_12","7_12","8_12",
					"5_13","6_13","7_13","8_13","9_13",
					"5_14","6_14","7_14","8_14","9_14",
					"5_15","6_15","7_15","8_15"],
	//Coordinates of bridges
	bridges: ["4_9","5_9","6_9","7_9",
						"4_10","5_10","6_10","7_10"],
	//Coordinates of boulders
	boulders: ["0_4"],
	//Coordinates of rocks
	rocks: ["0_5"],
	//Coordinates of trees
	trees:["0_6"],
	create: function (){
		this.elementsText = "[";
		for (q=0;q<16;q++){
			for (w=0;w<16;w++){
				this.elementsText = this.elementsText+'{"boardCoordinates":"'+w+'_'+q+'",';
				//Fills in water
				if (this.water.includes(w+"_"+q)){
					this.elementsText = this.elementsText+'"elements":"water"';
					document.getElementById(w+"_"+q).style.backgroundColor = "#3399ff";
					//document.getElementById(q+"_"+w).style.backgroundImage = "url('img/water.png')"
				}
				//Fills in bridges etc.
				else if (this.bridges.includes(w+"_"+q)){
					this.elementsText = this.elementsText+'"elements":"bridge"';
					document.getElementById(w+"_"+q).style.backgroundColor = " #604020";
					//document.getElementById(q+"_"+w).style.backgroundImage = "url('img/water.png')"
				}
				//Fills the rest with grass (for now)
				else{
					this.elementsText = this.elementsText+'"elements":"grass"';
					document.getElementById(w+"_"+q).style.backgroundColor = "#618a0f";
					//document.getElementById(q+"_"+w).style.backgroundImage = "url('img/water.png')"
				};
				//Fills in boulders
				if (this.boulders.includes(w+"_"+q)){
					this.elementsText = this.elementsText+',"obstacles":"boulder"';
					//document.getElementById(q+"_"+w).style.backgroundImage = "url('img/water.png')"
				};
				//Fills in rocks
				if (this.rocks.includes(w+"_"+q)){
					this.elementsText = this.elementsText+',"obstacles":"rock"';
					//document.getElementById(q+"_"+w).style.backgroundImage = "url('img/water.png')"
				};
				//Fills in trees
				if (this.trees.includes(w+"_"+q)){
					this.elementsText = this.elementsText+',"obstacles":"tree"';
					//document.getElementById(q+"_"+w).style.backgroundImage = "url('img/water.png')"
				};
				this.elementsText = this.elementsText+'},'
			};
		};
		this.elementsText = this.elementsText.slice(0,(this.elementsText.length-1));
		this.elementsText = this.elementsText + ']';
		this.elements = JSON.parse(this.elementsText);
	},
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
	turn.player = true;
	board.create();
	tick();
};

//Variables and functions to manage turns
var turn = {
	//true=players turn, false=AI's turn
	player: true,
	end: function(){
		turn.player = false;
		document.getElementById("endTurnButton").removeAttribute("href");
		document.getElementById("endTurnButton").removeAttribute("onclick")
		document.getElementById("endTurnButton").innerHTML ="AI's turn"
		},
	endAI: function(){
		turn.player = true;
		document.getElementById("endTurnButton").setAttribute("href", "#");
		document.getElementById("endTurnButton").removeAttribute("onclick", "turn.end()")
		document.getElementById("endTurnButton").innerHTML ="END TURN"
	}
};
//Executes the AI's turn
var ai = {
	//Group for all of valuated tiles
	moveValue: {
		tile: [],
		value: []
	},
	coordinates: [],
	//Valuates all tiles on how likely to move there
	valuate: function(moveChar){
		ai.moveValue.tile=[null];
		ai.moveValue.value=[null];

		for (s=0;s<24;s++){
			ai.coordinates.push(characters.positionx[s]+"_"+characters.positiony[s]);
		};
		for (k=0; k<16; k++){
			for (j=0; j <16; j++){
				moveDistancex=Math.abs(characters.positionx[moveChar]- k);
				moveDistancey=Math.abs(characters.positiony[moveChar]- j);
				coordinates=k+"_"+j;
				moveDistance=(moveDistancex+moveDistancey);
				if ((moveDistance<=characters.moveRange[moveChar])&&!(ai.coordinates.includes(coordinates))){
					ai.moveValue.tile.push(+k+'_'+j);
					//Code to actually evaluate tiles
					ai.moveValue.value.push(Math.random());
				};
			};
		};
		ai.moveValue.tile.splice(0,1);
		ai.moveValue.value.splice(0,1);
	},
	move: function(){
		for (aiChar=8; aiChar<24; aiChar++) {
			if (characers.alive[aiChar]){

			};
		};
	},

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
		//Removes or grays out dead allies' actionbars
		if ((!(characters.alive[w]) )) {
			if	(w <8) {
				document.getElementById(tickAlly).style.display = "none";
				document.getElementById(tickActionbar).style.display = "none";
				//document.getElementById(tickAlly).style.backgroundColor = "gray";
				//document.getElementById(tickActionbar).innerHTML = "Dead";
				//document.getElementById(tickHealth).innerHTML = "Dead";
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
		document.getElementById(tickHealth).style.width = characters.health[w] +"%";
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
	//These lines are for testing only
	damageTo = document.getElementById("dmgTo").value;
	damageAmount = document.getElementById("dmgAm").value;
	damageAmount = document.getElementById("dmgAm").value;
	characters.health[damageTo] = characters.health[damageTo] - damageAmount;
};
