class Asteroid extends Obstacle {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity, pVectorsObject, pRotationDirection) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity, pVectorsObject, pRotationDirection)

        this.mVectorsObject = pVectorsObject;

        this.setRotationRate(0.5);
        this.setDragCoeff1(0.12);
        this.setDragCoeff2(0.12);
        this.setFriction(0.98); 
        this.setRotationDirection(pRotationDirection);
        
        this.initialiseSceneGraph(); 
    }  
    initialiseSceneGraph() {
        let translationMatrix, translationSceneGraphNode, rotationMatrix, rotationSceneGraphNode;
        let object, vectorsObject, boundaryBoxObject;


        translationMatrix = Matrix.createTranslation(this.getPosition());
        translationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);
     
        rotationMatrix = Matrix.createRotation(this.getRotation());
        rotationSceneGraphNode = new TransformNode(this.getTag(), rotationMatrix);
        translationSceneGraphNode.addChild(rotationSceneGraphNode);
        this.setRotationSceneGraphNode(rotationSceneGraphNode);

        translationMatrix = Matrix.createTranslation(new Vector(34, -20, 1));
        let newTranslationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);
        rotationSceneGraphNode.addChild(newTranslationSceneGraphNode);

        // Center of Player - cross (For Debugging Mode)
        vectorsObject = [new Vector(11, -11, 1), new Vector(-11, 11, 1)];
        this.mCrossVertical = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, vectorsObject));
        //rotationSceneGraphNode.addChild(this.mCrossVertical);
        newTranslationSceneGraphNode.addChild(this.mCrossVertical);
        vectorsObject = [new Vector(-11, -11, 1), new Vector(11, 11, 1)];
        this.mCrossHorizontal = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, vectorsObject));
        //rotationSceneGraphNode.addChild(this.mCrossHorizontal);
        newTranslationSceneGraphNode.addChild(this.mCrossHorizontal);
        // Boundary box - Square 
        this.setRadius(66);
        boundaryBoxObject = new GeometryNode(this.getTag(), new Polygon(null, null, 0.75, null, null, 4, this.getRadius()));
        this.setBoundaryBox(boundaryBoxObject);
        this.setBoundaryBoxDepth(this.getRadius() *2);
        //rotationSceneGraphNode.addChild(boundaryBoxObject);
        newTranslationSceneGraphNode.addChild(boundaryBoxObject);

        // Asteroid
        object = new GeometryNode(this.getTag(), new Polygon(null, "#FFFFFF", 1.4, null, this.mVectorsObject));
        rotationSceneGraphNode.addChild(object);
        this.setObject(object);

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
            this.getBoundaryBox().getDrawableObject().setStrokeColour(null);
        }

        this.calculateDrag();

        if(this.getRotationDirection() == "left") {
           this.rotateLeft(pDeltaTime);
        }
        else {
           this.rotateRight(pDeltaTime);
        }
        
        this.addFrictionToVelocity();
        this.updateVelocity(pDeltaTime);
        this.updatePosition(pDeltaTime);
    }

}