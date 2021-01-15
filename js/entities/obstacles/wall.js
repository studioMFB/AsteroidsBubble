class Wall extends Obstacle {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity)

        this.setDragCoeff1(0.12);
        this.setDragCoeff2(0.12);
        this.setFriction(0.8); 
        
        this.initialiseSceneGraph(); 
        this.collectForces();
    }  

    initialiseSceneGraph() {
        let translationMatrix, translationSceneGraphNode;
        let vectorsObject, object;

        translationMatrix = Matrix.createTranslation(this.getPosition());
        translationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);
        
        // Wall - Line
        vectorsObject = [new Vector(0, 0, 1), new Vector(0, 150, 1)];
        this.setVectorsObject(vectorsObject);
        object = new GeometryNode(this.getTag(), new Polygon(null, "#FFFFFF", 5, null, vectorsObject));
        this.setObject(object);
        translationSceneGraphNode.addChild(object);

        // For Debugging - Line
        vectorsObject = [new Vector(0, 0, 1), new Vector(0, 150, 1)];
        this.setVectorsObject(vectorsObject);
        object = new GeometryNode(this.getTag(), new Polygon(null, "yellow", 5, null, vectorsObject));
        this.setBoundaryBox(object);
        translationSceneGraphNode.addChild(object);
     
        this.setRootSceneGraphNode(translationSceneGraphNode);
    }
    
    update(pDeltaTime) {

        if(Entity.getIsDPressed()){
            this.getBoundaryBox().getDrawableObject().setStrokeColour("yellow");
        }
        else{
            this.getBoundaryBox().getDrawableObject().setStrokeColour(null);
        }

        this.calculateDrag();
        this.addFrictionToVelocity();
        this.updateVelocity(pDeltaTime);
    }

}