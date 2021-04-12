<template>
  <div id="content-loader" class="container">
    <slot />
  </div>
</template>

<style lang="scss">
#content-loader {
  margin-top: 3rem;
  border: solid 1px black;
  font-size: 20px;
  text-align: center;
  padding-top: 200px;
  padding-bottom: 200px;

  @media screen and (max-width: 900px) {
    padding-top: 150px;
    padding-bottom: 150px;
  }

  .loader {
    display: flex;
    border: 6px solid #f3f3f3;
    border-top: 6px groove #414b55;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0% auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
