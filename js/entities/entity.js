class Entity {
        constructor(pCanvas, pTag, pPosition, pRotation, pMass, pForce, pAcceleration) { 
            this.mCanvas = pCanvas;
            this.mTag = pTag;    
            this.mPosition = pPosition;
            this.mRotation = pRotation;  
            this.mMass = pMass;
            this.mForce = pForce;
            this.mAcceleration = pAcceleration;
            this.mDrag = new Vector(1, 1, 1);
        }
        setTag(pTag){
            this.mTag = pTag;
        }
        getTag(){
            return this.mTag;
        }

        // SCENEGRAPH NODE
        setRootSceneGraphNode(pRootSceneGraphNode) {
            this.mRootSceneGraphNode = pRootSceneGraphNode;
        }
        getRootSceneGraphNode() {
            return this.mRootSceneGraphNode;
        }
        setRotationSceneGraphNode(pRotationSceneGraphNode){
            this.mRotationSceneGraphNode = pRotationSceneGraphNode;
        }
        getRotationSceneGraphNode(){
            return this.mRotationSceneGraphNode;
        }

        // DRAWABLE OBJECT
        setObject(pObject){
            this.mObject = pObject;
        }
        getObject(){
            return this.mObject;
        }
        setVectorsObject(pVectorsObject){
            this.mVectorsObject = pVectorsObject;
        }
        getVectorsObject(){
            return this.mVectorsObject;
        }
        // ARRAY OBJECTS
        setArray(pArrayObjects) {
            this.mArrayObjects = pArrayObjects;
        }
        pushArrayObject(pArrayObject) {
            this.mArrayObjects.push(pArrayObject);
        } 
        spliceArrayObjectsAt(pIndex) {
            return this.mArrayObjects.splice(pIndex, 1);
        } 

        // DEBUGG KEY
        static setIsDPressed(pDPressed) {
            this.mDPressed = pDPressed;
        }
        static getIsDPressed() {
            return this.mDPressed;
        }

        // BOUNDARY BOX
        setBoundaryBox(pBoundaryBox){
            this.mBoundaryBox = pBoundaryBox;
        }
        getBoundaryBox(){
            return this.mBoundaryBox;
        }
        setBoundaryBoxDepth(pDepth){
            this.mDepth = pDepth;
        }
 
        // POSITION
        setPosition(pPosition) {
            this.mPosition = pPosition;
        }
        getPosition() {
            return this.mPosition;
        }

        // ROTATION
        setRotation(pRotation) {
            this.mRotation = pRotation;
        }
        getRotation() {
            return this.mRotation;
        }
        setRotationRate(pRotationRate) {
            this.mRotationRate = pRotationRate;
        }
        getRotationRate() {
            return this.mRotationRate;
        }
        setRotationDirection(pRotationDirection) {
            this.mRotationDirection = pRotationDirection;
        }
        getRotationDirection() {
            return this.mRotationDirection;
        }

        // SCALE
        setScale(pScale) {
            this.mScale = pScale;
        }
        getScale() {
            return this.mScale;
        }
        setScaleRate(pScaleRate) {
            this.mScaleRate = pScaleRate;
        }
        getScaleRate() {
            return this.mScaleRate;
        }

        // CIRCLE RADIUS
        setRadius(pRadius){
            this.mRadius = pRadius;
        }
        getRadius(){
            return this.mRadius;
        }
        getMaxRadius(){
            return this.mMaxRadius;
        }
        getMinRadius(){
            return this.mMinRadius;
        }

        // FORCES
        setVelocity(pVelocity) {
            this.mVelocity = pVelocity;
        }
        getVelocity() {
            return this.mVelocity;
        }
        setSpeed(pSpeed){
            this.mSpeed = pSpeed;
        }
        getSpeed(){
           return this.mSpeed;
        }
        setAcceleration(pAcceleration) {
            this.mAcceleration = pAcceleration;
        }
        getAcceleration() {
            return this.mAcceleration;
        }
        setMass(pMass) {
            this.mMass = pMass;
        }
        getMass() {
            return this.mMass;
        }
        getGravity() {
            return this.mGravity;
        }
        getDensity() {
            return this.mDensity;
        }
        setForce(pForce) {
            this.mForce = pForce;
        }
        getForce() {
            return this.mForce;
        }
        
        // DRAG & FRICTION
        setDragCoeff1(pDragCoeff1) {
            this.mDragCoeff1 = pDragCoeff1;
        }  
        getDragCoeff1() {
            return this.mDragCoeff1;
        }  
        setDragCoeff2(pDragCoeff2) {
            this.mDragCoeff2 = pDragCoeff2;
        } 
        getDragCoeff2() {
            return this.mDragCoeff2;
        } 
        setDrag(pDrag) {
            this.mDrag = pDrag;
        }
        getDrag() {
            return this.mDrag;
        }
        setFriction(pFriction) {
            this.mFriction = pFriction;
        }
        getFriction() {
            return this.mFriction;
        }

        // TIMER
        setFlashingTimer(pFlashingTimer) {
            this.mFlashingTimer = pFlashingTimer;
        }
        getFlashingTimer() {
            return this.mFlashingTimer;
        }
        
        // COLLISION
        setIsCollision(pIsCollision){
            this.mIsCollision = pIsCollision;
        }
        getIsCollision(){
            return this.mIsCollision;
        }


        initialiseSceneGraph() {
        }

        update(pDeltaTime) {
            this.calculateAcceleration(this.getGravity());
            this.calculateDrag();
            this.collectForces(this.getEntityHeight());
            this.updateVelocity(pDeltaTime);
            this.updatePosition(pDeltaTime);
        }
        
        draw() {
        }

        calculateAcceleration(pGravity) {
            // acceleration = set of forces in Newtons / Mass in Kilograms
            this.setAcceleration(this.getForce().divide(this.getMass()));

            if(pGravity != null) {
                // Gravity is a down force
                this.getAcceleration().getY() - this.getGravity();
            }
        }

        calculateDrag(){
            // -Acceleration is opposite force
            let toMultiply = (Math.pow(this.getDragCoeff1(), 2 )) + Math.pow(this.getDragCoeff2(), 2 );
            let toSet = this.getAcceleration().multiply(toMultiply)
            this.setDrag(toSet);
        }

        collectForces() {
            // 0- calculate Force
            this.getForce().setX( (this.getMass() *  Math.sin(this.getRotation()) * this.getSpeed()) );
            this.getForce().setY( -(this.getMass() *  Math.cos(this.getRotation()) * this.getSpeed()) );

            // If drag, add it to Force
            if(this.getDrag() != null) {
               this.setForce(this.getForce().add(this.getDrag()));
            }
        
        }
        updateVelocity(pDeltaTime){
            let newVelocityDelta, averageVelocity;
    
            // 1- calculate Acceleration
            this.setAcceleration(this.getForce().divide(this.getMass()));
            // 2- v1 = v0 + a*t
            newVelocityDelta = this.getVelocity().add(this.getAcceleration().multiply(pDeltaTime));
            // 3- claculate average velocity for the improved Euler integration
            averageVelocity = (this.getVelocity().add(newVelocityDelta)).divide(2);
            this.setVelocity(averageVelocity);
        }

        addFrictionToVelocity() {
            this.setVelocity(this.getVelocity().multiply(this.getFriction()));
        }

        updatePosition(pDeltaTime) {
            let newPosition, translationMatrix;
    
            GameManager.ifPositionOffCanvas(this.mCanvas, this);
            // 4- calculate new position - x1 = x0 + v*t.  
            newPosition = this.getPosition().add(this.getVelocity().multiply(pDeltaTime));
            this.setPosition(newPosition);
    
            translationMatrix = Matrix.createTranslation(this.getPosition());
            this.getRootSceneGraphNode().setTransform(translationMatrix);
        }
    
        rotateLeft(pDeltaTime) {
            let rotationMatrix, rotationRateDelta, newRotation
    
            rotationRateDelta = -this.getRotationRate() * pDeltaTime;
            newRotation = this.getRotation() + rotationRateDelta;
            this.setRotation(newRotation);
    
            rotationMatrix = Matrix.createRotation(this.getRotation());
    
            this.getRotationSceneGraphNode().setTransform(rotationMatrix);
        }
        rotateRight(pDeltaTime) {
            let rotationMatrix, rotationRateDelta, newRotation
    
            rotationRateDelta = this.getRotationRate() * pDeltaTime;
            newRotation = this.getRotation() + rotationRateDelta;
            this.setRotation(newRotation);
    
            rotationMatrix = Matrix.createRotation(this.getRotation());
            this.getRotationSceneGraphNode().setTransform(rotationMatrix);
        }

        updateScale(pDeltaTime){
            let scaleMatrix, scaleRate, newScale;
    
            scaleRate = this.getScaleRate().multiply(pDeltaTime);

            newScale = this.getScale().add(scaleRate);
            this.setScale(newScale);

            scaleMatrix = Matrix.createScale(this.getScale());
            this.mScaleSceneGraphNode.setTransform(scaleMatrix);
        }

        updateRadius(pDeltaTime){
            let radiusDelta, indexDelta;
    
            indexDelta = 1 + pDeltaTime;
            radiusDelta = this.getRadius() * indexDelta;
            this.setRadius(radiusDelta);

            this.getObject().getDrawableObject().setRadius(radiusDelta);
        }
    }