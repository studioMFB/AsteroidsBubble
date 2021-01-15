class Player extends Entity {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration)
        
        this.setVelocity(new Vector(0, 0, 1));
        this.setSpeed(65);
        this.setRotationRate(6);
        this.setDragCoeff1(0.07);
        this.setDragCoeff2(0.09);
        this.setFriction(0.9928);
        this.setMissileMaxStockAllowed(5);

        this.mCanShoot = true;
        this.mMissiles = [];
        this.setArray(this.mMissiles);

        this.initialiseSceneGraph(); 
    } 
    setIsUpPressed(pUpPressed) {
        this.mUpPressed = pUpPressed;
    }
    getIsUpPressed() {
        return this.mUpPressed;
    }
    setIsLeftPressed(pLeftPressed) {
        this.mLeftPressed = pLeftPressed;
    }
    getIsLeftPressed() {
        return this.mLeftPressed;
    }
    setIsRightPressed(pRightPressed) {
        this.mRightPressed = pRightPressed;
    }
    getIsRightPressed() {
        return this.mRightPressed;
    }

    setCanShoot(pCanShoot) {
        this.mCanShoot = pCanShoot;
    }
    getCanShoot() {
        return this.mCanShoot;
    }
    getMissiles() {
        return this.mMissiles;
    }
    setMissileMaxStockAllowed(pMissilesMaxStock) {
        this.mMissilesMaxStock = pMissilesMaxStock;
    }
    getMissileMaxStockAllowed() {
        return this.mMissilesMaxStock;
    }

    initialiseSceneGraph() {
        let translationMatrix, rotationMatrix;
        let spaceShipBodyObject, spaceShipHeadObject;
        let vectorsObject, boundaryBoxObject;

        translationMatrix = Matrix.createTranslation(this.getPosition());
        this.mTranslationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);
     
        rotationMatrix = Matrix.createRotation(this.getRotation());
        this.mRotationSceneGraphNode = new TransformNode(this.getTag(), rotationMatrix);
        this.mTranslationSceneGraphNode.addChild(this.mRotationSceneGraphNode);

        // Center of Player - cross (For Debugging Mode)
        vectorsObject = [new Vector(11, -11, 1), new Vector(-11, 11, 1)];
        this.mCrossVertical = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, vectorsObject));
        this.mRotationSceneGraphNode.addChild(this.mCrossVertical);
        vectorsObject = [new Vector(-11, -11, 1), new Vector(11, 11, 1)];
        this.mCrossHorizontal = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, vectorsObject));
        this.mRotationSceneGraphNode.addChild(this.mCrossHorizontal);
        // Boundary box - circle 
        this.setRadius(15);
        boundaryBoxObject = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, null, 36, this.getRadius()));
        this.setBoundaryBox(boundaryBoxObject);
        this.setBoundaryBoxDepth(this.getRadius() *2);
        this.mRotationSceneGraphNode.addChild(boundaryBoxObject);

        vectorsObject = [new Vector(-7, 12, 1), new Vector(0, -12, 1), new Vector(7, 12, 1)];
        spaceShipBodyObject = new GeometryNode(this.getTag(), new Polygon(null, "#FFFFFF", 1, null, vectorsObject));
        this.mRotationSceneGraphNode.addChild(spaceShipBodyObject);
        this.setObject(spaceShipBodyObject);

        vectorsObject = [new Vector(-3, -3, 1), new Vector(0, -10, 1), new Vector(3, -3, 1)];
        spaceShipHeadObject = new GeometryNode(this.getTag(), new Polygon("#FFFFFF", null, 1, null, vectorsObject));
        this.mRotationSceneGraphNode.addChild(spaceShipHeadObject);

        this.mSpaceShipThruster = new SpaceShipThruster(null, "SpaceShipThruster", new Vector(0, -20, 1));
        this.mSpaceShipThruster.setFlashingTimer(0.15);
        this.mRotationSceneGraphNode.addChild(this.mSpaceShipThruster.getRootSceneGraphNode());
        
        this.setRootSceneGraphNode(this.mTranslationSceneGraphNode);
    }

    update(pDeltaTime) {

        if(Entity.getIsDPressed()){
            this.mCrossVertical.getDrawableObject().setStrokeColour("yellow");
            this.mCrossHorizontal.getDrawableObject().setStrokeColour("yellow");
            this.getBoundaryBox().getDrawableObject().setStrokeColour("yellow");
        }
        else{
            this.mCrossVertical.getDrawableObject().setStrokeColour(null);
            this.mCrossHorizontal.getDrawableObject().setStrokeColour(null);
            this.getBoundaryBox().getDrawableObject().setStrokeColour(null);
        }
        

        this.calculateAcceleration(this.getGravity());
        this.calculateDrag();
        this.collectForces();

        if(this.getIsLeftPressed()) {
            this.rotateLeft(pDeltaTime);
        }
        else if(this.getIsRightPressed()) {
            this.rotateRight(pDeltaTime);
        } 
        if(this.getIsUpPressed()) {
            this.updateVelocity(pDeltaTime);
        }
        else{
            this.addFrictionToVelocity();
        }

        this.updatePosition(pDeltaTime);

        this.mSpaceShipThruster.update(pDeltaTime, this.getIsUpPressed());
    }

}