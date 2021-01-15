class SceneGraphNode {
    constructor(pTag) {
        this.mTag = pTag;
        this.mType = "SceneGraphNode";
    }
    getType() {
        return this.mType;
    }
    accept(pVisitor){
        pVisitor.visit(this);
    }
}