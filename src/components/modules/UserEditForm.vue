<template>
  <div class="mask" @click.self="hideWrapper">
    <Alert :alert-type="alert.type" :show="alert.show" :HTMLContent="alert.HTMLContent" />
    <div class="wrapper-editable" ref="wrapperEl">
      <BtnClose @onClose="hideWrapper" />
      <div v-if="isUserType" class="card user" ref="cardElem">
        <h4>Редактирование профиля - {{ store.editUser.data.full_name_short }}</h4>
        <ul class="list" v-if="editableNode">
          <li>
            <span>Должность:</span>
            <input class="form-control" type="text" v-model="editableNode.data.position_name" />
            <br />
            <span>Функции (описание деятельности):</span>
            <textarea class="form-control" v-model="editableNode.data.descr"></textarea>
          </li>
          <li>
            <Pic
              :src="
                !tempImg ? 'https://portal.elcomspb.ru/' + editableNode.data.avatar_thumb : tempImg
              "
              :key="tempImg"
              alt="employee pic"
            />
            <input
              class="form-control"
              type="file"
              name="avatar"
              style="display: none"
              ref="avatarUpload"
              @change="replaceCurrentAvatar"
            />
            <button class="btn" style="width: 100%" @click="selectAvatar">
              Загрузить другое фото
            </button>
          </li>
          <li class="col-1-span-3">
            <span>Ключевые слова (для поиска):</span>
            <input
              class="form-control"
              type="text"
              placeholder="Введите теги по одному"
              v-model="currentTagName"
              @focus="tagInputFocused = true"
              @blur="tagInputFocused = false"
            />
            <button class="btn" :disabled="currentTagName.length === 0" @click="addTag">
              Добавить тег
            </button>
            <ul class="inner-list tags" v-if="editableNode.tags.length > 0">
              <li v-for="tag in editableNode.tags">
                <span class="tag"
                  >{{ tag.content }} <a href="#" @click.prevent="removeTag(tag)">&#10754;</a></span
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-else class="card block">
        <h4 class="text-center mt-3 w-75">
          Редактирование блока - {{ store.editUser.data.descr }}
        </h4>
        <label class="form-label">Введите новое название блока</label>
        <input class="form-control" type="text" v-model="editableNode.data.descr" />
      </div>

      <div class="div-confirm-changes">
        <CheckSwitch
          v-show="isUserType"
          :labelContent="
            !editableNode.isCloned
              ? 'Синхронизировать с профилем сотрудника на Портале'
              : 'Копия узла не может быть синхронизирована'
          "
          :disabled="editableNode.isCloned"
          :styling="{
            label: {
              display: 'inline-block',
              'font-size': '0.8rem',
              'margin-top': '5px',
            },
          }"
          @onChange="syncDb"
        />
        <button
          class="btn"
          :class="[{ 'col-1-span-3': !isUserType }, { 'btn-block': !isUserType }]"
          @click="updateNode"
        >
          Сохранить изменения
        </button>
        <span class="span-warning col-1-span-3" :class="{ show: syncWithDb }"
          >Перепроверьте, все ли указано корректно! Вносятся изменения в общую структуру
          данных</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/store";
import { User } from "@/lib/constructors/User";
import { Tag } from "@/lib/constructors/Tag";
import BtnClose from "elements/BtnClose.vue";
import cloneDeep from "lodash/cloneDeep";
import CheckSwitch from "elements/CheckSwitch.vue";
import Alert from "modules/Alert.vue";
import { stripHtml } from "@/lib/stripHtml";
import Pic from "elements/Pic.vue";

