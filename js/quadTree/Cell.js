class Cell{
    constructor(pTag, pPosition, pWidth, pHeight){
        this.mTag = pTag;
        this.mPosition = pPosition;
        this.mWidth = pWidth;
        this.mHeight = pHeight;
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

    intersects(pRange) {
        let x, y, width, height;

        x = pRange.getPosition().getX();
        y = pRange.getPosition().getY();
        // To implement in Entity
        width = pRange.getWidth();
        height = pRange.getHeight();

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