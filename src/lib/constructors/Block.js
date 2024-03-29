export class Block {
  constructor(
    /**@type {Number}*/ parentId,
    /**@type {Number}*/ id,
    /**@type {String}*/ descr,
    /**@type {Number} @desc {кол-во px, на которые необходимо сместить текущий нод по У, начиная от 0 (x100)} */ top,
    /**@type  {Boolean}*/ useDottedConnectorLine = false,
    /**@type {String} */ cssClassName = "block-body-block-set-default"
  ) {
    this.parentId = parentId;
    this.id = id;
    this.data = {
      descr,
    };
    this.top = top;
    this.useDottedConnectorLine = useDottedConnectorLine;
    this.cssClassName = cssClassName;
  }

  get nodeComponent() {
    return "flow-node";
  }

  get type() {
    return "block";
  }

  toJSON() {
    return {
      nodeComponent: this.nodeComponent,
      type: this.type,
      ...this,
    };
  }
}
