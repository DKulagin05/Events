<template>
  <Header/>
  <div class="container">
    <div class="about-page">
      <div class="about-banner">
        <h1>Добро пожаловать на наш сайт!</h1>
        <p>Мы организуем мероприятия любого формата и сложности.</p>
      </div>

      <div class="about-content">
        <div class="about-section">
          <h2>Кто мы</h2>
          <p>Мы команда профессионалов с многолетним опытом в сфере организации мероприятий.</p>
          <p>Мы знаем, как сделать ваше мероприятие незабываемым!</p>
        </div>

        <div class="about-section">
          <h2>Наши услуги</h2>
          <ul>
            <li>Организация свадеб</li>
            <li>Корпоративных мероприятий</li>
            <li>Вечеринок</li>
            <li>Конференций</li>
            <li>И других мероприятий</li>
          </ul>
        </div>

        <div class="about-section">
          <h2>Наши преимущества</h2>
          <ul>
            <li>Опытные специалисты</li>
            <li>Индивидуальный подход</li>
            <li>Гарантированное качество</li>
            <li>Бесплатная консультация</li>
          </ul>
        </div>

        <div class="about-section">
          <h2>Свяжитесь с нами</h2>
          <p>Получите бесплатную консультацию по организации вашего мероприятия!</p>
          <a href="tel:+71234567890">+7 (123) 456-78-90</a>
          <br>
          <a href="mailto:info@example.com">info@example.com</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: 'AboutPage',
  components: {
    Header
  },
};
</script>

<style scoped>
.container {
  background-color: #f0f5f9; /* Светло-голубой фон контейнера */
  padding: 20px;
}
/* Стили для страницы "О нас" */
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.about-banner {
  text-align: center;
  margin-bottom: 30px;
}

.about-content {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 5px;
}

.about-section {
  margin-bottom: 30px;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

ul {
  margin-bottom: 10px;
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}

.contact-info {
  font-weight: bold;
}
</style>
