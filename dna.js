function to_color(arr_hsb){
    return 'hsb('+round(arr_hsb[0])+', '+round(arr_hsb[1])+'%, '+round(arr_hsb[2])+'%)';
}

function DNA(child, order) {
    if (child) {
        this.genes = child.genes;
	this.internal_color = child.internal_color;
	this.color = child.color;
    } else {
        this.genes = [];
        for (var i = 0; i < maxAge; i++) {
            this.v = p5.Vector.random2D()
            this.genes[i] = this.v.setMag(0.7)
        }
	if(order){
	    this.internal_color = [order*3, Math.random()*100, Math.random()*50+50]
	    this.color = to_color(this.internal_color);
	} else {
	    this.color = 'black';
	    this.internal_color = [0, 0, 0];
	}
	
    }

    this.crossover = function(parent) {
        var child = {};
	child.genes = [];
        var midpoint = random(this.genes.length);
        
        for (var i = 0; i < this.genes.length; i++) {
            if (i < midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = parent.genes[i];
            }
        }
	child.color = this.color;
	child.internal_color = this.internal_color;
        return new DNA(child)
        
    }
    
    this.mutate = function() {
	for (var i = 0; i < this.genes.length; i++) {
            if (random(1) <  mutrate ) {
		this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.7);
		let rgb_to_change = i < 200 ? 0 : i < 400 ? 1 : 2; 
		let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		this.internal_color = this.internal_color.map((value, index) => {return(index === 0 ? value + plusOrMinus : value)});
		this.color = to_color(this.internal_color)
	    }
	}
    }
}
