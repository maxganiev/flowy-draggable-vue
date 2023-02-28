<template>
  <div class="search-users">
    <label for="input-search-users"
      >Введите ФИО нужного сотрудника, которого хотите добавить в схему</label
    >
    <input type="text" id="input-search-users" v-on:input="(e) => search(e)" />
    <!-- <div v-if="searchStart" class="div-print-result">
      <p v-if="result.length === 0">Ничего не найдено</p>
      <ul v-else>
        <li v-for="user in result">
          {{ user.data.full_name_short }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { getAllUsers } from "../demo_data/getAllUsers";
import { User } from "../lib/constructors/User";
import { store } from "../store";

export default {
  name: "searchUsers",
  data: () => ({
    result: [],
    searchStart: false,
  }),
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
