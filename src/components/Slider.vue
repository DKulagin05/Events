<template>
  <div class="slider-container">
    <swiper :navigation="true" :modules="modules" class="mySwiper">
      <swiper-slide
          v-for="slide in slides"
          :key="slide.img"
      >
        <img :src="slide.img" alt="IMG" />
        <div class="overlay">
          <span>{{ slide.description }}</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slides: [
        { img: 'src/assets/img/Slider/Exhibition.jpg', description: 'Exhibition' },
        { img: 'src/assets/img/Slider/Marry.jpg', description: 'Marry' },
        { img: 'src/assets/img/Slider/Rock.jpg', description: 'Rock' },
      ],
    };
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>

<style style="">
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  /*background: #eee;*/
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 600px;
  object-fit: cover;
}
.slider-container {
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  bottom: 0;
  /*left: 0;*/
  width: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
}

.overlay span {
  font-size: 18px;
}
</style>