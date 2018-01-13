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
			 true,true,true,true,true,true,true,true],
	weapons:["rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle",
			 "rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle",
			 "rifle","rifle","rifle","rifle","rifle","rifle","rifle","rifle"],
	items: null,
	abilities: [null]
};

// Variables to fix tick-function
var tickHealth = null;
var tickAlly = null;
var tickActionbar = null;

var tick = function() {
	//Ticks after every action to refresh items, health, alive and such
	for (i = 0; i<24; i++) {
		tickHealth = "allyHealth"+i;
		tickAlly = "ally"+ i;
		tickActionbar="actions"+i;
		//Caps health to 100
		if (characters.health[i] >= 101) {
			characters.health[i] = 100;
		}
		//Removes dead allies and their actionbars
		if (characters.health[i] <= 0 ) {
			characters.alive[i] = false;
			if	(i <8) {
				document.getElementById(tickAlly).style.display = "none";
				document.getElementById(tickActionbar).style.display = "none";
			}
		}
		//Updates allies health
		if 	(i<8) {
		document.getElementById(tickHealth).innerHTML = characters.health[i] +"/100";
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

