<template>
  <div class="wrapper">
    <h1 class="Name_company">FiestaFusion</h1>
    <Slider/>
    <div class="information-window">
      <h2>Что мы предлагаем</h2>
        <ul>
          <li>Наши услуги охватывают широкий спектр мероприятий: от корпоративных вечеров до свадеб и юбилеев.</li>
          <li>Мы предлагаем индивидуальный подход к каждому мероприятию, чтобы оно полностью отвечало вашим ожиданиям.</li>
          <li>Выберите из нашего разнообразия услуг, чтобы сделать ваше мероприятие особенным.</li>
        </ul>


      <router-link to="/services" class="Usually_Button">Выбрать</router-link>
    </div>
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";

export default {
  name: "MainPage",
  components: {
    Slider
  },
  methods: {

  }
}
</script>

<style scoped>
.Name_company {
  color: black;
  text-align: center;
  font-size: 48px;
  font-family: Roboto;
  font-style: italic;
  font-weight: 800;
  line-height: 35px;
  margin: 50px 0;
  word-wrap: break-word
}
.information-window {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin: 50px auto;
}




</style>