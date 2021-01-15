class Star extends Entity {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration)

        this.setVelocity(new Vector(1, 1, 1));
        this.setSpeed(500);
        this.setRotationRate(6);
        this.setDragCoeff1(0.12);
        this.setDragCoeff2(0.12);
        this.setFriction(0.8); 

        this.setScale(new Vector(0.5, 0.5, 1));
        this.setScaleRate(new Vector(1, 1, 1));
        this.mMaxScale = new Vector(1.4, 1.4, 1);
        this.mMinScale = new Vector(0.5, 0.5, 1);
        this.mGrow = true;

        this.initialiseSceneGraph(); 

        this.collectForces();
    }

    initialiseSceneGraph() {
       let translationMatrix, translationSceneGraphNode, rotationMatrix, rotationSceneGraphNode, scaleMatrix;
       let vectorsObject, object;

       translationMatrix = Matrix.createTranslation(this.getPosition());
       translationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);
    
       rotationMatrix = Matrix.createRotation(this.getRotation());
       rotationSceneGraphNode = new TransformNode(this.getTag(), rotationMatrix);
       translationSceneGraphNode.addChild(rotationSceneGraphNode);
       this.setRotationSceneGraphNode(rotationSceneGraphNode);

       scaleMatrix = Matrix.createScale(this.getScale());
       this.mScaleSceneGraphNode = new TransformNode(this.getTag(), scaleMatrix);
       rotationSceneGraphNode.addChild(this.mScaleSceneGraphNode);

      let rotation = 0.1;
      for(let i = 0; i < 40; i++){

            rotationMatrix = Matrix.createRotation(Math.PI / rotation);
            let newRotationSceneGraphNode = new TransformNode(this.getTag(), rotationMatrix);
            this.mScaleSceneGraphNode.addChild(newRotationSceneGraphNode);

            vectorsObject = [new Vector(0, -50, 1), new Vector(0, 50, 1)];
            object = new GeometryNode(this.getTag(), new Polygon(null, "#FFFFFF", 0.2, null, vectorsObject));
            this.setObject(object);
            newRotationSceneGraphNode .addChild(object);

            rotation += 0.1;
       }

       this.setRootSceneGraphNode(translationSceneGraphNode);
    } 

    update(pDeltaTime) {
        this.calculateDrag();

        this.rotateLeft(pDeltaTime);

        if(this.getScale().getX() > this.mMaxScale.getX()){
                this.mGrow = false;
        }
        else if (this.getScale().getX() <= this.mMinScale.getX()) {
                this.mGrow = true;
        }
        if(this.mGrow) {
            this.updateScale(pDeltaTime);
        }
        else {
            this.updateScale(-pDeltaTime);
        }

        this.addFrictionToVelocity();
        this.updateVelocity(pDeltaTime);
        this.updatePosition(pDeltaTime);
    }

}