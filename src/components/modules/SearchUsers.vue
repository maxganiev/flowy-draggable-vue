<template>
  <div class="search-users">
    <h4>Введите ФИО нужного сотрудника, которого хотите добавить в схему</h4>
    <input type="text" id="input-search-users" @input="(e) => search(e)" />
  </div>
</template>

<script>
import { getAllUsers } from "@/demo_data/getAllUsers";
import { User } from "@/lib/constructors/User";
import { store } from "@/store";

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
        store.toggleLoading();
        const users = await getAllUsers().then((res) => res);

        store.searchUsers(
          users.data
            .filter(
              (item) =>
                (item.first_name.toLowerCase().slice(0, query.length) === query ||
                  item.last_name.toLowerCase().slice(0, query.length) === query) &&
                //remove results that already persist in schema, from search results
                store.nodes.findIndex((user) => user.id === item.id) == -1
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
                  item.descr,
                  0,
                  []
                )
            )
        );
        store.toggleLoading();
        //console.log(store.users);
      }

      this.$emit("onSearch", this.searchStart);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 90%;
  margin: 20px auto 10px 2px;
  border-radius: 10px;
  height: 30px;
  border: 0.5px #e2e8f0 solid;
  font-size: 0.9rem;
  padding: 1.5px 6.6px;
}
</style>
