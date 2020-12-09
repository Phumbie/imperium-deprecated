<template>
  <transition name="show">
    <div class="toast-container" v-if="display">
      <div class="toast">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 515.556 515.556"
          style="enable-background:new 0 0 512 512"
          xml:space="preserve"
          class=""
          v-if="alert == 'success'"
        >
          <g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"
              fill="#35d81b"
              data-original="#000000"
              style=""
              class=""
            />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512"
          xml:space="preserve"
          class=""
          v-if="alert == 'warning'"
        >
          <g>
            <g xmlns="http://www.w3.org/2000/svg" transform="translate(1 1)">
              <g>
                <g>
                  <path
                    d="M436.016,73.984c-99.979-99.979-262.075-99.979-362.033,0.002c-99.978,99.978-99.978,262.073,0.004,362.031     c99.954,99.978,262.05,99.978,362.029-0.002C535.995,336.059,535.995,173.964,436.016,73.984z M405.848,405.844     c-83.318,83.318-218.396,83.318-301.691,0.004c-83.318-83.299-83.318-218.377-0.002-301.693     c83.297-83.317,218.375-83.317,301.691,0S489.162,322.549,405.848,405.844z"
                    fill="#ffcc00"
                    data-original="#000000"
                    style=""
                    class=""
                  />
                  <path
                    d="M254.996,84.338c-11.782,0-21.333,9.551-21.333,21.333v213.333c0,11.782,9.551,21.333,21.333,21.333     c11.782,0,21.333-9.551,21.333-21.333V105.671C276.329,93.889,266.778,84.338,254.996,84.338z"
                    fill="#ffcc00"
                    data-original="#000000"
                    style=""
                    class=""
                  />
                  <path
                    d="M254.996,383.004c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333c11.776,0,21.333-9.557,21.333-21.333     S266.772,383.004,254.996,383.004z"
                    fill="#ffcc00"
                    data-original="#000000"
                    style=""
                    class=""
                  />
                </g>
              </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 365.71733 365"
          style="enable-background:new 0 0 512 512"
          xml:space="preserve"
          class=""
          v-if="alert == 'danger'"
        >
          <g>
            <g xmlns="http://www.w3.org/2000/svg" fill="#f44336">
              <path
                d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"
                fill="#f44336"
                data-original="#f44336"
                style=""
                class=""
              />
              <path
                d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"
                fill="#f44336"
                data-original="#f44336"
                style=""
                class=""
              />
            </g>
          </g>
        </svg>
        <p
          :class="{
            danger: alert === 'danger',
            warning: alert === 'warning',
            success: alert === 'success',
          }"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </transition>
</template>
<script>
  import { createNamespacedHelpers } from "vuex";

  const { mapState, mapActions } = createNamespacedHelpers(
    "notificationModule"
  );
  export default {
    computed: {
      ...mapState({
        alert: (state) => state.toast.type,
        description: (state) => state.toast.description,
        display: (state) => state.toast.display,
      }),
    },
    watch: {
      display(val) {
        if (val === true) {
          setTimeout(() => {
            this.showToast({
              description: "",
              display: false,
              type: "",
            });
          }, 3000);
        }
      },
    },
    methods: {
      ...mapActions(["showToast"]),
    },
  };
</script>
<style lang="scss" scoped>
  .toast-container {
    position: fixed;
    top: 2rem;
    z-index: 100000;
    text-align: center;
    width: 100%;

    @media screen and (max-width: 600px) {
      width: 80%;
      margin: auto;
      right: 10%;
    }
    svg {
      width: 1.5rem;
      height: 1rem;
    }
    .toast {
      display: flex;
      justify-content: center;
      max-width: 20rem;
      //   border: 1px solid black;
      padding: 1.3rem 1rem;
      margin: auto;
      color: #f4f7f2;
      background-color: black;
      //   -webkit-box-shadow: -1px -1px 19px -1px rgba(177, 177, 177, 1);
      //   -moz-box-shadow: -1px -1px 19px -1px rgba(177, 177, 177, 1);
      //   box-shadow: -1px -1px 19px -1px rgba(177, 177, 177, 1);

      //   & .success {
      //     color: #4b8028;
      //   }

      //   & .danger {
      //     color: #f44336;
      //   }

      //   & .warning {
      //     color: #ffcc00;
      //   }
      p {
        margin-left: 1rem;
      }
    }
  }

  .show-enter-active {
    transition: all 0.3s ease;
  }
  .show-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .show-enter, .show-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-100px);
    opacity: 0;
  }
</style>
