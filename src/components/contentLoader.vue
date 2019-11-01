<template>
  <div id="content-loader">
    <slot />
  </div>
</template>

<style lang="scss">
#content-loader {
  margin-top: 31px;
  width: 99.9%;
  border: solid 1px black;
  font-size: 20px;
  text-align: center;
  padding-top: 200px;
  padding-bottom: 200px;

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

@media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) {
  #content-loader {
    width: 99.7%;
  }
}
</style>
