export class User {
  constructor(
    /**@type {Number}*/ parentId,
    /**@type {Number}*/ id,
    /**@type {Number}*/ dep_id,
    /**@type {String}*/ full_name_short,
    /**@type {String | null}*/ avatar_thumb,
    /**@type {String}*/ position_name,
    /**@type {String | null}*/ descr
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
  }

  get nodeComponent() {
    return "flow-node";
  }

  get type() {
    return "user";
  }
}
