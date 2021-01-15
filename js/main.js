function onLoad() {
    let canvas, context;
    let lastTime;
    let renderVisitor, rootSceneGraphNode;
    let quadTree;
    let background, star, player, missile;
    let wall, bubble, asteroid;
    let updatableObjects = [];
    let updatableBubbles = [];
    let updatableAsteroids = [];
    let updatableWalls = [];

    let updateMissile = false;
    let debbugingMode = false;
    let collisionHitTimer = 0.6;
    let miniBubbleTimer;
    let score = 0;
    const defaultColour = "white";
    const collisionResponseColour = "red";
 
    function initialiseContext() {
        canvas = document.getElementById('mainCanvas');

        if(!canvas) {
            alert ("I can not find the canvas element!");
            return;
        }
        context = canvas.getContext('2d');
        if (!context) {
            alert('Error: failed to get context!');
            return;
        }

        lastTime = Date.now();
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
    }

    function initialiseSceneGraph(){
        let originMatrix; //cell;

        originMatrix = setCanvasOrigin();
        rootSceneGraphNode = new TransformNode("RootSceneGraphNode", originMatrix);
        renderVisitor = new RenderVisitor(context);

        // BACKGROUND WITH SHOOTING STARS
        background = new Background(canvas, context, "Background", new Vector(0, 0, 1));
        rootSceneGraphNode.addChild(background.getRootSceneGraphNode());
        updatableObjects.push(background);

        // QUADTREE - SPACIAL PARTITIONING
        //cell = new Cell("cellCanvas", new Vector(0, 0, 1), canvas.width, canvas.height);
        //quadTree = new QuadTree("QuadTreeCanvas", cell);
        //quadTree = new QuadTree("QuadTreeCanvas", new Vector(0, 0, 1),  canvas.width /2, canvas.height /2, rootSceneGraphNode);
        //rootSceneGraphNode.addChild(quadTree.getRootSceneGraphNode());

        // PLAYER SPACESHIP 
        player = new Player(canvas, "Player", new Vector(0, 0, 1), (Math.PI *2), 1000, new Vector(500, 500, 1), new Vector(100, 100, 1));
        rootSceneGraphNode.addChild(player.getRootSceneGraphNode());
        //quadTree.insert(player);
        updatableObjects.push(player);

        // STAR
        star = new Star(canvas, "Star", new Vector(-220, 160, 1), Math.PI /3, 4, new Vector(90, 90, 1), new Vector(2, 2, 1));
        rootSceneGraphNode.addChild(star.getRootSceneGraphNode());
        updatableObjects.push(star);

        // ASTEROIDS - OBSTACLE
        vectorsObject = [new Vector(-11, 0, 1), new Vector(0, -50, 1), new Vector(30, -80, 1), new Vector(70, -50, 1), new Vector(50, -30, 1), new Vector(70, 10, 1), new Vector(10, 21, 1)];
        asteroid = new Asteroid(canvas, "Asteroid1", new Vector(-200, -200, 1), 1, 100, new Vector(5, 5, 1), new Vector(10, 10, 1), new Vector(0.5, 0.5, 1), vectorsObject, "left");
        rootSceneGraphNode.addChild(asteroid.getRootSceneGraphNode());
        updatableAsteroids.push(asteroid);

        vectorsObject = [new Vector(-11, 0, 1), new Vector(0, -50, 1), new Vector(50, -70, 1), new Vector(50, -40, 1), new Vector(90, -30, 1), new Vector(50, 30, 1), new Vector(10, 20, 1)];
        asteroid = new Asteroid(canvas, "Asteroid2", new Vector(-200, 50, 1), 1, 100, new Vector(5, 5, 1), new Vector(10, 10, 1), new Vector(0.5, 0.5, 1), vectorsObject, "right");
        rootSceneGraphNode.addChild(asteroid.getRootSceneGraphNode());
        updatableAsteroids.push(asteroid);
        
        // WALL - OBSTACLE
        wall = new Wall(canvas, "WallTop", new Vector(-200, -200, 1), null, 2, new Vector(2, 2, 1), new Vector(1, 1, 1), new Vector(0, 0, 1));
        rootSceneGraphNode.addChild(wall.getRootSceneGraphNode());
        //quadTree.insert(spinningBar);
        updatableWalls.push(wall);

        wall = new Wall(canvas, "WallBottom", new Vector(200, 80, 1), null, 2, new Vector(2, 2, 1), new Vector(1, 1, 1), new Vector(0, 0, 1));
        rootSceneGraphNode.addChild(wall.getRootSceneGraphNode());
        //quadTree.insert(spinningBar);
        updatableWalls.push(wall);

        // BUBBLE - OBSTACLE
        let numberOfBubbles = 10;
        for(let i = 0; i < numberOfBubbles; i++){
            let rotation;
            let radius;
            let maxRadius;
            let maxRandomValueX;
            let maxRandomValueY;

            if(i % 2 == 0){
                rotation = 1;
                maxRandomValueX = canvas.width / 2;
                maxRandomValueY = canvas.height / 2;
                radius = 15;
                maxRadius = 35;
            }
            if (i % 2 == 1) {
                rotation = -1;
                maxRandomValueX = -canvas.width / 2;
                maxRandomValueY = -canvas.height / 2;
                radius = 10;
                maxRadius = 50;
            }
            if(i % 3 == 0){
                rotation = Math.PI;
                maxRandomValueX = canvas.width / 4;
                maxRandomValueY = canvas.height / 4;
                radius = 20;
                maxRadius = 40;
            }
            if(i % 5 == 0){
                rotation = -Math.PI;
                maxRandomValueX = -canvas.width;
                maxRandomValueY = -canvas.height;
                radius = 15;
                maxRadius = 30;
            }
            let x = Math.floor(Math.random() * maxRandomValueX); 
            let y = Math.floor(Math.random() * maxRandomValueY); 
            let bubbleTag = "Bubble"+i;
            bubble = new Bubble(canvas, bubbleTag, new Vector(x, y, 1), rotation, 5, new Vector(5, 5, 1), new Vector(1, 1, 1), new Vector(0, 0, 1), new Vector(1, 1, 1), radius, maxRadius);
            rootSceneGraphNode.addChild(bubble.getRootSceneGraphNode());
            updatableBubbles.push(bubble);
            //quadTree.insert(updatableBubbles[i]);
        }
    }

    function setCanvasOrigin(){
        const origin = new Vector(canvas.width /2, canvas.height /2, 1);
        let originMatrix = Matrix.createTranslation(origin);
        originMatrix.setTransform(context);
        return originMatrix;
    }
   
    function gameLoop() {
        let thisTime, deltaTime;

        thisTime = Date.now();
        deltaTime = thisTime - lastTime;
        deltaTime /= 1000; // time in second

        update(deltaTime);
        draw();

        lastTime = thisTime;

        requestAnimationFrame(gameLoop);
    }
    function update(pDeltaTime) {
        let i, j, w;
        let miniBubble;
    
        collisionHitTimer -= pDeltaTime;

        if(updateMissile) {
            for(i =  0; i < player.getMissiles().length; i++) {
                for(w =  0; w < updatableWalls.length; w++) {
                    // Missiles (circle) vs Walls (line segment)
                    if(GameManager.segmentCircleCollisionDetection(updatableWalls[w], player.getMissiles()[i])) {
                        GameManager.segmentCircleCollisionResponse(player.getMissiles()[i]);                
                    }
                }
                for(j = 0; j < updatableBubbles.length; j++) {
                    // Missiles (circle) vs Bubbles (circle)
                    if(GameManager.circlesCollisionDetection(player.getMissiles()[i], updatableBubbles[j])) {
                        if(!updatableBubbles[j].getIsMiniBubble()) {

                            updatableBubbles[j].setScale(new Vector(0.3, 0.3, 1));
                            let bubbleTag = "Mini Bubble"+j;
                            updatableBubbles[j].setTag(bubbleTag);
                            let scaleMatrix = Matrix.createScale(updatableBubbles[j].getScale());
                            updatableBubbles[j].mScaleSceneGraphNode.setTransform(scaleMatrix);
                            updatableBubbles[j].getObject().getDrawableObject().setLineWidth(3);
                            updatableBubbles[j].setPosition(updatableBubbles[j].getPosition().add(new Vector(20, 20, 1)));

                            bubbleTag = "Mini Bubble"+ (j+1);
                            let position = updatableBubbles[j].getPosition().add(new Vector(20, 20, 1));
                            let rotation = updatableBubbles[j].getRotation();
                            let scale = updatableBubbles[j].getScale();
                            let radius = updatableBubbles[j].getRadius();
                            miniBubble = new Bubble(canvas, bubbleTag, position, rotation, 5, new Vector(5, 5, 1), new Vector(1, 1, 1), new Vector(0, 0, 1), scale, radius);
                            miniBubble.getObject().getDrawableObject().setLineWidth(3);
                            miniBubble.getObject().getDrawableObject().setStrokeColour(defaultColour);
                            rootSceneGraphNode.addChild(miniBubble.getRootSceneGraphNode());
                            updatableBubbles.push(miniBubble);
                
                            updatableBubbles[j].setIsMiniBubble(true);
                            miniBubble.setIsMiniBubble(true);
                            miniBubbleTimer = 0.3;
                        }
                        else if(updatableBubbles[j].getIsMiniBubble() && miniBubbleTimer <= 0) {
                            // Make Bubble disappear before removing from array of Bubbles
                            updatableBubbles[j].getObject().getDrawableObject().setStrokeColour(null);
                            updatableBubbles.splice(j, 1);
                        }
                        miniBubbleTimer -= pDeltaTime;
                    }
                }
                // Update Missiles
                player.getMissiles()[i].update(pDeltaTime);
                if( player.getMissiles()[i].getIsMissileOutOfEnergy()) {
                    player.getMissiles()[i].setIsMissileOutOfEnergy(false); 
                    player.spliceArrayObjectsAt(i);
                }
            }
        }
        //
        for(i =  0; i < updatableBubbles.length; i++) {
            for(j = 0; j < updatableAsteroids.length; j++) {
                // Asteroid's boundary box (square) vs Bubbles (circle)
                if(GameManager.circlesCollisionDetection(updatableAsteroids[j], updatableBubbles[i])) {
                    GameManager.circlesCollisionResponse(updatableAsteroids[j], updatableBubbles[i]);
                    updatableAsteroids[j].getObject().getDrawableObject().setStrokeColour(collisionResponseColour);
                }
            }
            // Player's boundary box (circle) vs Bubbles (circle)
            if(GameManager.circlesCollisionDetection(player, updatableBubbles[i])) {
                GameManager.circlesCollisionResponse(player, updatableBubbles[i]);
                player.getObject().getDrawableObject().setStrokeColour(collisionResponseColour);
                updatableBubbles[i].getObject().getDrawableObject().setStrokeColour(collisionResponseColour);
            }
            else if (collisionHitTimer <= 0) {
                player.getObject().getDrawableObject().setStrokeColour(defaultColour);
                updatableBubbles[i].getObject().getDrawableObject().setStrokeColour(defaultColour);
                collisionHitTimer = 0.6;
            }
            for(j = i + 1; j < updatableBubbles.length; j++) {
                // Bubbles (circle) vs Bubbles (circle)
                if(GameManager.circlesCollisionDetection(updatableBubbles[i], updatableBubbles[j])) {
                    GameManager.circlesCollisionResponse(updatableBubbles[i], updatableBubbles[j]);
                }
            }
        }
        //
        for(i = 0; i < updatableAsteroids.length; i++) {
            // Asteroid's boundary box (square) vs Player's boundary box (circle) 
            if(GameManager.circlesCollisionDetection(updatableAsteroids[i], player)) {
                GameManager.circlesCollisionResponse(updatableAsteroids[i], player);
                updatableAsteroids[i].getObject().getDrawableObject().setStrokeColour(collisionResponseColour);
                player.getObject().getDrawableObject().setStrokeColour(collisionResponseColour);
            }
            else{
                updatableAsteroids[i].getObject().getDrawableObject().setStrokeColour(defaultColour);
            }
            if (collisionHitTimer <= 0) {
                player.getObject().getDrawableObject().setStrokeColour(defaultColour);
                collisionHitTimer = 0.6;
            }  
        }
        //
        // Asteroid's boundary box (square) vs Asteroid's boundary box (square)
        if(GameManager.circlesCollisionDetection(updatableAsteroids[0], updatableAsteroids[1])) {
            GameManager.circlesCollisionResponse(updatableAsteroids[0], updatableAsteroids[1]);
        }
        //
        for(w =  0; w < updatableWalls.length; w++) {
            // Wall (line segment) vs Player's boundary box (circle) 
            if(GameManager.segmentCircleCollisionDetection(updatableWalls[w], player)) {
                GameManager.segmentCircleCollisionResponse(player);
                updatableWalls[w].getObject().getDrawableObject().setStrokeColour(collisionResponseColour);
                player.getObject().getDrawableObject().setStrokeColour(collisionResponseColour);
            }
            else{
                updatableWalls[w].getObject().getDrawableObject().setStrokeColour(defaultColour);
            }
            if (collisionHitTimer <= 0) {
                player.getObject().getDrawableObject().setStrokeColour(defaultColour);
                collisionHitTimer = 0.6;
            }
        }
        //
        // Update Entities objects
        updatableObjects.forEach(object => object.update(pDeltaTime));
        updatableBubbles.forEach(object => object.update(pDeltaTime));
        updatableAsteroids.forEach(object => object.update(pDeltaTime));
        updatableWalls.forEach(object => object.update(pDeltaTime));
    }

    function draw() {
        rootSceneGraphNode.accept(renderVisitor);
        //quadTree.draw(context);
        //GameManager.writeScore(canvas, context, score);
    }

    function shootingMissile() {
        if(player.getCanShoot() &&  player.getMissiles().length < player.getMissileMaxStockAllowed()) {
    
            missile = new Missile(canvas, "Missile", player.getPosition(), player.getRotation(), 1, new Vector(90, 90, 1), new Vector(10, 10, 1) );
            rootSceneGraphNode.addChild(missile.getRootSceneGraphNode());
            //quadTree.insert(missile);
            player.pushArrayObject(missile);
            
            updateMissile = true;
        }
    }

    function keyDownHandler(event) {
        if(event.key == "up" || event.key == "ArrowUp" || event.key == 19) {
            player.setIsUpPressed(true);
        } 
        else if(event.key == "left" || event.key == "ArrowLeft" || event.key == 21) {
            player.setIsLeftPressed(true);
        } 
        else if(event.key == "right" || event.key == "ArrowRight" || event.key == 22) {
            player.setIsRightPressed(true);
        }
        if(event.key == "Spacebar" || event.key == " " || event.key == 62) {
            shootingMissile();
            player.setCanShoot(false);
        }
        if(event.key == "d" || event.key == "KeyD" || event.key == 68) {
            if(!debbugingMode){
                Entity.setIsDPressed(false);
                debbugingMode = true;
           }   
           else if (debbugingMode){
                Entity.setIsDPressed(false);
                debbugingMode = false;
           }  
       }
    }
    function keyUpHandler(event) {
        if(event.key == "up" || event.key == "ArrowUp" || event.key == 19) {
            player.setIsUpPressed(false);
        }
        else if(event.key == "left" || event.key == "ArrowLeft" || event.key == 21) {
            player.setIsLeftPressed(false);
        }
        else if(event.key == "right" || event.key == "ArrowRight" || event.key == 22) {
            player.setIsRightPressed(false);
        }
        if(event.key == "Spacebar" || event.key == " " || event.key == 62) {
            player.setCanShoot(true);
        }
       if(event.key == "d" || event.key == "KeyD" || event.key == 68) {
           if(debbugingMode){
                Entity.setIsDPressed(true);
           }   
       }
    }

    initialiseContext();
    initialiseSceneGraph();
    gameLoop();
}

window.addEventListener('load', onLoad, false);
