import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  gsapClass: () => {
    return gsap;
  },

  topNavAnimation: (element, trigger, start, distance) =>
    gsap
      .timeline({
        defaults: {
          rotation: 0.001,
          ease: "none",
        },
        scrollTrigger: {
          trigger: trigger,
          start: start,
          scrub: 0.5,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      })
      .to(element, { y: distance }),

  toggleAnimation: (element, display, opacity, duration) =>
    gsap
      .timeline({
        defaults: {
          rotation: 0.001,
          ease: "Power0.easeInOut",
          duration: duration,
        },
      })
      .to(element, { display: display })
      .to(element, { opacity: opacity }, "<"),
};
