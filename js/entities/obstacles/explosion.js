class Explosion extends Entity {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce)

        this.initialiseSceneGraph(); 
    }
        initialiseSceneGraph() {
            let translationMatrix, translationSceneGraphNode;
            let vectorsObject;
        
            translationMatrix = Matrix.createTranslation(this.getPosition());
            translationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);
    
            vectorsObject = [new Vector(-5, 35, 1), new Vector(0, 45, 1), new Vector(5, 35, 1)];
            this.mObject = new GeometryNode(this.getTag(), new Polygon(null, null, 1, null, vectorsObject));
            //this.mObject = new GeometryNode(this.getTag(), new Polygon(null, null, 1, null, this.mVectorsObject.flame));
            //this.mObject = new GeometryNode(new Polygon(null, null, 1, null, this.getVectorsObject().flame), this.mTag);
            translationSceneGraphNode.addChild(this.mObject);
    
            this.setRootSceneGraphNode(translationSceneGraphNode);
        }
    
        update(pDeltaTime) {
            
        }
    }