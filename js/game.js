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

// Variable to fix tick-function
var tickHealth = null;
var tickAlly = null;

var tick = function() {
	//Ticks after every action to refresh items, health, alive and such
	for (i = 0; i<7; i++) {
		// Updates health
		tickHealth = "allyHealth"+ i;
		tickAlly = "ally"+ i;
		document.getElementById(tickHealth).innerHTML = characters.health[i] +"/100";
		
		if (characters.health[i] <= 0 ) {
			characters.alive[i] = false;
			//variable to fix the function
			document.getElementById(tickAlly).style.display = "none";
		}
	}
	
};
var damageTo =null;
var damageAmmount =null;
var damage = function(damageTo, damageAmmount) {
	//This line is for testing only
	damageTo = document.getElementById("dmgTo").value;
	damageAmmount = document.getElementById("dmgAm").value;
	damageAmmount = document.getElementById("dmgAm").value;
	//This line is for testing only
	
	characters.health[damageTo] = characters.health[damageTo] - damageAmmount;
};

