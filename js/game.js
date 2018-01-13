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
	/*Ticks after every action to refresh items, health, alive and such*/
	for (i = 0; i<7; i++) {
		// Updates health
		tickHealth = "allyHealth"+ i;
		tickAlly = "ally"+ i;
		document.getElementById(tickHealth).innerHTML = characters.health[i] +"/100";
		
		if (allies.health[i] <= 0 ) {
			allies.alive[i] = false;
			//variable to fix the function
			document.getElementById(tickAlly).style.display = "none";
		}
	}
	
};
var damageTo =null;
var damageAmmount =null;
var damage = function(toDamage, damageAmmount) {
	characters.health[toDamage] = characters.health[toDamage] - damageAmmount;
};

