var a1, a2;
var t;
var maxAge;
var ageP;

var timeToComplete;
var timeToCompleteMsg;
var lastComplete = 0;
var num_females = 1;

var particleN = 10;
var particleAge = 1;

var original_dna = [];

var mx, my;
var offsetX, offsetY;
var obstacleOffsetX, obstacleOffsetY;

var mDragged = false;
var tDragged = false;
var rollover = false;

var gen = 1;
var mutrate = 0.008;

var colors = [];

function setup() {
    colorMode('HSB', 100);
    createCanvas(windowWidth-20, windowHeight-20);
    frameRate(600);
    respawn();
    t = [];
    for(let i = 0; i < num_females; i++){
	let tmp_dna = new DNA();
	t[i] = new Particle(tmp_dna, {initial_location: createVector(3*width/4, height/2)});
	t[i].width = 15;
	original_dna[i] = tmp_dna; 
    }
}


function respawn() {
    particleAge = 0;
    gen = 1;

    maxAge = 600;
    particleN = 200;
    mutrate = 0.05;
    
    timeToComplete = maxAge;

    particle = new InitializeParticle();
}

function draw() {
    background(255);

    for( let i = 0; i < t.length; i++){
	t[i].refresh();
	t[i].show('red');
    }
    particle.run();
    particleAge++;

    if ((particleAge == maxAge || t.length === 0) && particleN !== num_females) {
	/* if(t.length === 0){
	   particleN = Math.max(particleN/2, num_females);
	   mutrate = mutrate/2;
	   }*/
	if (lastComplete > 10) {
	    mutrate *= 2;
	    lastComplete = 0;
	}

	particle.analyze();
	particle.selection();

	for(let i = 0; i < num_females; i++){
	    t[i] = new Particle(null, {initial_location: createVector(3*width/4, height/2)});
	    t[i].width = 15;
	}
	particleAge = 0;
	completedCount = 0;

	lastComplete++;
	gen++;
    }
}
