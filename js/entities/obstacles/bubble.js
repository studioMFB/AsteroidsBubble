class Bubble extends Obstacle {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity, pScale, pRadius, pMaxRadius) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity, pScale, pRadius, pMaxRadius)

        //this.setRotationRate(50);
        this.setDragCoeff1(0.12);
        this.setDragCoeff2(0.12);
        this.setFriction(0.995); 
        this.mRadius = pRadius;
        this.mMaxRadius = pMaxRadius;
        this.mMinRadius = this.getRadius();
        this.setScale(pScale);
        this.mGrow = true;
        this.mMiniBubble = false;

        this.initialiseSceneGraph(); 
    }  

    setIsMiniBubble(pMiniBubble){
        this.mMiniBubble = pMiniBubble;
    }
    getIsMiniBubble(){
        return this.mMiniBubble;
    }

    initialiseSceneGraph() {
        let translationMatrix, translationSceneGraphNode, rotationSceneGraphNode, rotationMatrix;
        let vectorsObject, boundaryBoxObject;

        translationMatrix = Matrix.createTranslation(this.getPosition());
        translationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);
     
        rotationMatrix = Matrix.createRotation(this.getRotation());
        rotationSceneGraphNode = new TransformNode(this.getTag(), rotationMatrix);
        translationSceneGraphNode.addChild(rotationSceneGraphNode);
        this.setRootSceneGraphNode(rotationSceneGraphNode);

        let scaleMatrix = Matrix.createScale(this.getScale());
        this.mScaleSceneGraphNode = new TransformNode(this.getTag(), scaleMatrix);
        rotationSceneGraphNode.addChild(this.mScaleSceneGraphNode);

        // center of Bubble - cross (For Debugging Mode)
        vectorsObject = [new Vector(0, -10, 1), new Vector(0, 10, 1)];
        this.mCrossVertical = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, vectorsObject));
        //rotationSceneGraphNode.addChild(this.mCrossVertical);
        this.mScaleSceneGraphNode.addChild(this.mCrossVertical);
        vectorsObject = [new Vector(-10, 0, 1), new Vector(10, 0, 1)];
        this.mCrossHorizontal = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, vectorsObject));
        //rotationSceneGraphNode.addChild(this.mCrossHorizontal );
        this.mScaleSceneGraphNode.addChild(this.mCrossHorizontal );
        // Boundary box
        boundaryBoxObject = new GeometryNode(this.getTag(), new Polygon(null, "#FFFFFF", 0.95, null, null, 36, this.getRadius()));
        this.setObject(boundaryBoxObject);
        //rotationSceneGraphNode.addChild(boundaryBoxObject);
        this.mScaleSceneGraphNode.addChild(boundaryBoxObject);
        this.setBoundaryBox(boundaryBoxObject);
     
        this.setRootSceneGraphNode(translationSceneGraphNode);
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
            this.getBoundaryBox().getDrawableObject().setStrokeColour("#FFFFFF");
        }

        this.calculateDrag();

        if(!this.getIsMiniBubble()){
            // Using radius instead of scale so:
            // - A: strokeWidth does not change
            // - B: to facillitate calculating collision between circle
            if(this.getRadius() > this.getMaxRadius() ){
                this.mGrow = false
            }
            else if (this.getRadius() <= this.getMinRadius()) {
                this.mGrow = true;
            }
            if(this.mGrow) {
                this.updateRadius(pDeltaTime);
            }
            else {
                this.updateRadius(-pDeltaTime);
            }
        }
        this.addFrictionToVelocity();
        this.updateVelocity(pDeltaTime);
        this.updatePosition(pDeltaTime);
    }

}