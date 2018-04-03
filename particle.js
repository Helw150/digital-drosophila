var obsx;
var obsy;
var obsOffsetX;
var obsOffsetY;

function Particle(dna, opt) {
    this.loc = opt && opt.initial_location ? opt.initial_location : createVector(width/4, height/2);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = 0.05;
    this.speed = 0.05;
    
    
    this.color = opt && opt.color ? opt.color : 0;
    this.width = 10;
    this.fitness = 0;

    this.completed = false;
    this.crashes = false;
    
    this.tte = 1 / maxAge;
    this.timedone = 1 / maxAge; 
    
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA(null, opt.index);
    }
    
    this.fitness = 0;
    
    this.addForce = function() {
        this.acc.add(this.dna.genes[particleAge])
    }
    
    this.getF = function() {
	let d = 1000000000;
	for( let i = 0; i < t.length; i++){ 
            let tmpD = dist(this.loc.x, this.loc.y, t[i].loc.x, t[i].loc.y)
	    if(tmpD < d){
		d = tmpD;
	    }
	}
        fitness = (1 / d);
        
        if (this.completed) {
            fitness *= 10;
        } else if (this.crashes && (d > 50))  {
            fitness /= 10;
        } else if (this.crashes && (d < 50))  {
            fitness /= 5;
        }
	return fitness;
    }

    this.getFitness = function() {
	return this.fitness;
    }
    
    this.refresh = function() {
	for(let i = 0; i < t.length; i++){
            if (!this.complete && dist(this.loc.x, this.loc.y, t[i].loc.x, t[i].loc.y) < ((t[i].width/2) + this.width/2) && this.crashes !== true) {
		if(!t.includes(this)) {
		    this.completed = true;
		    lastComplete = 0;
		    this.tte = 1 / particleAge;
		    if (this.tte > this.timedone) {
			this.timedone = this.tte
		    }
		    t.splice(i, 1);
		}
            }
	}
	
	if(this.getF() > this.fitness){
	   this.fitness = this.getF()
	}
	
	if (this.loc.x < 0 || this.loc.x > width) {
	  this.vel.x *= -1;
	}
	if(this.loc.y < 0 || this.loc.y > height){
	    this.vel.y *= -1;
	}
        if (!this.completed) {
            this.addForce()
            this.vel.add(this.acc);
            this.loc.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }
    
    this.show = function(color) {
        push()
	translate(this.loc.x, this.loc.y)
        rectMode(CENTER)
        rotate(this.vel.heading());
        strokeWeight(2);
        color ? fill(color) : fill(this.dna.color);
	if(this.completed){
	    let x = 0 + sin(this.angle)*8;
	    let y = 0 + cos(this.angle)*8;
	    ellipse(x,y,this.width+5);
	    ellipse(-1*x, -1*y, this.width*2);
	    this.angle = this.angle + this.speed;
	} else {
	    ellipse(0, 0, this.width);
	}
        pop()
    }
}
