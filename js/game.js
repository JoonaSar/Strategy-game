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
	alive:	[true,true,true,true,true,true,true,true,
			 true,true,true,true,true,true,true,true,
			 false,false,false,false,false,false,false,false],
	enemyAm: 8,
	alliesAm: 8,
	weapons:["rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle",
			 "rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle",
			 "rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle"],
	items: null,
	positionx:[0,0,0,0,0,0,0,0,
			   15,15,15,15,15,15,15,15,
			   0,0,0,0,0,0,0,0],
	positiony:[0,2,4,6,8,10,12,14,
			   0,2,4,6,8,10,12,14,
			   0,0,0,0,0,0,0,0],
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
var map = function(x, y){
	//This function is only in test use right now, the rest should be ok
	coordinates = x +"_" + y;
	document.getElementById(coordinates).style.backgroundColor = "red";
	
	
} ;
//Function to move character number whatever, to have it shoot, or to have it use an item
var move = function(ThisNeedsAVariable){};
var shoot = function(ThisNeedsAVariable){} ;
var item = function(ThisNeedsAVariable){} ;

var tick = function() {
	//Ticks after every action to refresh items, health, alive and such
	for (w = 0; w<24; w++) {
		tickHealth = "allyHealth"+w;
		tickAlly = "ally"+ w;
		tickActionbar="actions"+w;
		coordinates = characters.positionx[w] + "_" + characters.positiony[w];
		if (!(characters.alive[w])){
			document.getElementById(coordinates).style.backgroundImage = "";
		}
		//Caps health to 100
		if (characters.health[w] >= 101) {
			characters.health[w] = 100;
		}
		//Removes dead allies and their actionbars
		if ((characters.health[w] <= 0 || !(characters.alive[w]) )) {
			characters.alive[w] = false;
			if	(w <8) {
				document.getElementById(tickAlly).style.display = "none";
				document.getElementById(tickActionbar).style.display = "none";
			}
		}
		//Updates allies health
		if 	(w<8) {
		document.getElementById(tickHealth).innerHTML = characters.health[w] +"/100";
		}
		}
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


