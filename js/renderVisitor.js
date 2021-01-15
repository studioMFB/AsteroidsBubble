class RenderVisitor {
    constructor(pContext) {
        this.mContext = pContext;
        this.mStack = [];
    }
    popTransform() {
        return this.mStack.pop();
    } 
    peekTransform() {
        return this.mStack[this.mStack.length-1];
    } 
    pushTransform(pTransformMatrix) {
        var currentTransformMatrix, newTransformMatrix;

        if(this.mStack.length == 0) {
            this.mStack.push(pTransformMatrix);
        }
        else {
            currentTransformMatrix = this.peekTransform();
            newTransformMatrix = currentTransformMatrix.multiply(pTransformMatrix);
            this.mStack.push(newTransformMatrix);
        }
    } 
  
    visit(pNode) {
        switch(pNode.getType()) {
            case "GroupNode":
                this.visitGroup(pNode);
            break;
            case "TransformNode":
                this.visitTransform(pNode);
            break;
            case "GeometryNode":
                this.visitGeometry(pNode);
            break;
        }
    }
    visitGroup(pNode) {
        var index, child;

        for(index= 0; index < pNode.getNumberOfChildren(); index += 1) {
            child = pNode.getChildAt(index);
            child.accept(this, this.mContext);
        }
    }
    visitTransform(pNode) {
        this.pushTransform(pNode.getTransform());
        this.visitGroup(pNode);
        this.popTransform();
    }
    visitGeometry(pNode) {
        var currentTransformMatrix;
        currentTransformMatrix = this.peekTransform();
        currentTransformMatrix.setTransform(this.mContext);
        pNode.getDrawableObject().draw(this.mContext);
    }
}