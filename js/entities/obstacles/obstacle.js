class Obstacle extends Entity {
    constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity) { 
        super(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration, pVelocity)

        this.setVelocity(pVelocity);
        this.setSpeed(30);

        this.collectForces();
    }  
    setIsDestroyed(pIsDestroyed){
        this.mIsDestroyed = pIsDestroyed;
    }
    getIsDestroyed(){
        return this.mIsDestroyed;
    }

    update(pDeltaTime) {

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