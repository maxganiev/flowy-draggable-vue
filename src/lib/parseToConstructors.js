import { User } from "./constructors/User";
import { Block } from "./constructors/Block";
import { Tag } from "./constructors/Tag";

/**@desc {При ответе из бэка получаем массив из простых объектов, парсим их обратно в исходные инстансы при маунте} */
export function parseToConstructors(/**@type {String} */ stringifiedArray) {
  return JSON.parse(stringifiedArray).map((obj) => {
    const instance = obj.type === "user" ? new User() : new Block();
    Object.keys(instance).forEach((key) => (instance[key] = obj[key]));

    if (obj.hasOwnProperty("tags") && obj.tags.length > 0)
      instance.tags = instance.tags.map((tag, index) => new Tag(index, tag.content));
    return instance;
  });
}
