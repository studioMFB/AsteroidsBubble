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
    constructor(pTag, pCell){
        this.mTag = pTag;
        this.mCell = pCell;

        this.mCapacity = 4;
        this.mEntities = [];
        this.mSplited = false;
    }
    getTag(){
        return this.mTag;
    }

    getIsKeySPressed() {
        return this.mSPressed;
    }

    update(pContext){
        let fillColour;

        if(this.getIsKeySPressed()){
            fillColour = "yellow";
        }
        else{
            fillColour = null;
        }

        fillColour = "yellow"; // To TEST TILL I ADD S KEY
        
        this.draw(pContext, fillColour);
    }

    draw(pContext, pFillColour) {

        if(pFillColour == null){
            pFillColour = "yellow";
        }
        
        let vectorsObject = [];
        vectorsObject[0] = new Vector(this.mCell.getPosition().getX() - this.mCell.getWidth(), this.mCell.getPosition().getY() - this.mCell.getHeight(), 1);
        vectorsObject[1] = new Vector(this.mCell.getPosition().getX() + this.mCell.getWidth(), this.mCell.getPosition().getY() - this.mCell.getHeight(), 1);
        vectorsObject[2] = new Vector(this.mCell.getPosition().getX() + this.mCell.getWidth(), this.mCell.getPosition().getY() + this.mCell.getHeight(), 1);
        vectorsObject[3] = new Vector(this.mCell.getPosition().getX() - this.mCell.getWidth(), this.mCell.getPosition().getY() + this.mCell.getHeight(), 1);
        
        pContext.beginPath();
        vectorsObject.forEach(vector => pContext.lineTo(vector.getX(), vector.getY()));
        //pContext.rect(this.mCell.getPosition().getX(), this.mCell.getPosition().getY(), this.mCell.getWidth(), this.mCell.getHeight());
        pContext.closePath();
        pContext.strokeStyle = pFillColour;
        pContext.lineWidth = 1;
        pContext.stroke(); 
        
        if (this.mSplited) {
            this.mNorthEast.draw(pContext, pFillColour);
            this.mNorthWest.draw(pContext, pFillColour);
            this.mSouthEast.draw(pContext, pFillColour);
            this.mSouthWest.draw(pContext, pFillColour);
        }
        
    }
  
    splitInFour() {
        let x, y, width, height, position;
        let northEast, northWest, southEast, southWest;

        //x = this.mCell.getPosition().getX() -200; // ?
        x = this.mCell.getPosition().getX(); 
        y = this.mCell.getPosition().getY();
        width = this.mCell.getWidth() /2;
        height = this.mCell.getHeight() /2; 

        // Cells organised by cardinals position: North, South, West, East
        // in the Canvas and in regards to each others 
        position = new Vector(x + width, y - height, 1);
        northEast = new Cell("Cell_NE", position, width, height);
        this.mNorthEast = new QuadTree("QuadTree_NE", northEast);

        position = new Vector(x - width, y - height, 1);
        northWest = new Cell("Cell_NW", position, width, height);
        this.mNorthWest = new QuadTree("QuadTree_NW", northWest);

        position = new Vector(x + width, y + height, 1);
        southEast = new Cell("Cell_SE", position, width, height);
        this.mSouthEast = new QuadTree("QuadTree_SE", southEast);

        position = new Vector(x - width, y + height, 1);
        southWest = new Cell("Cell_SW", position, width, height);
        this.mSouthWest = new QuadTree("QuadTree_SW", southWest);

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