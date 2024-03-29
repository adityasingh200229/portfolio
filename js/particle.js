function Particle(x , y, r, fixed){
    var options ={
        friction:0,
        restitution:0.9,
        isStatic:fixed
    }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
    // this.h = h;


    // this.isOffScreen = function(){
    //     var pos = this.body.position;
    //     return (pos.y > height + 100)
    // }

    // this.removeFromWorld = function(){
    //     World.remove(world, this.body);
    // }

    this.show=function(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill((222));
        ellipse(0, 0, this.r*2);
        pop();
    }
}