export default {
  name: "UserEditForm",

  data: () => ({
    store,
    wrapperEl: null,
    cardElem: null,
    avatarUpload: null,
    currentTagName: "",
    /**@desc сюда будет идти bind при редактировании параметров, чтобы сразу не мутировать основные узлы в сторе:*/
    editableNode: cloneDeep(store.editUser),
    syncWithDb: false,
    tagInputFocused: false,
    alert: {
      type: "default",
      show: false,
      HTMLContent: "",

      setAlert(type, show, content) {
        this.type = type;
        this.show = show;
        this.HTMLContent = content;

        setTimeout(() => {
          this.show = false;
        }, 3000);
      },
    },
    tempImg: null,
  }),

  computed: {
    isUserType() {
      return store.editUser instanceof User;
    },
  },

  beforeUpdate() {
    console.log(this.editableNode);
  },

  mounted() {
    this.tempImg = null;

    //убираем разметку из описания редактируемого нода:
    this.editableNode.data.descr = stripHtml(this.editableNode.data.descr);

    window.addEventListener("keydown", this.handleKeyDown);
    setTimeout(() => {
      this.$refs.wrapperEl.classList.add("translate-in");

      //динамически считаем положение блока в зависимости от ширины окна:
      this.$refs.wrapperEl.style.left =
        document.body.clientWidth / 2 -
        this.$refs.wrapperEl.getBoundingClientRect().width / 2 +
        "px";
    }, 50);
  },

  beforeDestroy() {
    console.log("Module destroyed");
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    hideWrapper() {
      this.$refs.wrapperEl.classList.replace("translate-in", "translate-out");
      setTimeout(() => {
        store.toggleShowUserEditForm();
      }, 650);
    },

    handleKeyDown(e) {
      if (e.code === "Escape") this.hideWrapper();
      if (e.code === "Enter") this.tagInputFocused && this.addTag();
    },

    selectAvatar() {
      this.$refs.avatarUpload.click();
    },

    async replaceCurrentAvatar(e) {
      const file = e.target.files[0];
      if (!file) return;

      const fileExtension = file.name.split(".").slice(-1)[0].trim().toLowerCase();

      if (!["jpg", "jpeg", "png", "tiff"].includes(fileExtension)) {
        this.alert.setAlert("danger", true, "Выбран неподдерживаемый формат изображения!");
        return;
      }

      if (file.size > 50e6) {
        this.alert.setAlert("danger", true, "Макс. размер файла - 5 Мб!");
        return;
      }

      this.tempImg = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.editableNode.data.avatar_thumb = e.target.value.split("\\").slice(-1)[0];
          return resolve(reader.result);
        };
      });
    },

    addTag() {
      if (this.currentTagName.length === 0) return;

      new Tag(this.editableNode.tags.length, this.currentTagName)._addTag(this.editableNode.tags);
      this.currentTagName = "";

      setTimeout(() => {
        this.$refs.cardElem.scrollBy({ top: 100, left: 0, behavior: "smooth" });
      }, 100);
    },

    removeTag(tag) {
      tag._removeTag(this.editableNode.tags, tag.id);
    },

    updateNode() {
      store.updateNode(this.editableNode);
      this.alert.setAlert("success", true, "<h4> Изменения успешно внесены, спасибо! </h4>");
      store.saveNodes();
    },

    syncDb() {
      if (this.editableNode.isCloned) return;
      this.syncWithDb = !this.syncWithDb;
    },
  },

  components: { BtnClose, CheckSwitch, Alert, Pic },
};
</script>

<style lang="scss" scoped>
.col-1-span-3 {
  grid-column-start: 1;
  grid-column-end: 3;
}

.show {
  opacity: 1 !important;
  transition: all 0.4s ease-in-out !important;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 250;

  .wrapper-editable {
    position: absolute;
    height: 600px;
    width: 550px;
    top: 5%;
    background: $clr-milk;
    border-radius: 20px;
    border: $border-main;
    transform: translateY(-200vh);
    transition: transform 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: 1rem;
    padding-bottom: 20px;

    &.translate-in {
      transform: translateY(0%);
    }

    &.translate-out {
      transform: translateY(-200vh);
    }

    .btn-close-modal {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .card {
      width: 90%;
      margin: 0 auto;
      overflow-y: scroll;

      h4 {
        text-decoration: underline;
        margin: 0 auto;
        text-align: center;
      }

      &.user {
        .list {
          width: 90%;
          margin-top: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 2rem;

          li {
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            span {
              font-weight: 700;
              font-size: $fs-mid-reg;
              margin-bottom: 10px;
              display: block;
            }

            .form-control {
              width: 240px;
              margin: unset;
              margin-left: 2px;
              display: block;
              border-radius: 0 10px 10px 0;
              font-size: $fs-mid-reg;
            }

            textarea {
              height: 60%;
              border: $border-main;
              font-size: $fs-mid-reg;
              padding: 1.5px 6.6px;
            }

            img {
              max-width: 160px;
              max-height: 160px;
              object-fit: contain;
              border-radius: 20px;
            }
          }

          .inner-list.tags {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            height: 30%;

            li {
              margin: unset;
              margin-right: 10px;
              display: block;

              // &:nth-of-type(n + 2) {
              //   margin-left: 10px;
              // }

              span.tag {
                background: $clr-orange;
                color: #fff;
                font-weight: 400 !important;
                padding: 0 10px;
                display: inline-block;
                border-radius: 5px;

                a {
                  font-weight: 700;
                  font-size: $fs-mid-head;
                  transition: transform 0.2s ease-out;
                  display: inline-block;

                  &:hover {
                    transform: scale(1.2);
                  }
                }
              }
            }
          }
        }
      }

      &.block {
        .form-label {
          margin-top: 150px;
          display: block;
          text-align: center;
          font-weight: 700;
        }

        .form-control {
          width: 50%;
          margin: 20px auto;
          display: block;
        }
      }
    }

    .btn {
      background: $clr-emerald;
      color: #fff;
      padding: 2.5px 10px;
      width: auto;
      min-height: 20px;
      max-height: 35px;
      border-radius: 5px;
      margin-top: 10px;
      font-size: $fs-sm;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &.btn-block {
        display: block;
        width: 50%;
        margin: 0 auto;
        min-height: 25px;
      }
    }

    .div-confirm-changes {
      display: grid;
      grid-template-columns: 60% 30%;
      grid-row-gap: 1rem;
      justify-content: space-between;
      width: 90%;
      margin: 0 auto;

      .span-warning {
        font-size: $fs-mid-reg;
        display: block;
        color: $clr-danger;
        font-weight: 700;
        text-align: center;
        opacity: 0;
        transition: all 0.4s ease-in-out;
      }
    }
  }
}
</style>
