class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX); 
        this.setY(pY); 
        this.setZ(pZ); 
    }
    getX() {
        return this.mX; 
    }
    setX(pX) {
        this.mX = pX; 
    }
    getY() {
        return this.mY; 
    }
    setY(pY) {
        this.mY = pY; 
    }
    getZ() {
        return this.mZ; 
    }
    setZ(pZ) {
        this.mZ = pZ; 
    }

    add(pVector) {
        var x, y, z;
        x = this.getX() + pVector.getX();
        y = this.getY() + pVector.getY();
        z = this.getZ(); 
        var addVector = new Vector(x, y, z);
        return addVector;
    }
  
    subtract(pVector) {
        var x, y, z;
        x = this.getX() - pVector.getX();
        y = this.getY() - pVector.getY();
        z = this.getZ(); 
        var subVector = new Vector(x, y, z);
        return subVector;
    }
    
    multiply(pScalar) {
        var x, y, z;
        x = this.getX() * pScalar;
        y = this.getY() * pScalar;
        z = this.getZ() * pScalar;
        var multiVector = new Vector(x, y, z);
        return multiVector;
    }

    divide(pScalar) {
        var x, y, z, newVector;
        x = this.getX() / pScalar;
        y = this.getY() / pScalar;
        z = this.getZ() / pScalar;
        newVector = new Vector(x, y, z);
        return newVector;
    }

    magnitude() {
        var x, y;
        x = this.getX();
        y = this.getY();
        var magVector = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return magVector;
    }

    normalise() {
        var magVector = this.magnitude();
        var unitVector = this.divide(magVector);
        return unitVector;
    }

    limitTo(pLimitScalar) {
        var magVector, limitVector, multipliedVector;
        magVector = this.magnitude();
        if (magVector > pLimitScalar) {
            var unitVector = this.normalise();
            multipliedVector = unitVector.multiply(pLimitScalar);
            limitVector = new Vector(multipliedVector.getX(), multipliedVector.getY(), multipliedVector.getZ());
        }
        else {
            limitVector = new Vector(this.getX(), this.getY(), this.getZ());
        }
        return limitVector;
    }

    dotProduct(pVector) {
        var vectorsX, vectorsY;
        vectorsX = this.getX() * pVector.getX();
        vectorsY = this.getY() * pVector.getY();
        var dotProduct = vectorsX + vectorsY;
        return dotProduct;
    }

    interpolate(pVector, pScalar) {
        var vectorToInterPol = pVector.subtract(this);
        var interpolatedVector = vectorToInterPol.multiply(pScalar);
        var newVector = this.add(interpolatedVector);
        return newVector;
    }

    rotate(pAngleScalar) {
        var x, y, z;
        x = this.getX() * Math.cos(pAngleScalar) - this.getY() * Math.sin(pAngleScalar);
        y = this.getX() * Math.sin(pAngleScalar) + this.getY() * Math.cos(pAngleScalar);
        z = this.getZ();
        var newVector = new Vector(x, y, z);
        return newVector;
    }

    angleBetween(pVector) {
        var dotProduct, pVectorMag, thisVectorMag, divided, angleInRadians;

        dotProduct = this.dotProduct(pVector);

        thisVectorMag = this.magnitude();
        pVectorMag = pVector.magnitude();

        var multipliedMags = thisVectorMag * pVectorMag;

        divided = dotProduct / multipliedMags;

        angleInRadians = Math.acos(divided); 
        return angleInRadians;
    }
}