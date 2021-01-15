class ShootingStar {
    constructor(pCanvas, pTag, pIndex, pMaxRandomValue, pPosition, pRotation, pVelocity) { 
        this.mCanvas = pCanvas;
        this.mTag = pTag;

        this.setIndex(pIndex);
        this.setMaxRandomValue(pMaxRandomValue);

        this.setPosition(pPosition);
        this.setRotation(pRotation);
        this.setVelocity(pVelocity);

        this.initialiseSceneGraph();
    }
    getRootSceneGraphNode() {
        return this.mRootSceneGraphNode;
    }
    setRootSceneGraphNode(pRootSceneGraphNode) {
        this.mRootSceneGraphNode = pRootSceneGraphNode;
    }

    getIndex() {
        return this.mIndex;
    }
    setIndex(pIndex) {
        this.mIndex = pIndex;
    }
    getMaxRandomValue() {
        return this.mMaxRandomValue;
    }
    setMaxRandomValue(pMaxRandomValue) {
        this.mMaxRandomValue = pMaxRandomValue;
    }

    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }
    getRotation() {
        return this.mRotation;
    }
    setRotation(pRotation) {
        this.mRotation = pRotation;
    }
    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }
    getVelocity() {
        return this.mVelocity;
    }

    initialiseSceneGraph() {
        let translationMatrix, translationSceneGraphNode, rotationSceneGraphNode, rotationMatrix;
        
        translationMatrix = Matrix.createTranslation(this.getPosition());
        translationSceneGraphNode = new TransformNode(this.mTag, translationMatrix);

        rotationMatrix = Matrix.createRotation(this.getRotation());
        rotationSceneGraphNode = new TransformNode(this.mTag, rotationMatrix);
        translationSceneGraphNode.addChild(rotationSceneGraphNode);

        var shootingStarLength = Math.floor(Math.random() * 21); 
        this.mObject = new GeometryNode(this.mTag, new Polygon(null, "#FFFFFF", 0.5, "round", null, 2, shootingStarLength));
        rotationSceneGraphNode.addChild(this.mObject);

        this.setRootSceneGraphNode(translationSceneGraphNode);
    }
      
    update(pDeltaTime) {
        this.newTranslationMatrix(pDeltaTime);
    }
    newTranslationMatrix(pDeltaTime) {
        var x, y, limitX, limitY;
        var translationMatrix;

        x = this.getPosition().getX();
        y = this.getPosition().getY();

        limitX = this.mCanvas.width + 100;
        limitY = this.mCanvas.height + 100;

        if((x > limitX) || (y > limitY)){

            x = Math.floor(Math.random() * this.getMaxRandomValue());
            y = Math.floor(Math.random() * this.getMaxRandomValue());
            this.setPosition(new Vector(x, y, 1));
       }
        
        if(this.getIndex() %2 == 0){
            this.getVelocity().setX(50);
            this.getVelocity().setY(50);
        }
        else if(this.getIndex() %3 == 0){
            this.getVelocity().setX(100);
            this.getVelocity().setY(100);
        }
        else if(this.getIndex() %5 == 0){
            this.getVelocity().setX(500);
            this.getVelocity().setY(500);
        }

        var velocityDelta = this.getVelocity().multiply(pDeltaTime);
        var newPosition = this.getPosition().add(velocityDelta);
        this.setPosition(newPosition);
        translationMatrix = Matrix.createTranslation(this.getPosition());

       this.getRootSceneGraphNode().setTransform(translationMatrix);
    }
}

