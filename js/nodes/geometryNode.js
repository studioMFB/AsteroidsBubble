class GeometryNode extends SceneGraphNode{
    constructor(pTag, pDrawableObject){
        super(pTag);
        this.mType = "GeometryNode";
        this.setDrawableObject(pDrawableObject);
    }
    setDrawableObject(pDrawableObject) {
        this.mDrawableObject = pDrawableObject;
    }
    getDrawableObject() {
        return this.mDrawableObject
    }
 }