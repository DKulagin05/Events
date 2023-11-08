<template>
  <div class="app-container">
    <div class="content">
      <button class="scroll-to-top" :class="{ 'hidden': !isAtTop }" @click="scrollToTop">
        Наверх
      </button>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
  },
  data() {
    return {
      isAtTop: true,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleScroll() {
      this.isAtTop = window.scrollY === 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

.app-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  position: relative;
}

.footer {
  margin-top: auto; /* Pushes the footer to the bottom */
}

.scroll-to-top {
  position: absolute;
  left: -130px;
  top: 0;
  width: 130px;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: 0.3;
  justify-content: center;
  padding: 10px;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: left 0.3s;
}

.scroll-to-top.hidden {
  left: 0;
}

</style>
