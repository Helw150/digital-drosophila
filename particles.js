function InitializeParticle() {
    this.particles = [];
    this.candidates = [];
    
    for (var i = 0; i < particleN; i++) {
        this.particles[i] = new Particle(null, {index: i});
    }

    this.run = function() {
	for (var i = 0; i < particleN; i++) {
            this.particles[i].refresh();
	    this.particles[i].show();
        }
    }
    
    this.analyze = function() {
        var bestfit = 0;
        let sumfit = 0;
        for (var i = 0; i < particleN; i++) {
            this.particles[i].getFitness();
            sumfit += this.particles[i].getFitness();
            if (this.particles[i].getFitness() > bestfit) {
                bestfit = this.particles[i].getFitness();
            }
        }
	
	let avgfit = sumfit/particleN;
	console.log(avgfit);
	
        for (var i = 0; i < particleN; i++) {
            this.particles[i].fitness /= bestfit;
        }
            
        this.candidates = [];
        
        for (var i = 0; i < particleN; i++) {
            var n = this.particles[i].fitness * 1000;
            for (var j = 0; j < n; j++) {
                this.candidates.push(this.particles[i])
            }    
        }

    }
    
    this.selection = function() {
	let lel = 0;
	var nextCandidates = [];
	//var nextCandidates = this.particles.filter(value => value.completed).map(value => new Particle(value.dna));
        for (var i = nextCandidates.length; i < particleN; i++) {
            var parentA = random(this.candidates);
            var parentB = random(this.candidates);

	    if (parentA.fitness < parentB.fitness){
		let tmp = parentA;
		parentA = parentB;
		parentB = tmp;
	    }
	    
            while (parentA.dna == parentB.dna) {
                parentB = random(this.candidates);
            }
            var child = parentA.dna.crossover(parentB.dna)
	    child.mutate();
            nextCandidates[i] = new Particle(child)
        }
        
        this.particles = nextCandidates;
    }
}
