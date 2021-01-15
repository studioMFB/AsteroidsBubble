class GameManager {

    static writeScore(pCanvas, pContext, pScore){
        //pContext.beginPath();
        pContext.font = "50px Arial";
        pContext.fillStyle = "#FFFFFF";
        //pContext.closePath();
        pContext.fillText(pScore, pCanvas.width/2, pCanvas.height/2);
    }

    static ifPositionOffCanvas(pCanvas, pObject) {
        if (pObject.getPosition().getX() < -pCanvas.width/2) {
            pObject.getPosition().setX(pCanvas.width/2);
        }
        else if (pObject.getPosition().getX() > pCanvas.width/2) {
            pObject.getPosition().setX(-pCanvas.width/2);
        }
        if (pObject.getPosition().getY() < -pCanvas.height/2) {
            pObject.getPosition().setY(pCanvas.height/2);
        }
        else if (pObject.getPosition().getY() > pCanvas.height/2) {
            pObject.getPosition().setY(-pCanvas.height/2);
        }
    }

    static calculateDistancePoints(pPoint1, pPoint2) {
        let distance = pPoint1.subtract(pPoint2);
        return distance.magnitude();
    }

    static circlesCollisionDetection(pCircle1, pCircle2){
        let vectorDirection, circlesRadiusSum;

        circlesRadiusSum = pCircle1.getRadius() + pCircle2.getRadius();
        vectorDirection = pCircle1.getPosition().subtract(pCircle2.getPosition());

        if (vectorDirection.magnitude() <= circlesRadiusSum) {
           return true;
        }
        else {
            return false;
        }
    }
    static circlesCollisionResponse(pCircle1, pCircle2){
        let vectorDirection, circlesRadiusSum;
        let vectorDirectionUnit, vDotN, newVelocity, newVelocityX, newVelocityY;

        circlesRadiusSum = pCircle1.getRadius() + pCircle2.getRadius();
        vectorDirection = pCircle1.getPosition().subtract(pCircle2.getPosition());

        // normalise the distance between the 2 circles
        vectorDirectionUnit = vectorDirection.normalise();

        // Stops circles from overlaping
        const lineThiknessCircle = 1;
        // const lineThiknessCircle = pCircle1.getDrawableObject().setFillColour(pFillColour); // create getter for line thickness
        pCircle1.getPosition().setX(pCircle2.getPosition().getX() + (circlesRadiusSum + lineThiknessCircle) * vectorDirectionUnit.getX());
        pCircle1.getPosition().setY(pCircle2.getPosition().getY() + (circlesRadiusSum + lineThiknessCircle) * vectorDirectionUnit.getY());
               
        // Collision response
        // newV = v - 2 (v.n) n
        const e = 0.9999; // e ranges from 0 to 1. From not bouncy at all to very bouncy

        vDotN = pCircle1.getVelocity().dotProduct(vectorDirectionUnit);
        newVelocityX = pCircle1.getVelocity().getX() - (2 * e) *  vDotN * vectorDirectionUnit.getX();
        newVelocityY = pCircle1.getVelocity().getY() - (2 * e) *  vDotN * vectorDirectionUnit.getY();
        newVelocity = new Vector(newVelocityX, newVelocityY, 1);
        pCircle1.setVelocity(newVelocity);

        vDotN = pCircle2.getVelocity().dotProduct(vectorDirectionUnit);
        newVelocityX = pCircle2.getVelocity().getX() - (2 * e) *  vDotN * vectorDirectionUnit.getX();
        newVelocityY = pCircle2.getVelocity().getY() - (2 * e) *  vDotN * vectorDirectionUnit.getY();
        newVelocity = new Vector(newVelocityX, newVelocityY, 1);
        pCircle2.setVelocity(newVelocity);
    }

    static segmentCircleCollisionDetection(pSegment, pCircle){
        let segmentPointA, segmentPointB, segmentPointC, segmentAB, segmentAC, distanceSegmentToCircle;
        let closestPointToCircle;
        let acDotab, abMagnitude;
        let projectedScalar, vectorOverMagnitude, projectedVector;

        segmentPointA = pSegment.getVectorsObject()[0].add(pSegment.getPosition());
        segmentPointB = pSegment.getVectorsObject()[1].add(pSegment.getPosition());
        segmentPointC = pCircle.getPosition();

        segmentAB = segmentPointB.subtract(segmentPointA);
        segmentAC = segmentPointC.subtract(segmentPointA);

        acDotab = segmentAC.dotProduct(segmentAB);
        abMagnitude = segmentAB.magnitude();
        projectedScalar = acDotab / abMagnitude; 

        vectorOverMagnitude = segmentAB.divide(abMagnitude);
        projectedVector = vectorOverMagnitude.multiply(projectedScalar);

        if(projectedScalar <= 0){
            closestPointToCircle = segmentPointA;
        }
        else if(projectedScalar >= abMagnitude){
            closestPointToCircle = segmentPointB;
        }
        else{
            closestPointToCircle = segmentPointA.add(projectedVector);
        }

        distanceSegmentToCircle = this.calculateDistancePoints(closestPointToCircle, pCircle.getPosition());

        if(distanceSegmentToCircle < pCircle.getRadius()){
            return true;
        }
        else{
            return false;
        }
    }
    static segmentCircleCollisionResponse(pCircle1){
        let vectorDirectionUnit, vDotN, newVelocity, newVelocityX, newVelocityY;

        vectorDirectionUnit = pCircle1.getPosition().normalise();
        // newV = v - 2 (v.n) n
        const e = 0.9999; // e ranges from 0 to 1. From not bouncy at all to very bouncy

        vDotN = pCircle1.getVelocity().dotProduct(vectorDirectionUnit);
        newVelocityX = pCircle1.getVelocity().getX() - (2 * e) *  vDotN * vectorDirectionUnit.getX();
        newVelocityY = pCircle1.getVelocity().getY() - (2 * e) *  vDotN * vectorDirectionUnit.getY();
        //pCircle1.setVelocity(pCircle1.getVelocity().subtract( vectorDirectionUnit.multiply( (2 * e) * vDotN )));
        newVelocity = new Vector(newVelocityX, newVelocityY, 1);
        pCircle1.setVelocity(newVelocity);
    }

}