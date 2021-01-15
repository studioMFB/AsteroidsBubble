class Matrix {
  constructor(p00, p01, p02, p10, p11, p12, p20, p21, p22) {

    this.matrixArray = [p00, p01, p02, p10, p11, p12, p20, p21, p22];

    // row 0
    this.setElement(0, 0, p00);
    this.setElement(0, 1, p01);
    this.setElement(0, 2, p02);
    // row 1
    this.setElement(1, 0, p10);
    this.setElement(1, 1, p11);
    this.setElement(1, 2, p12);
    // row 2
    this.setElement(2, 0, p20);
    this.setElement(2, 1, p21);
    this.setElement(2, 2, p22);
  }
  getElement(pRow, pCol) {
    var matrixArrayIndex = this.calculateMatrixArrayIndex(pRow, pCol);

    return this.matrixArray[matrixArrayIndex];
  }
  setElement(pRow, pCol, pValue) {
    var matrixArrayIndex = this.calculateMatrixArrayIndex(pRow, pCol);

    this.matrixArray[matrixArrayIndex] = pValue;
  }

    // the use of .THIS is important
  calculateMatrixArrayIndex(pRow, pCol) {
  var matrixArrayIndex = (3 * pRow) + pCol;

  return matrixArrayIndex;
  }

  //////////////////////////////////////
  
  setTransform(pContext) {
    var a, b, c, d, e, f;

    a = this.getElement(0,0);
    b = this.getElement(1,0);
    c = this.getElement(0,1);
    d = this.getElement(1,1);
    e = this.getElement(0,2);
    f = this.getElement(1,2);

    return pContext.setTransform(a, b, c, d, e, f);
  }

  transform(pContext) {
    var a, b, c, d, e, f;

    a = this.getElement(0,0);
    b = this.getElement(1,0);
    c = this.getElement(0,1);
    d = this.getElement(1,1);
    e = this.getElement(0,2);
    f = this.getElement(1,2);

    return pContext.transform(a, b, c, d, e, f);
  }
  
/////////////////////////////////////////////

  static createIdentity() {
    var x, y, z;
    x = 1;
    y = 1;
    z = 1;
    return new Matrix(x, 0, 0, 0, y, 0, 0, 0, z);
  }

  static createTranslation(pVector) {
    var matrix = this.createIdentity();

    matrix.setElement(0, 2, pVector.getX());
    matrix.setElement(1, 2, pVector.getY());

    return matrix;
  }

  static createScale(pVector) {
    var matrix = this.createIdentity();

    matrix.setElement(0, 0, pVector.getX());
    matrix.setElement(1, 1, pVector.getY());
    matrix.setElement(2, 2, pVector.getZ());

    return matrix;
  }

  static createRotation(pAngleScalar) {
    var matrix = this.createIdentity();

    matrix.setElement(0, 0, Math.cos(pAngleScalar));
    matrix.setElement(0, 1, -(Math.sin(pAngleScalar)));
    matrix.setElement(1, 0, Math.sin(pAngleScalar));
    matrix.setElement(1, 1, Math.cos(pAngleScalar));

    return matrix;
  }

  // TO DO: Use vector(x,y,z) to represent M coordinates, Combine with nested for loops
  multiply(pMatrix) {
    var matrix, thisM00, thisM01, thisM02, thisM10, thisM11, thisM12, thisM20, thisM21, thisM22,
     pM00, pM01, pM02, pM10, pM11, pM12, pM20, pM21, pM22;

    thisM00 = this.getElement(0, 0);
    thisM01 = this.getElement(0, 1);
    thisM02 = this.getElement(0, 2);
    thisM10 = this.getElement(1, 0);
    thisM11 = this.getElement(1, 1);
    thisM12 = this.getElement(1, 2);
    thisM20 = this.getElement(2, 0);
    thisM21 = this.getElement(2, 1);
    thisM22 = this.getElement(2, 2);

    pM00 = pMatrix.getElement(0, 0);
    pM01 = pMatrix.getElement(0, 1);
    pM02 = pMatrix.getElement(0, 2);
    pM10 = pMatrix.getElement(1, 0);
    pM11 = pMatrix.getElement(1, 1);
    pM12 = pMatrix.getElement(1, 2);
    pM20 = pMatrix.getElement(2, 0);
    pM21 = pMatrix.getElement(2, 1);
    pM22 = pMatrix.getElement(2, 2);

    matrix = Matrix.createIdentity();

    matrix.setElement(0, 0, (thisM00 * pM00 + thisM01 * pM10 + thisM02 * pM20));
    matrix.setElement(0, 1, (thisM00 * pM01 + thisM01 * pM11 + thisM02 * pM21));
    matrix.setElement(0, 2, (thisM00 * pM02 + thisM01 * pM12 + thisM02 * pM22));

    matrix.setElement(1, 0, (thisM10 * pM00 + thisM11 * pM10 + thisM12 * pM20));
    matrix.setElement(1, 1, (thisM10 * pM01 + thisM11 * pM11 + thisM12 * pM21));
    matrix.setElement(1, 2, (thisM10 * pM02 + thisM11 * pM12 + thisM12 * pM22));

    matrix.setElement(2, 0, (thisM20 * pM00 + thisM21 * pM10 + thisM22 * pM20));
    matrix.setElement(2, 1, (thisM20 * pM01 + thisM21 * pM11 + thisM22 * pM21));
    matrix.setElement(2, 2, (thisM20 * pM02 + thisM21 * pM12 + thisM22 * pM22));

    return matrix;
  }

  multiplyVector(pVector) {
    var x, y, z,
      pVectorX, pVectorY, pVectorZ,
       thisM00, thisM01, thisM02, thisM10, thisM11, thisM12, thisM20, thisM21, thisM22;

    thisM00 = this.getElement(0, 0);
    thisM01 = this.getElement(0, 1);
    thisM02 = this.getElement(0, 2);
    thisM10 = this.getElement(1, 0);
    thisM11 = this.getElement(1, 1);
    thisM12 = this.getElement(1, 2);
    thisM20 = this.getElement(2, 0);
    thisM21 = this.getElement(2, 1);
    thisM22 = this.getElement(2, 2);

    pVectorX = pVector.getX();
    pVectorY = pVector.getY();
    pVectorZ = pVector.getZ();

    x = thisM00 * pVectorX + thisM01 * pVectorY + thisM02 * pVectorZ;
    y = thisM10 * pVectorX + thisM11 * pVectorY + thisM12 * pVectorZ;
    z = thisM20 * pVectorX + thisM21 * pVectorY + thisM22 * pVectorZ;

    return new Vector(x, y, z);
  }

  // Check the syntax
  alert() {

    alert(this.getElement(0, 0), this.getElement(0, 1), this.getElement(0, 2),
      this.getElement(1, 0), this.getElement(1, 1), this.getElement(1, 2),
      this.getElement(2, 0), this.getElement(2, 1), this.getElement(2, 2));

    return;
  }

}
