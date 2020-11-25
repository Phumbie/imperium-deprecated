<template>
  <div>
    <div
      class="product-item"
      @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
    >
      <div class="centered-content">
        <div class="image-container">
          <img :src="product.display_image" />
        </div>
        <div class="product-name">{{ product.name | setUppercase }}</div>
        <div class="product-capacity">
          <p>{{ product.description | shortenString | setUppercase }}</p>
        </div>

        <div class="price">
          ₦ {{ product.price ? product.price.toLocaleString() : "" }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["product"],
    methods: {
      navigateTo(page) {
        if (page.split("/")[2] === "undefined") {
          return;
        }
        this.$router.push(page);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .product-item {
    display: flex;
    justify-content: center;
    border-right: solid 1px #000000;
    border-bottom: solid 1px black;
    padding-top: 2.125rem;
    cursor: pointer;

    .centered-content {
      width: 85%;

      @media screen and (max-width: 900px) {
        width: 80%;
      }

      animation-name: fadeIn;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
      animation-duration: 1s;
      animation-fill-mode: forwards;

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .image-container {
        // background-color: rgba(99, 155, 97, 0.2);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 19rem;
        padding-bottom: 1.875rem;

        @media screen and (max-width: 900px) {
          height: 10rem;
        }

        img {
          width: 70%;
          position: relative;
          object-position: bottom;
          object-fit: contain;
          max-height: 100%;

          @media screen and (max-width: 900px) {
            width: 60%;
          }
        }
      }

      .product-name {
        font-family: HelveticaNeue;
        font-size: 1.1rem;
        font-weight: 500;
        color: #000000;
        margin-top: 1.5rem;
        margin-bottom: 0.4375rem;
        letter-spacing: 0.003rem;
        // text-transform: lowercase;
        // height: 3rem;
        overflow: hidden;
      }

      .product-capacity {
        font-family: HelveticaNeue;
        font-size: 0.9rem;
        color: #000000;
        font-weight: 500;
        margin-bottom: 0.4375rem;
        letter-spacing: 0.003rem;
        line-height: 1.4rem;
        opacity: 0.8;
        // height: 2.5rem;
        overflow: hidden;
        // text-transform: lowercase;
      }

      .price {
        font-family: Gotham;
        font-size: 1.125rem;
        color: #000000;
        font-weight: 500;
        margin-bottom: 1.375rem;
        letter-spacing: 0.003rem;
        line-height: 1.4rem;
      }
    }
  }
</style>
