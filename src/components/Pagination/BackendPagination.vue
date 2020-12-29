<template>
  <div class="pagination-container" v-if="totalPage > 1 && !loading">
    <button
      class="arrow-btn"
      :class="{
        disabled: activePage === 1,
      }"
      @click="navigateToPage(activePage - 1)"
    >
      <img src="@/assets/images/chevron-left.svg" alt="left arrow icon" />
    </button>
    <span class="pagivation-nav" v-for="(num, index) in totalPage" :key="index">
      <button
        class="button"
        :class="{
          active: activePage === index + 1,
        }"
        @click="navigateToPage(index + 1)"
      >
        {{ index + 1 }}
      </button>
    </span>
    <button
      class="arrow-btn"
      :class="{
        disabled: activePage === totalPage,
      }"
      @click="navigateToPage(activePage + 1)"
    >
      <img src="@/assets/images/chevron-right.svg" alt="right arrow icon" />
    </button>
  </div>
</template>

<script>
export default {
  name: "BackendPagination",
  props: ["totalRecord", "currentPage", "perPage", "loading"],
  data() {
    return {};
  },
  mounted() {},
  computed: {
    totalPage() {
      return Math.ceil(this.totalRecord / this.perPage);
    },
    activePage() {
      return this.currentPage;
    },
  },
  methods: {
    navigateToPage(page) {
      if (this.activePage === page || page === 0 || page > this.totalPage) {
        return;
      }
      this.$emit("pageChange", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  .arrow-btn {
    position: relative;
    top: 0.2rem;
    background: transparent;
    border: none;

    img {
      object-fit: contain;
      object-position: center;
    }
  }

  .disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .pagivation-nav {
    position: relative;

    .button {
      font-family: "Graphik";
      font-size: 0.8rem;
      font-weight: 500;
      background: transparent;
      border: none;
      margin: 0 0.5rem;

      &:hover {
        color: #65ac4d;
      }
    }
    .active {
      color: #65ac4d;
      background: rgba(101, 172, 77, 0.3);
      border-radius: 0.2rem;

      &:hover {
        cursor: text;
      }
    }
  }
}
</style>
