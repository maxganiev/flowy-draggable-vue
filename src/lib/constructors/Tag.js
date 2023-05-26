export class Tag {
  constructor(/**@type {Number} */ totalTags, content = "") {
    this.id = ++totalTags;
    this.content = content;
  }

  _addTag(/**@type {Tag[]} */ arrayOfTags) {
    arrayOfTags.push(this);
  }

  _removeTag(/**@type {Tag[]} */ arrayOfTags, /**@type {Number} */ tagId) {
    const indexOfTagToRemove = arrayOfTags.findIndex((item) => item.id === tagId);
    arrayOfTags.splice(indexOfTagToRemove, 1);
  }
}
