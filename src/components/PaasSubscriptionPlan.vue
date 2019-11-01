<template>
  <div id="paas-sub">
    <div class="left-side">
      <div class="box-container">
        <div class="header-text-28">Simple, affordable monthly payments</div>
        <div class="txt-choose-plan">Choose a monthly subscription plan for your home</div>
        <div class="section-home-type">
          <div class="label">Home type</div>
          <select class="dropdown">
            <option>1 bedroom</option>
            <option>2 bedroom</option>
            <option>3 bedroom</option>
            <option>4 bedroom Type A</option>
            <option>4 bedroom Type B</option>
          </select>
        </div>
        <div class="section-location">
          <div class="label">Location</div>
          <select class="dropdown">
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Port Harcout</option>
            <option>Osun</option>
          </select>
        </div>
        <div class="section-available-configs">
          <span class="label">AVAILABLE CONFIGURATIONS</span>
          <span class="label color-green float-right text-trans-normal">Try our calculator</span>
          <div class="config-list">
            <div class="config">
              <span class="power-rating">A 0.9 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button" />
            </div>
            <div class="config">
              <span class="power-rating">B 1.5 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button" />
            </div>
            <div class="config">
              <span class="power-rating">C 2 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button" />
            </div>
            <div class="config">
              <span class="power-rating">D 0.9 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button" />
            </div>
            <div class="config">
              <span class="power-rating">E 1.5 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button" />
            </div>
            <div class="config">
              <span class="power-rating">F 2 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button" />
            </div>
          </div>
        </div>
        <div class="txt-monthly-cost">Billed monthly at N200,000.00</div>
        <button @click="goTo('paas/appliance-configuration')">See details</button>
      </div>
    </div>
    <div ref="name" class="right-side name">
      <img src="../assets/images/renewable-image.svg" />
    </div>
  </div>
</template>

<script>
import { TimelineLite } from "gsap";

export default {
  data() {
    return {};
  },
  mounted() {
    const { name } = this.$refs;
    const timeline = new TimelineLite();

    timeline.to(name, 2.5, { y: 800, scale: 0.8, ease: Bounce.easeOut });
  },
  methods: {
    goTo(page) {
      this.$router.push(page);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
