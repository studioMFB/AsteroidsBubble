// BIBLIOGRAPHY
//
// Nystrom, R., (2014). Spatial Partition. 
// [online] Gameprogrammingpatterns.com. Available at: <https://gameprogrammingpatterns.com/spatial-partition.html> [Accessed 21 December 2020].
//
// Petersen, A., (2012). Broad Phase Collision Detection Using Spatial Partitioning. 
// [online] Buildnewgames.com. Available at: <http://buildnewgames.com/broad-phase-collision-detection/> [Accessed 21 December 2020].
//
// Shiffman, D., (2018). Coding Challenge #98.1: Quadratic Tree - Part1. 
// [video] Available at: <https://www.youtube.com/watch?v=OJxEcs0w_kE> [Accessed 21 December 2020].
// 

class QuadTree {
    constructor(pTag, pCell, pMasterRootSceneGraphNode){
    //constructor(pTag, pPosition, pWidth, pHeight, pMasterRootSceneGraphNode){
        this.mTag = pTag;
        //this.mPosition = pPosition;
        //this.mWidth = pWidth;
        //this.mHeight = pHeight;
        this.mCell = pCell;
        this.mMasterRootSceneGraphNode = pMasterRootSceneGraphNode;
        this.mCapacity = 5;
        this.mEntities = [];
        this.mSplited = false;
        this.mIndex = 1;

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

    getIsKeySPressed() {
        return this.mSPressed;
    }

    initialiseSceneGraph() {
        let translationMatrix, translationSceneGraphNode;

        translationMatrix = Matrix.createTranslation(this.mCell.getPosition());
        translationSceneGraphNode = new TransformNode(this.mCell.getTag(), translationMatrix);

        //rect(
        //this.mCell.getX(),
        //this.mCell.getY(),
        //this.mCell.getCellWidth() * 2,
        //this.mCell.getCellHeight() * 2
        //);
        let vectorsObject = [];
        vectorsObject[0] = new Vector(this.mCell.getPosition().getX() - this.mCell.getWidth(), this.mCell.getPosition().getY() - this.mCell.getHeight(), 1);
        vectorsObject[1] = new Vector(this.mCell.getPosition().getX() + this.mCell.getWidth(), this.mCell.getPosition().getY() - this.mCell.getHeight(), 1);
        vectorsObject[2] = new Vector(this.mCell.getPosition().getX() + this.mCell.getWidth(), this.mCell.getPosition().getY() + this.mCell.getHeight(), 1);
        vectorsObject[3] = new Vector(this.mCell.getPosition().getX() - this.mCell.getWidth(), this.mCell.getPosition().getY() + this.mCell.getHeight(), 1);
        //this.mObject = new GeometryNode(this.getTag(), new Polygon(null, "yellow", 5, null, vectorsObject));
        this.mObject = new GeometryNode(this.mCell.getTag(), new Polygon(null, "yellow", 1, null, null, 4, this.mCell.getWidth() / 2)); // Only one dimension is needed for a square, divided by 2 to get the radius
        translationSceneGraphNode.addChild(this.mObject);
        
        this.setRootSceneGraphNode(translationSceneGraphNode);
    }
   /*
   initialiseSceneGraph() {
    let translationMatrix, translationSceneGraphNode;

    translationMatrix = Matrix.createTranslation(this.mPosition);
    translationSceneGraphNode = new TransformNode(this.mTag, translationMatrix);

    //constructor(pTag, pPosition, pWidth, pHeight){
    let tag = "Cell" + this.mIndex;
    this.mCell = new Cell(tag, this.mPosition, this.mWidth, this.mHeight);
    this.mIndex += 1;
    translationSceneGraphNode.addChild(this.mCell.getRootSceneGraphNode());
    
    this.setRootSceneGraphNode(translationSceneGraphNode);
    }
    */

    update(pContext){
        let fillColour;

        if(this.getIsKeySPressed()){
            fillColour = "yellow";
        }
        else{
            fillColour = null;
        }

        fillColour = "yellow"; // To TEST TILL I ADD S KEY
        //this.draw(pContext, fillColour);

        /*
        if (this.mSplited) {
        this.mNorthEast.update(pContext);
        this.mNorthWest.update(pContext);
        this.mSouthEast.update(pContext);
        this.mSouthWest.update(pContext);
        }
        */
        /*
        if(this.mNorthEast){
            this.mNorthEast.update(pContext);
        }
        if(this.mNorthWest){
            this.mNorthWest.update(pContext);
        }
        if(this.mSouthEast){
            this.mSouthEast.update(pContext);
        }
        if(this.mSouthWest){
            this.mSouthWest.update(pContext);
        }
        */
    }

    draw(pContext) {

        //this.mObject.getDrawableObject().setStrokeColour(pFillColour);

        /*
        let vectorsObject = [];
        vectorsObject[0] = new Vector(this.mCell.getPosition().getX() - this.mCell.getWidth(), this.mCell.getPosition().getY() - this.mCell.getHeight(), 1);
        vectorsObject[1] = new Vector(this.mCell.getPosition().getX() + this.mCell.getWidth(), this.mCell.getPosition().getY() - this.mCell.getHeight(), 1);
        vectorsObject[2] = new Vector(this.mCell.getPosition().getX() + this.mCell.getWidth(), this.mCell.getPosition().getY() + this.mCell.getHeight(), 1);
        vectorsObject[3] = new Vector(this.mCell.getPosition().getX() - this.mCell.getWidth(), this.mCell.getPosition().getY() + this.mCell.getHeight(), 1);

        pContext.beginPath();
        vectorsObject.forEach(vector => pContext.lineTo(vector.getX(), vector.getY()));
        pContext.closePath();
        pContext.strokeStyle = "yellow";
        pContext.lineWidth = 1;
        pContext.stroke(); 

        if (this.mSplited) {
            this.mNorthEast.draw(pContext);
            this.mNorthWest.draw(pContext);
            this.mSouthEast.draw(pContext);
            this.mSouthWest.draw(pContext);
        }
        */
    }
    /*
    draw() {

        let squareCell = new GeometryNode(this.mCell.getTag(), new Polygon(null, "yellow", 1, null, null, 4, this.mCell.getWidth() / 2));
        if (this.mSplited) {
            this.mNorthEast.draw();
            this.mNorthWest.draw();
            this.mSuthEast.draw();
            this.mSouthWest.draw();
        }
    }
    */

    splitInFour() {
        let x, y, width, height, position;
        let northEast, northWest, southEast, southWest;

        x = this.mCell.getPosition().getX();
        y = this.mCell.getPosition().getY();
        //width = this.getWidth() /2;
        //height = this.getHeight() /2;
        width = this.mCell.getWidth() /2;
        height = this.mCell.getHeight() /2;

        // Cells organised by cardinals position: North, South, West, East
        // in the Canvas and in regards to each others 
        position = new Vector(x + width, y - height, 1);
        northEast = new Cell("Cell_NE", position, width, height);
        this.mNorthEast = new QuadTree("QuadTree_NE", northEast, this.mMasterRootSceneGraphNode);
        //this.mNorthEast = new QuadTree("QuadTree_NE", position, width, height, this.mMasterRootSceneGraphNode);
        this.mMasterRootSceneGraphNode.addChild(this.mNorthEast.getRootSceneGraphNode());

        position = new Vector(x - width, y - height, 1);
        northWest = new Cell("Cell_NW", position, width, height);
        this.mNorthWest = new QuadTree("QuadTree_NW", northWest, this.mMasterRootSceneGraphNode);
        //this.mNorthWest = new QuadTree("QuadTree_NW", position, width, height, this.mMasterRootSceneGraphNode);
        this.mMasterRootSceneGraphNode.addChild(this.mNorthWest.getRootSceneGraphNode());

        position = new Vector(x + width, y + height, 1);
        southEast = new Cell("Cell_SE", position, width, height);
        this.mSouthEast = new QuadTree("QuadTree_SE", southEast, this.mMasterRootSceneGraphNode);
        //this.mSouthEast = new QuadTree("QuadTree_SE", position, width, height, this.mMasterRootSceneGraphNode);
        this.mMasterRootSceneGraphNode.addChild(this.mSouthEast.getRootSceneGraphNode());

        position = new Vector(x - width, y + height, 1);
        southWest = new Cell("Cell_SW", position, width, height);
        this.mSouthWest = new QuadTree("QuadTree_SW", southWest, this.mMasterRootSceneGraphNode);
        //this.mSouthWest = new QuadTree("QuadTree_SW", position, width, height, this.mMasterRootSceneGraphNode);
        this.mMasterRootSceneGraphNode.addChild(this.mSouthWest.getRootSceneGraphNode());

        this.mSplited = true;
    }

    insert(pObject) {
        // This function works recursivly 
        // by inserting the object to one of the four Cells
        // If Cell is full
        // split Cell in 4 and try inserting object

        if (!this.mCell.contains(pObject)) {
          return false;
        }
        else if (this.mEntities.length < this.mCapacity) {
            this.mEntities.push(pObject);
            return true;
        } 

        else {
            if (!this.mSplited) {
                this.splitInFour();
            }
            // If Entity is over 2 Cells, 
            // this algorithm favourites North over South and East over West
            if (this.mNorthEast.insert(pObject)) {
                return true;
            } 
            else if (this.mNorthWest.insert(pObject)) {
                return true;
            } 
            else if (this.mSouthEast.insert(pObject)) {
                return true;
            } 
            else if (this.mSouthWest.insert(pObject)) {
                return true;
            }
        }
    }

    query(pCell, pDiscoveredEntities) {

        if (!pDiscoveredEntities) {
            pDiscoveredEntities = [];
        }
        if (!this.mCell.intersects(pCell)) {
            return null;
        } 
        else {
            for(let i = 0; i < this.mEntities.length; i++) {
                if (pCell.contains(this.mEntities[i])) {
                    pDiscoveredEntities.push(this.mEntities[i]);
                }
            }
            if (this.mSplited) {
                this.mNorthWest.query(pCell, pDiscoveredEntities);
                this.mNorthEast.query(pCell, pDiscoveredEntities);
                this.mSouthWest.query(pCell, pDiscoveredEntities);
                this.mSouthEast.query(pCell, pDiscoveredEntities);
            }
        }
        return pDiscoveredEntities;
    }


}