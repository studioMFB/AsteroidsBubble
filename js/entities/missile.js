class Missile extends Entity {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration)

        this.setVelocity(new Vector(0, 0, 1));
        this.setFriction(1);
        this.setFlashingTimer(0.15);
        this.setEnergyTimer(2);
        this.setRadius(2);
        this.setSpeed(600);

        this.initialiseSceneGraph(); 

        this.collectForces();
    }

    initialiseSceneGraph() {
        let translationMatrix, translationSceneGraphNode, rotationMatrix, rotationSceneGraphNode;

        translationMatrix = Matrix.createTranslation(this.getPosition());
        translationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);

        rotationMatrix = Matrix.createRotation(this.getRotation());
        rotationSceneGraphNode = new TransformNode(this.getTag(), rotationMatrix);
        translationSceneGraphNode.addChild(rotationSceneGraphNode);

        this.mObject = new GeometryNode(this.getTag(), new Polygon(null, "#FFFFFF", 0.95, null, null, 18, this.getRadius()));

        rotationSceneGraphNode.addChild(this.mObject);

        this.setRootSceneGraphNode(translationSceneGraphNode);
    } 
    getIsMissileOutOfEnergy() {
        return this.mMissileOut;
    }
    setIsMissileOutOfEnergy(pMissileOut) {
        this.mMissileOut = pMissileOut;
    }
    setEnergyTimer(pEnergyTimer) {
        this.mEnergyTimer = pEnergyTimer;
    }
    getEnergyTimer() {
        return this.mEnergyTimer;
    }

    update(pDeltaTime) {
        let strokeColour;
        
        this.setEnergyTimer(this.getEnergyTimer() - pDeltaTime);
        this.setFlashingTimer(this.getFlashingTimer() - pDeltaTime);

        if (this.getEnergyTimer() < 0){
            strokeColour = null;
            this.setIsMissileOutOfEnergy(true);
        }
        else
        {
        if(this.getFlashingTimer() > 0.075) {
            strokeColour = "#FFFFFF";
        }
        else if (this.getFlashingTimer() > 0){
           strokeColour = null;
        }
        else {
            this.setFlashingTimer(0.15);
        }

        this.updateVelocity(pDeltaTime);
        }
        this.updatePosition(pDeltaTime);
        this.draw(strokeColour);
    }

    draw(pStrokeColour) {
        this.mObject.getDrawableObject().setStrokeColour(pStrokeColour);
    }
}