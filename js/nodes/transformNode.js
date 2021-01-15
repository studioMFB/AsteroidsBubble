class TransformNode extends GroupNode {
    constructor(pTag, pLocalMatrix) {
        super(pTag);
        this.mType = "TransformNode";
        this.mTransform = pLocalMatrix;
    }
    getTransform() {
        return this.mTransform
    } 
    setTransform(pTransform) {
        this.mTransform = pTransform;
    }
}