//Charles Kelsey 6/10/22
//adapted from https://kastark.co.uk/articles/incrementals.html
//and https://kastark.co.uk/articles/incrementals-part-2.html

//resources
var food = 0;
var logs = 0;
var ore = 0;
var science = 0;

//workers
var farmers = 0;
var lumberjacks = 0;
var miners = 0;
var scientists = 0;

//multipliers: increased later with upgrades, so manual clicking is still relevant
var foodClickMultiplier = 1;
var logsClickMultiplier = 1;
var oreClickMultiplier = 1;
var scienceClickMultiplier = 1;

function makeFood(number){
    food = food + number;
    document.getElementById("food").innerHTML = food;
}

function clickFood(){
    makeFood(foodClickMultiplier);
}

function makeLogs(number){
    logs = logs + number;
    document.getElementById("logs").innerHTML = logs;
}

function clickLogs(){
    makeLogs(logsClickMultiplier);
}

function makeOre(number){
    ore = ore + number;
    document.getElementById("ore").innerHTML = ore;
}

function clickOre(){
    makeOre(oreClickMultiplier);
}

function makeScience(number){
    if(logs >= number && ore >= number){    //if the player has enough resources
        science = science + number;         //gives them that amount of science
        logs = logs - number;               //removes appropriate resources
        ore = ore - number;
        document.getElementById("science").innerHTML = science;
        document.getElementById("logs").innerHTML = logs;
        document.getElementById("ore").innerHTML = ore;
    }
}

var crudeScienceMultiplier = 5; //how much more it costs to do crude science by hand

function makeCrudeScience(number){
    if(logs >= number * crudeScienceMultiplier && ore >= number * crudeScienceMultiplier){    //if the player has enough resources
        science = science + number;         //gives them that amount of science
        logs = logs - number * crudeScienceMultiplier;               //removes appropriate resources
        ore = ore - number * crudeScienceMultiplier;
        document.getElementById("science").innerHTML = science;
        document.getElementById("logs").innerHTML = logs;
        document.getElementById("ore").innerHTML = ore;
    }
}

function clickScience(){
    makeCrudeScience(1);
}

function clickTenPercentScience(){  //research 10% of the maximum possible science with available resources
    if(logs > ore){
        makeCrudeScience(Math.floor(ore / crudeScienceMultiplier * 0.10));
    }
    else{
        makeCrudeScience(Math.floor(logs / crudeScienceMultiplier * 0.10));
    }

}

function clickAllScience(){         //research as much as possible with available resources
    if(logs > ore){
        makeCrudeScience(Math.floor(ore / crudeScienceMultiplier));
    }
    else{
        makeCrudeScience(Math.floor(logs / crudeScienceMultiplier));
    }
}

var foodPerFarmer = 3;  //each farmer makes this many food per tick
                        //NOTE: they also consume 1/t, for net production of 2/t
