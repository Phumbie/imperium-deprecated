<template>
  <div>
    <div class="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 512.005 512.005"
        style="enable-background:new 0 0 512.005 512.005;"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667    S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6    c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z     M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
            />
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
      <input
        v-model="searchProduct"
        type="text"
        name="search"
        id="search"
        @keyup.enter.prevent="search"
        v-on:blur="loseFocus"
        ref="focus"
      />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchProduct: "",
        autofocus: true,
      };
    },
    mounted() {
      this.focus();
    },
    methods: {
      focus() {
        this.$refs.focus.focus();
      },
      search() {
        // this.$emit("search", this.searchProduct);
        // this.searchProduct = "";
        if (!this.searchProduct) {
          return false;
        } else {
          this.$router.push(`/products/search/${this.searchProduct}`);
        }
      },
      loseFocus() {
        this.$emit("toggleFocus");
      },
    },
  };
</script>
<style lang="scss" scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .search {
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex; // border-bottom: solid 0.0625rem #000000;
    align-items: center;
    justify-content: center;
    // margin-top: 1.2rem;
    svg {
      height: 1.3rem;
      width: 1.3rem;
      margin: 0 5%;
    }

    input {
      width: 90%;
      padding: 0;
      margin: auto;
      height: 100%;
      font-size: 1.125rem;
      outline: none;
      animation: fadeOut 0.5s linear;

      // padding: 0;
      // border: 1px solid #1d1d1d;
      // text-align: center;
      border: none;
      @media screen and (max-width: 900px) {
        width: 100%;
        padding: 0;
      }
    }
    // input:hover {
    //   background-color: black;
    //   color: white;
    // }
    input::placeholder {
      text-align: center;
      color: black;
    }
    // input::placeholder:hover {
    //   text-align: center;
    //   color: white;
    // }
  }
  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
