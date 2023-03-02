<template>
  <div class="div-confirmation-modal-wrapper">
    <Alert
      :show="alertDetails.show"
      :HTMLContent="alertDetails.content"
      :alertType="alertDetails.type"
    />

    <BtnSubmit content="Сохранить изменения" @onSubmit="toggleModal" />

    <div class="div-confirmation-modal" v-if="isOpened">
      <BtnClose @onClose="toggleModal" />
      <div v-html="HTMLContent"></div>
      <BtnSubmit content="Сохранить изменения" @onSubmit="updateShema" />
    </div>
  </div>
</template>

<script>
import BtnClose from "./BtnClose.vue";
import BtnSubmit from "./BtnSubmit.vue";
import { store } from "../store";
import Alert from "./Alert.vue";

export default {
  name: "ConfirmationModal",
  data: () => ({
    isOpened: false,
    alertDetails: {
      show: false,
      content: "",
      type: "success",
    },
  }),
  props: {
    HTMLContent: {
      type: String,
      required: true,
    },
  },
  components: { BtnClose, BtnSubmit, store, Alert },
  methods: {
    toggleModal() {
      this.isOpened = !this.isOpened;
    },
    updateAlertDetails() {
      Object.keys(this.alertDetails).forEach(
        (key, index) => (this.alertDetails[key] = arguments[index])
      );
    },
    async updateShema() {
      try {
        const postdata = JSON.stringify(store.nodes);
        store.toggleLoading();
        //post request to save schema to db:
        //...
        //

        //if request has been successfull - return success and toggle schemaIsUpdated back to init value:
        this.updateAlertDetails(
          true,
          "<strong> Схема успешно изменена, спасибо! </strong>",
          "success"
        );

        setTimeout(() => {
          store.toggleShemaStatus(false);
        }, 2800);
      } catch (error) {
        console.log(error);
        this.updateAlertDetails(
          true,
          "<strong> Упс, что-то поломалось( <br/ > Попробуйте повторить позднее. </strong>",
          "danger"
        );
      }

      store.toggleLoading();
      setTimeout(() => {
        this.updateAlertDetails(false, "", "success");
      }, 2800);
    },
  },
};
</script>

<!--styles passed via parent comp.-->
