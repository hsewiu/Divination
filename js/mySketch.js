//for the #wccChallenge on the theme of 'flat'.  ----> code by Aaron Reuland
//Thought I would be skipping this week, as I'm on vacation in northern California.
//But, I found myself walking across a beach at low tide on some mud flats
//and saw all sorts of interesting patterns made by the retreating water.

//This was a quick attempt to recreate some of them with particles drawing across
//the canvas and scattering around debris.
//code by Aaron Reuland

let stroker
let beach=[]
let stones=[]

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1)
	background('#474843');
	stroker= color('#eeeff0')
	stroker.setAlpha(30)
	for(let y=-50; y<height+50; y+=random(80, 120)){
		let x= map(noise(y/10), 0, 1, width/6, width-width/4)
	var stone ={
			pos: createVector(x, y),
			r: random(height/70, height/12),
		}
	stones.push(stone);
	}
	
	for(let y=-height/10; y<height+height/10; y++){
		beach.push(new sand(-10, y+random(-1, 1)))
	}
}

function draw() {
	if(frameCount<200 && frameCount%8==0){
	for(let y=-height/10; y<height+height/4; y++){
		beach.push(new sand(-10, y))
	}	
		
	}
		
	for(let i=beach.length-1; i>=0; i--){
		beach[i].move();
		beach[i].show();
		beach[i].end();
	}
}

class sand{
constructor(x, y){
this.pos=createVector(x, y)
this.acc=createVector(random(0.02, 0.05), 0)
this.vel= createVector(0, 0)
}
	
move(){
for(let i=0; i<stones.length; i++){
	let d=p5.Vector.dist(this.pos, stones[i].pos)
	if(d <= stones[i].r){
		 let yvOff= (this.pos.y-stones[i].pos.y)*-2
		 this.acc.add(0, yvOff)
		 }
}
let yoff= map(noise(frameCount/50, this.pos.x/10, this.pos.y/50), 0, 1, -0.002, 0.002)
this.acc.add(0, yoff)
this.vel.add(this.acc)
this.pos.add(this.vel)
}
	
show(){
	stroke(stroker)
	point(this.pos.x, this.pos.y)
}
	
end(){
if(this.pos.x>width+1 || this.pos.y<-height/10 || this.pos.y>height+height/10){
let index= beach.indexOf(this)
beach.splice(index, true)
}	
}	
}