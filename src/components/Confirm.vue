<template>
  <div>
    <content-loader>
      <div class="loader"></div>
    </content-loader>
  </div>
</template>

<script>
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader";

export default {
  components: {
    contentLoader,
  },
  beforeRouteEnter(to, from, next) {
    const { id } = to.query;
    if (!id) {
      return next("/products");
    }
    next();
  },
  mounted() {
    this.confirmCustomer();
  },
  methods: {
    confirmCustomer() {
      let id = this.$route.query.id;
      api
        .confirmCustomer(id)
        .then((response) => {
          alert(response.data.data.message);
          this.$router.push("/products");
        })
        .catch(({ response }) => {
          alert(response.data.message);
          this.$router.push("/products");
        });
    },
  },
};
</script>
