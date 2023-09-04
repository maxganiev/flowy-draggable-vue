export class User {
  constructor(
    /**@type {Number}*/ parentId,
    /**@type {Number}*/ id,
    /**@type {Number}*/ dep_id,
    /**@type {String}*/ full_name_short,
    /**@type {String | null}*/ avatar_thumb,
    /**@type {String}*/ position_name,
    /**@type {String | null}*/ descr,
    /**@type {Number} @desc {кол-во px, на которые необходимо сместить текущий нод по У, начиная от 0 } */ top,
    /**@type {String[]} */ tags,
    /**@type  {Boolean}*/ useDottedConnectorLine
  ) {
    this.parentId = parentId;
    this.id = id;
    this.dep_id = dep_id;
    this.data = {
      full_name_short,
      avatar_thumb,
      position_name,
      descr,
      profileUrl: `#/profile/${this.id}`,
    };
    this.top = top;
    this.tags = tags;
    this.useDottedConnectorLine = useDottedConnectorLine;
  }

  get nodeComponent() {
    return "flow-node";
  }

  get type() {
    return "user";
  }

  toJSON() {
    return {
      nodeComponent: this.nodeComponent,
      type: this.type,
      ...this,
    };
  }
}
