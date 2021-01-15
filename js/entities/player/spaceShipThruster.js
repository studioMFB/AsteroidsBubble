class SpaceShipThruster extends Entity {
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

            translationSceneGraphNode.addChild(this.mObject);
    
            this.setRootSceneGraphNode(translationSceneGraphNode);
        }
    
        update(pDeltaTime, pFireRockets) {
            let fillColour;

            this.mFlasingTimer -= pDeltaTime;

            if(pFireRockets && this.mFlasingTimer > 0.1) {
                fillColour = "#FFFFFF";
            }
            else if (this.mFlasingTimer > 0){
                fillColour = null;
            }
            else {
                this.mFlasingTimer = 0.15;
            }

            this.draw(fillColour);
        }
        draw(pFillColour) {
            this.mObject.getDrawableObject().setFillColour(pFillColour);
        }
    }