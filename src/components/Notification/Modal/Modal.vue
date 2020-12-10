<template>
  <transition name="fade">
    <div class="modal" @click="closeOutside" v-if="displayModal">
      <div class="modal-card">
        <div class="modal-card__close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512.001 512.001"
            style="enable-background:new 0 0 512.001 512.001;"
            xml:space="preserve"
            @click="closeModal"
          >
            <g>
              <path
                d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285    L284.286,256.002z"
              />
            </g>
          </svg>
        </div>
        <slot />
        <div class="modal-button">
          <button class="okay" @click="closeModal">
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ["showModal"],

    data() {
      return {
        // showModal: true,
      };
    },
    // mounted() {
    //   document.body.style.overflow = "hidden";
    // },
    // beforeDestroy() {
    //   document.body.style.overflow = "initial";
    // },
    computed: {
      displayModal() {
        if (this.showModal === true) {
          document.body.style.overflow = "hidden";
          return true;
        } else {
          document.body.style.overflow = "initial";
          return false;
        }
      },
    },
    methods: {
      closeOutside(event) {
        if (event.target.className === "modal") {
          //   this.$store.commit("SHOW_MODAL", false);
          this.closeModal();
        }
      },
      closeModal() {
        this.$emit("closeModal");
        // this.showModal = false;
      },

      //   displayModal(){
      //   }
    },
  };
</script>
<style lang="scss" scoped>
  .modal {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(128, 128, 128, 0.5);
    top: 0;
    z-index: 100000;
    display: grid;
    place-items: center;

    .modal-card {
      //   border: 1.5px solid black;
      padding: 1rem;
      background-color: #f4f7f2;
      max-width: 80%;
      max-height: 25rem;
      min-height: 10rem;
      -webkit-box-shadow: -1px -1px 19px -1px rgba(177, 177, 177, 1);
      -moz-box-shadow: -1px -1px 19px -1px rgba(177, 177, 177, 1);
      box-shadow: -1px -1px 19px -1px rgba(177, 177, 177, 1);

      @media screen and (min-width: 768px) {
        // min-height: 20rem;
        max-width: 25rem;
        min-width: 25rem;
      }
      .modal-card__close {
        display: flex;
        justify-content: flex-end;

        svg {
          width: 10px;
          cursor: pointer;
        }
      }

      .modal-button {
        text-align: center;
        button {
          min-width: 5rem;
          padding: 0.5rem;
          outline: none;
          border: none;
          color: white;
          background-color: #65ac4d;
        }
        // min-width: 5rem;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