function hireFarmer(){
    var farmerCost = Math.floor(10 * Math.pow(1.25,farmers));        //works out the cost of this worker
    if(food >= farmerCost){                                         //checks that the player can afford the worker
        farmers = farmers + 1;                                      //increases number of workers
    	food = food - farmerCost;                                   //removes the food spent
        document.getElementById('farmers').innerHTML = farmers;     //updates the number of workers for the user
        document.getElementById('food').innerHTML = food;           //updates the number of food for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.25,farmers));          //works out the cost of the next worker
    document.getElementById('farmerCost').innerHTML = nextCost;     //updates the worker cost for the user
}
function hireLumberjack(){
    var lumberjackCost = Math.floor(10 * Math.pow(1.25,lumberjacks));    
    if(food >= lumberjackCost){                                         
        lumberjacks = lumberjacks + 1;                                  
    	food = food - lumberjackCost;                                   
        document.getElementById('lumberjacks').innerHTML = lumberjacks; 
        document.getElementById('food').innerHTML = food;               
    };
    var nextCost = Math.floor(10 * Math.pow(1.25,lumberjacks));          
    document.getElementById('lumberjackCost').innerHTML = nextCost;     
}
function hireMiner(){
    var minerCost = Math.floor(10 * Math.pow(1.25,miners));    
    if(food >= minerCost){                                         
        miners = miners + 1;                                  
    	food = food - minerCost;                                   
        document.getElementById('miners').innerHTML = miners; 
        document.getElementById('food').innerHTML = food;               
    };
    var nextCost = Math.floor(10 * Math.pow(1.25,miners));          
    document.getElementById('minerCost').innerHTML = nextCost;     
}
function hireScientist(){
    var scientistCost = Math.floor(10 * Math.pow(1.25,scientists));    
    if(food >= scientistCost){                                         
        scientists = scientists + 1;                                  
    	food = food - scientistCost;                                   
        document.getElementById('scientists').innerHTML = scientists; 
        document.getElementById('food').innerHTML = food;               
    };
    var nextCost = Math.floor(10 * Math.pow(1.25,scientists));          
    document.getElementById('scientistCost').innerHTML = nextCost;     
}

var choppingInProgress = true;
var miningInProgress = true;
var scienceInProgress = true;

function toggleChopping(){ 
    choppingInProgress = !choppingInProgress;
    if(choppingInProgress){
        document.getElementById('choppingStatus').innerHTML = "Pause";
    } 
    else{
        document.getElementById('choppingStatus').innerHTML = "Resume";
    }
}
function toggleMining(){ 
    miningInProgress = !miningInProgress;
    if(miningInProgress){
        document.getElementById('miningStatus').innerHTML = "Pause";
    } 
    else{
        document.getElementById('miningStatus').innerHTML = "Resume";
    }
}function toggleScience(){ 
    scienceInProgress = !scienceInProgress;
    if(scienceInProgress){
        document.getElementById('scienceStatus').innerHTML = "Pause";
    } 
    else{
        document.getElementById('scienceStatus').innerHTML = "Resume";
    }
}

function getActiveWorkers(){
    var totalActiveWorkers = 0;

    totalActiveWorkers += farmers; //farmers always provide net positive food, so they're always active
    if(choppingInProgress){
        totalActiveWorkers += lumberjacks;
    }
    if(miningInProgress){
        totalActiveWorkers += miners;
    }
    if(scienceInProgress){
        totalActiveWorkers += scientists;
    }

    return totalActiveWorkers;
}
function doWork(){
    activeWorkers = getActiveWorkers();

    if(food >= activeWorkers){  //if there's enough food to feed all the workers
        food = food - activeWorkers;
        makeFood(farmers * foodPerFarmer);
        
        if(choppingInProgress){
            makeLogs(lumberjacks);
        }
        if(miningInProgress){
            makeOre(miners);
        }
        if(scienceInProgress){
            makeScience(scientists);
        }
    }
    else{   //there's not enough food, so only the farmers are active this tick
        food = food - farmers;
        makeFood(farmers * foodPerFarmer);
    }
}

function tick(){

    doWork();

    checkDeleteSave();

}

//tick every second
window.setInterval(function(){
    tick();
}, 1000);

//click this to skip ahead 1 hour for testing
function clickDev(){ 
    for (let i = 0; i < 3600; i++) { 
        tick();
    }
}

//save progress in the browser's local storage as a JSON
function save(){
    var save = {
        food: food,
        logs: logs,
        ore: ore,
        science: science,

        farmers: farmers,
        lumberjacks: lumberjacks,
        miners: miners,
        scientists: scientists,

        foodClickMultiplier: foodClickMultiplier,
        logsClickMultiplier: logsClickMultiplier,
        oreClickMultiplier: oreClickMultiplier,
        scienceClickMultiplier: scienceClickMultiplier,

        crudeScienceMultiplier: crudeScienceMultiplier,

        foodPerFarmer: foodPerFarmer,

        choppingInProgress: choppingInProgress,
        miningInProgress: miningInProgress,
        scienceInProgress: scienceInProgress
        
    }

    localStorage.setItem("save",JSON.stringify(save)); 
}

//load progress from browser local storage
function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame == null){
        savegame = {};
    }

    if (typeof savegame.food !== "undefined") {
        food = savegame.food;
        document.getElementById("food").innerHTML = food;
    }
    if (typeof savegame.logs !== "undefined") {
        logs = savegame.logs;
        document.getElementById("logs").innerHTML = logs;
    }
    if (typeof savegame.ore !== "undefined") {
        ore = savegame.ore;
        document.getElementById("ore").innerHTML = ore;
    }
    if (typeof savegame.science !== "undefined") {
        science = savegame.science;
        document.getElementById("science").innerHTML = science;
    }

    if (typeof savegame.farmers !== "undefined") {
        farmers = savegame.farmers;
        document.getElementById("farmers").innerHTML = farmers;
    }
    if (typeof savegame.lumberjacks !== "undefined") {
        lumberjacks = savegame.lumberjacks;
        document.getElementById("lumberjacks").innerHTML = lumberjacks;
    }
    if (typeof savegame.miners !== "undefined") {
        miners = savegame.miners;
        document.getElementById("miners").innerHTML = miners;
    }
    if (typeof savegame.scientists !== "undefined") {
        scientists = savegame.scientists;
        document.getElementById("scientists").innerHTML = scientists;
    }

    if (typeof savegame.foodClickMultiplier !== "undefined") {
        foodClickMultiplier = savegame.foodClickMultiplier;
    }
    if (typeof savegame.logsClickMultiplier !== "undefined") {
        logsClickMultiplier = savegame.logsClickMultiplier;
    }
    if (typeof savegame.oreClickMultiplier !== "undefined") {
        oreClickMultiplier = savegame.oreClickMultiplier;
    }
    if (typeof savegame.scienceClickMultiplier !== "undefined") {
        scienceClickMultiplier = savegame.scienceClickMultiplier;
    }

    if (typeof savegame.crudeScienceMultiplier !== "undefined") {
        crudeScienceMultiplier = savegame.crudeScienceMultiplier;
    }

    if (typeof savegame.foodPerFarmer !== "undefined") {
        foodPerFarmer = savegame.foodPerFarmer;
    }

    if (typeof savegame.scienceInProgress !== "undefined") {
        scienceInProgress = savegame.scienceInProgress;
        if(scienceInProgress){
            document.getElementById('scienceStatus').innerHTML = "Pause";
        } 
        else{
            document.getElementById('scienceStatus').innerHTML = "Resume";
        }        
    }
}

var deleteCountdown = -1;

function checkDeleteSave(){ //counts down from 5, called every tick
    if(deleteCountdown > 0){//if a countdown is in progress, decrement the countdown
        deleteCountdown--;  
    }
    else if(deleteCountdown == 0){    //if the countdown is finished without deleting, reset the button
        document.getElementById('confirmDeleteSave').innerHTML = "Delete Save"; 
        deleteCountdown--;
    }
}
function clickDeleteSave(){ 
    if(deleteCountdown >= 0){   //if clicked while a countdown is in progress, delete the save
        localStorage.removeItem("save");
        location.reload();
    }
    else{
        deleteCountdown = 5;
        document.getElementById('confirmDeleteSave').innerHTML = "Are you sure?";
    }
}

//save progress every 60 seconds
window.setInterval(function(){
    save();
}, 60000);
