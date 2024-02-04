// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Constraint = Matter.Constraint;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Body = Matter.Body,
    Composite = Matter.Composite;

var engine;
var world;
var particles =[];
var boundaries = [];
var ground;

var mConstraint;
function setup() {
    // create an engine
    engine = Engine.create();
    world = engine.world
    // Matter.Runner.run(engine);
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1366,
          
            showAngleIndicator: false,
            wireframes:false
        }
    });
    Render.run(render);
    var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true, render: { fillStyle: '#060a19' } }),
    rockOptions = { density: 0.004 },
    rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
    anchor = { x: 170, y: 450 },
    elastic = Constraint.create({ 
        pointA: anchor, 
        bodyB: rock, 
        length: 0.01,
        damping: 0.01,
        stiffness: 0.05,
    });

var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});

var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true, render: { fillStyle: '#060a19' } });

var pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});
Composite.add(engine.world, [ground, pyramid, ground2, pyramid2, rock, elastic]);


Events.on(engine, 'afterUpdate', function() {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
        // Limit maximum speed of current rock.
        if (Body.getSpeed(rock) > 45) {
            Body.setSpeed(rock, 45);
        }

        // Release current rock and add a new one.
        rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
        Composite.add(engine.world, rock);
        elastic.bodyB = rock;
    }
});
   // add mouse control
   var mouse = Mouse.create(render.canvas),
   mouseConstraint = MouseConstraint.create(engine, {
       mouse: mouse,
       constraint: {
           stiffness: 0.2,
           render: {
               visible: false
           }
       }
   });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
   min: { x: 0, y: 0 },
   max: { x: 800, y: 600 }
});



    var prev = null;
    for (var x = 400; x < 500; x+=15) {
        
        var fixed = false;
        if(!prev){
            fixed = true;
        }

        var p = new Particle(x,150,10,fixed)
        
        particles.push(p);
        
    if(prev){
    var options = {
        bodyA:p.body,
        bodyB:prev.body,
        length:20,
        stiffness:1
    }
    var constraint = Constraint.create(options);
    World.add(world, constraint);
}
    prev = p;
}



    // boundaries.push(new Boundary(300,500,600,20,0))
    var canvasmouse = Mouse.create(canvas.elt)
    canvasmouse.pixelsRatio = pixelDensity();
    var options= {
        mouse:canvasmouse
    }
     mConstraint = MouseConstraint.create(engine,options)
    // World.add(world, mConstraint);
  }
  


function draw() {
    background(0,255,0);
    Engine.update(engine);
    
    // for (var i = 0; i < boundaries.length; i++) {
    // boundaries[i].show();
    // }
    // for (var i = 0; i < particles.length; i++) {
    //     fill(277)
    // particles[i].show()
    // }
    // line(particles[0].body.position.x,particles[1].body.position.y,)
    // if(mConstraint.body){
    //     var pos = mConstraint.body.position;
    //     fill(0,255,0);
    //     ellipse(pos.x,pos.y,20,20)
    // }

  }