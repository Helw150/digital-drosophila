function InitializeParticle() {
    this.particles = [];
    this.candidates = [];
    
    for (var i = 0; i < particleN; i++) {
        this.particles[i] = new Particle();
    }

    this.run = function() {
	for (var i = 0; i < particleN; i++) {
            this.particles[i].refresh();
            this.particles[i].completed ? this.particles[i].show('pink') : this.particles[i].show();
        }
    }
    
    this.analyze = function() {
        var bestfit = 0;
        var mintime = 0; 
        
        for (var i = 0; i < particleN; i++) {
            this.particles[i].getF();
            
            if (this.particles[i].fitness > bestfit) {
                bestfit = this.particles[i].fitness;
            }
            
            if (this.particles[i].timedone > mintime) {
                mintime = this.particles[i].timedone;
            }
        }

        for (var i = 0; i < particleN; i++) {
            this.particles[i].fitness /= bestfit;
        }
            
        this.candidates = [];
        
        for (var i = 0; i < particleN; i++) {
            var n = this.particles[i].fitness * 100;
            if (this.particles[i].timedone == mintime) {
                n *= 2;
            }
            for (var j = 0; j < n; j++) {
                this.candidates.push(this.particles[i])
            }    
        }
        
        if (floor(1/mintime) < timeToComplete) {
            timeToComplete = floor(1/mintime);
        }
    }
    
    this.selection = function() {
        
        var nextCandidates = [];
        
        for (var i = 0; i < particleN; i++) {
            var parentA = random(this.candidates).dna;
            var parentB = random(this.candidates).dna;
            
            while (parentA == parentB) {
                parentB = random(this.candidates).dna;
            }
            var child = parentA.crossover(parentB)
            child.mutate();
            nextCandidates[i] = new Particle(child)
        }
        
        this.particles = nextCandidates;
    }
}
