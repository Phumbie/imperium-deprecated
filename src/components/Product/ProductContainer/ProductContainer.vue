<template>
  <div>
    <section class="products-container">
      <SingleProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </section>
  </div>
</template>
<script>
  import SingleProduct from "../SingleProduct/SingleProduct";
  export default {
    props: ["products"],
    components: { SingleProduct },
  };
</script>
<style lang="scss" scoped>
  .products-container {
    margin-top: 3.375rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: solid 1px #000000;
    border-right: none;
    border-bottom: none;

    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 0.5rem;
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
</style>
