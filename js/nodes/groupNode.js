class GroupNode extends SceneGraphNode{
    constructor(pTag){
        super(pTag);
        this.mType = "GroupNode";
        this.mChildren = [];
    }
    getNumberOfChildren() {
        return this.mChildren.length;
    }
    getChildAt(pIndex) {
        return this.mChildren[pIndex];
    }
    addChild(pChild) {
        this.mChildren.push(pChild);
    }
}