export class Block {
  constructor(/**@type {Number}*/ parentId, /**@type {Number}*/ id, /**@type {String}*/ descr) {
    this.parentId = parentId;
    this.id = id;
    this.data = {
      descr,
    };
  }

  get nodeComponent() {
    return "flow-node";
  }

  get type() {
    return "block";
  }
}
