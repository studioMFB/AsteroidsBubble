class Cell{
    constructor(pTag, pPosition, pWidth, pHeight){
        this.mTag = pTag;
        this.mPosition = pPosition;
        this.mWidth = pWidth;
        this.mHeight = pHeight;

        this.initialiseSceneGraph();
    }

    getTag(){
        return this.mTag;
    }
    
    setRootSceneGraphNode(pRootSceneGraphNode) {
        this.mRootSceneGraphNode = pRootSceneGraphNode;
    }
    getRootSceneGraphNode() {
        return this.mRootSceneGraphNode;
    }

    getPosition(){
        return this.mPosition;
    }
    // Only 1 dimension is necessary for a square
    // But inCase I'll need a rectangle
    getWidth(){
        return this.mWidth;
    }
    getHeight(){
        return this.mHeight;
    }

    
    initialiseSceneGraph() {
        let translationMatrix, translationSceneGraphNode;

        translationMatrix = Matrix.createTranslation(this.getPosition());
        translationSceneGraphNode = new TransformNode(this.getTag(), translationMatrix);

        let vectorsObject = [];
        vectorsObject[0] = new Vector(this.getPosition().getX() - this.getWidth(), this.getPosition().getY() - this.getHeight(), 1);
        vectorsObject[1] = new Vector(this.getPosition().getX() + this.getWidth(), this.getPosition().getY() - this.getHeight(), 1);
        vectorsObject[2] = new Vector(this.getPosition().getX() + this.getWidth(), this.getPosition().getY() + this.getHeight(), 1);
        vectorsObject[3] = new Vector(this.getPosition().getX() - this.getWidth(), this.getPosition().getY() + this.getHeight(), 1);
        this.mObject = new GeometryNode(this.getTag(), new Polygon(null, "black", 5, null, vectorsObject));

        //this.mObject = new GeometryNode(this.mCell.getTag(), new Polygon(null, "yellow", 1, null, null, 4, this.mCell.getWidth() / 2)); // Only one dimension is needed for a square, divided by 2 to get the radius
        translationSceneGraphNode.addChild(this.mObject);
        
        this.setRootSceneGraphNode(translationSceneGraphNode);
    }

    contains(pObject){
        let x, y

        x = pObject.getPosition().getX();
        y = pObject.getPosition().getY();

        if(x >= this.getPosition().getX() - this.mWidth &&
            x < this.getPosition().getX() + this.mWidth &&
            y >= this.getPosition().getY() - this.mHeight &&
            y < this.getPosition().getY() + this.mHeight){
            return true;
        }
        else{
            return false;
        }
    }

    intersects(pCell) {
        let x, y, width, height;

        x = pCell.getPosition().getX();
        y = pCell.getPosition().getY();
        // To implement in Entity
        width = pCell.getWidth();
        height = pCell.getHeight();

        if(x + width < this.getPosition().getX() - this.mWidth ||
            x - width > this.getPosition().getX() + this.mWidth ||
            y + height < this.getPosition().getY() - this.mHeight ||
            y - height > this.getPosition().getY() + this.mHeight){
            return true;
        }
        else{
            return false;
        }
    }

}