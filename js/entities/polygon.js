class Polygon {
        constructor(pFillColour, pStrokeColour, pLineThickness, pLineJoin, pVectors, pNumberSegments, pRadius) {
        
        this.setFillColour(pFillColour);
        this.setStrokeColour(pStrokeColour);
        this.mLineThickness = pLineThickness;
        this.mLineJoin = pLineJoin;
        
        this.mVectors = pVectors;  

        this.mNumberSegments = pNumberSegments;
        this.setRadius(pRadius);

        this.mCenterX = 0;
        this.mCenterY = 0;
    
    }
    getVectorAtIndex(pIndex) {
        return this.mVectors[pIndex];
    }
    setFillColour(pFillColour){
        this.mFillColour = pFillColour;
    }
    setStrokeColour(pStrokeColour){
        this.mStrokeColour = pStrokeColour;
    }
    getStrokeColour(){
        return this.mStrokeColour;
    }
    setLineWidth(pLineThickness){
        this.mLineThickness = pLineThickness;
    }
    getLineWidth(){
        return this.mLineThickness;
    }

    getRadius(){
        return this.mRadius;
    }
    setRadius(pRadius){
         this.mRadius = pRadius;
    }
 
    draw(pContext) {
        pContext.beginPath();
        //
        if(this.mVectors == null){
            this.drawRegularPolygon(pContext);
        }
        else {
            this.drawIrregularPolygon(pContext);
        }
        //
        pContext.closePath();

        if(this.mFillColour != null) {
            pContext.fillStyle = this.mFillColour;

            pContext.fill();
        }
        if(this.mStrokeColour != null) {
            pContext.strokeStyle = this.mStrokeColour;
            pContext.lineWidth = this.mLineThickness;
            pContext.lineJoin = this.mLineJoin;
    
            pContext.stroke(); 
        }
    }

    drawRegularPolygon(pContext) {
        var i, x, y, angle, anglePerSegment;
  
        // numSegments determines the shape of our polygon
        anglePerSegment = Math.PI * 2 / this.mNumberSegments; 

        for (i = 0; i <= this.mNumberSegments; i = i + 1) {

            angle = anglePerSegment * i;
            x = this.mCenterX + this.getRadius() * Math.cos(angle);
            y = this.mCenterY + this.getRadius() * Math.sin(angle);

            if (i == 0) {
                pContext.moveTo(x,y);
            }
            else {
                pContext.lineTo(x,y);
            }
        }
    }

    drawIrregularPolygon(pContext){
        this.mVectors.forEach(vector => pContext.lineTo(vector.getX(), vector.getY()));
    }
}