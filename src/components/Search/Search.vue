<template>
  <div>
    <div class="search">
      <img src="@/assets/images/search.svg" alt="search icon" />
      <input
        v-model="searchProduct"
        type="text"
        name="search"
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
      if (!this.searchProduct) {
        return false;
      } else {
        this.$router.push(`/products/search/${this.searchProduct}`);
        this.$emit("toggleFocus");
      }
    },
    loseFocus() {
      this.$emit("toggleFocus");
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 1.1rem;
    width: 1.1rem;
    margin: 0 5%;

    @media screen and (max-width: 900px) {
      margin: 0 6% 0 3%;
    }
  }

  input {
    width: 90%;
    padding: 0;
    margin: auto 1rem auto auto;
    font-family: Graphik;
    font-size: 1rem;
    animation: fadeOut 0.2s linear;
    border: none;

    @media screen and (max-width: 900px) {
      width: 100%;
      padding: 0;
    }
  }

  input::placeholder {
    text-align: center;
    color: black;
  }
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
