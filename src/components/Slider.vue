<template>
  <div class="slider-container">
    <div class="slider" :style="{ transform: 'translateX(' + (-currentIndex * 100) + '%)' }">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <img :src="'src/assets/img/' + slide.image" alt="Slide">
        <div class="overlay">
          <span>{{ slide.text }}</span>
        </div>
      </div>
    </div>
    <button @click="prevSlide" class="prev-btn">&#8249;</button>
    <button @click="nextSlide" class="next-btn">&#8250;</button>
  </div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      slides: [
        { image: 'test.jpg', text: 'Text for slide 1' },
        { image: 'test2.png', text: 'Text for slide 2' },
        { image: 'test3.jpg', text: 'Text for slide 3' }
      ],
      currentIndex: 0
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }
  }
};
</script>

<style scoped>
.slider-container {
  position: relative;
  overflow: hidden;
}

.slider {
  display: flex;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.slide {
  position: relative;
  width: 70%;
  height: 500px;
  display: flex;
  justify-content: center;
}

img {
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.overlay span {
  font-size: 18px;
}

.prev-btn, .next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  cursor: pointer;
}

.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}
</style>
