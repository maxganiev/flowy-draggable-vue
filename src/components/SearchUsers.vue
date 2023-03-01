<template>
  <div class="search-users">
    <label for="input-search-users"
      >Введите ФИО нужного сотрудника, которого хотите добавить в схему</label
    >
    <input type="text" id="input-search-users" @input="(e) => search(e)" />
  </div>
</template>

<script>
import { getAllUsers } from "../demo_data/getAllUsers";
import { User } from "../lib/constructors/User";
import { store } from "../store";

export default {
  name: "searchUsers",
  data: () => ({
    searchStart: false,
  }),
  components: { store },
  methods: {
    async search(e) {
      const query = e.target.value.toLowerCase();
      this.searchStart = query.length >= 2;

      if (this.searchStart) {
        const data = await getAllUsers().then((res) => res);
        //console.log(data);
        store.searchUsers(
          data.data
            .filter(
              (item) =>
                item.first_name.toLowerCase().slice(0, query.length) === query ||
                item.last_name.toLowerCase().slice(0, query.length) === query
            )
            .map(
              (item) =>
                new User(
                  // parentId by default
                  0,
                  item.id,
                  item.dep_id,
                  item.full_name_short,
                  item.avatar_thumb,
                  item.position_name,
                  item.descr
                )
            )
        );
        //console.log(store.users);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="text"] {
  width: 90%;
  margin: 20px auto 0 auto;
  border-radius: 10px;
  height: 30px;
  border: 0.5px #e2e8f0 solid;
  font-size: 0.9rem;
  padding: 1.5px 2px;

  &:focus {
    outline: none !important;
    box-shadow: 0px 0px 0px 3px rgba(0, 144, 237, 0.4);
  }
}
</style>
