//Charles Kelsey 6/10/22
//adapted from https://kastark.co.uk/articles/incrementals.html
//and https://kastark.co.uk/articles/incrementals-part-2.html

var food = 0;
var logs = 0;
var ore = 0;
var science = 0;

function clickFood(number){
    food = food + number;
    document.getElementById("food").innerHTML = food;
};

function clickLogs(number){
    logs = logs + number;
    document.getElementById("logs").innerHTML = logs;
};

function clickOre(number){
    ore = ore + number;
    document.getElementById("ore").innerHTML = ore;
};

function clickScience(number){
    if(logs >= number && ore >= number){    //if the player has enough resources
        science = science + number;         //gives them that amount of science
        logs = logs - number;               //removes appropriate resources
        ore = ore - number;
        document.getElementById("science").innerHTML = science;
        document.getElementById("logs").innerHTML = logs;
        document.getElementById("ore").innerHTML = ore;
    }
};

var farmers = 0;
var lumberjacks = 0;
var miners = 0;
var scientists = 0;

function hireFarmer(){
    var farmerCost = Math.floor(10 * Math.pow(1.1,farmers));        //works out the cost of this farmer
    if(food >= farmerCost){                                         //checks that the player can afford the farmer
        farmers = farmers + 1;                                      //increases number of farmers
    	food = food - farmerCost;                                   //removes the food spent
        document.getElementById('farmers').innerHTML = farmers;     //updates the number of farmers for the user
        document.getElementById('food').innerHTML = food;           //updates the number of food for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,farmers));          //works out the cost of the next farmer
    document.getElementById('farmerCost').innerHTML = nextCost;     //updates the farmer cost for the user
};
function hireLumberjack(){
    var lumberjackCost = Math.floor(10 * Math.pow(1.1,lumberjacks));    
    if(food >= lumberjackCost){                                         
        lumberjacks = lumberjacks + 1;                                  
    	food = food - lumberjackCost;                                   
        document.getElementById('lumberjacks').innerHTML = lumberjacks; 
        document.getElementById('food').innerHTML = food;               
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,lumberjacks));          
    document.getElementById('lumberjackCost').innerHTML = nextCost;     
};

function hireMiner(){
    var minerCost = Math.floor(10 * Math.pow(1.1,miners));    
    if(food >= minerCost){                                         
        miners = miners + 1;                                  
    	food = food - minerCost;                                   
        document.getElementById('miners').innerHTML = miners; 
        document.getElementById('food').innerHTML = food;               
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,miners));          
    document.getElementById('minerCost').innerHTML = nextCost;     
};

function hireScientist(){
    var scientistCost = Math.floor(10 * Math.pow(1.1,scientists));    
    if(food >= scientistCost){                                         
        scientists = scientists + 1;                                  
    	food = food - scientistCost;                                   
        document.getElementById('scientists').innerHTML = scientists; 
        document.getElementById('food').innerHTML = food;               
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,scientists));          
    document.getElementById('scientistCost').innerHTML = nextCost;     
};

var scienceInProgress = true;

function toggleScience(){ 
    scienceInProgress = !scienceInProgress;
    if(scienceInProgress){
        document.getElementById('scienceStatus').innerHTML = "Pause";
    } 
    else{
        document.getElementById('scienceStatus').innerHTML = "Resume";
    }
}

function researchAll(){     //research as much as possible with available resources
    if(logs > ore){
        clickScience(ore);
    }
    else{
        clickScience(logs);
    }
}







function clickDev(){
    food = food + 10000;
    logs = logs + 10000;
    ore = ore + 10000
    science = science + 10000;
}

window.setInterval(function(){
	
	clickFood(farmers);
    clickLogs(lumberjacks);
    clickOre(miners);
    if(scienceInProgress){
        clickScience(scientists);
    }
	
}, 1000);