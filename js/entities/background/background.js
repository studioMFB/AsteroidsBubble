class Background {
    constructor(pCanvas, pContext, pTag, pPosition) {
        this.mTag = pTag;
        this.mCanvas = pCanvas;
        this.mContext = pContext;

        this.setPosition(pPosition);
        this.initialiseSceneGraph();
    }
    getRootSceneGraphNode() {
        return this.mRootSceneGraphNode;
    }
    setRootSceneGraphNode(pRootSceneGraphNode) {
        this.mRootSceneGraphNode = pRootSceneGraphNode;
    }
    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    initialiseSceneGraph() {
        let index, numberOfStars, maxRandomValue, translationSceneGraphNode, translationMatrix,
        rotationSceneGraphNode, rotationMatrix, scaleSceneGraphNode, scaleMatrix;
               
        translationMatrix = Matrix.createTranslation(this.getPosition());
        translationSceneGraphNode = new TransformNode(this.mTag, translationMatrix);

        rotationMatrix = Matrix.createRotation(Math.PI/4);
        rotationSceneGraphNode = new TransformNode(this.mTag, rotationMatrix);
        translationSceneGraphNode.addChild(rotationSceneGraphNode);

        scaleMatrix = Matrix.createScale(new Vector(2, 2, 1));
        scaleSceneGraphNode = new TransformNode(this.mTag, scaleMatrix);
        rotationSceneGraphNode.addChild(scaleSceneGraphNode);

        this.mBackRectangle = new GeometryNode(this.mTag, new Polygon( "#345789", null, null, null, null, 4 , 290));
        scaleSceneGraphNode.addChild(this.mBackRectangle);

        let starTranslationMatrix = Matrix.createTranslation(new Vector(-550,-450, 1)); // To allow ShootingStars to live outside the canvas
        let starTranslationSceneGraphNode = new TransformNode(this.mTag, starTranslationMatrix);
        translationSceneGraphNode.addChild(starTranslationSceneGraphNode);

        this.mShootingStars = [];
        numberOfStars = 30;
        maxRandomValue = 3000;
        for(index = 0; index < numberOfStars; index += 1) {
            let x = Math.floor(Math.random() * maxRandomValue); 
            let y = Math.floor(Math.random() * maxRandomValue);       
         
            let shootingstar = new ShootingStar(this.mCanvas, "ShootingStars", index, maxRandomValue, new Vector(x, y, 1), (Math.PI / 3), new Vector(50, 50, 1));

            this.mShootingStars.push(shootingstar);
            starTranslationSceneGraphNode.addChild(shootingstar.getRootSceneGraphNode());
        }

            this.setRootSceneGraphNode(translationSceneGraphNode);
    }

    update(pDeltaTime) {
        for(let index = 0; index < this.mShootingStars.length; index += 1) {
            this.mShootingStars[index].setIndex(index);
            this.mShootingStars[index].update(pDeltaTime);
        }
    }
}
   


