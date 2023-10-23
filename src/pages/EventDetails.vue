<template>
  <div class="wrapper">
    <div class="event-details" >
      <h2>Детали мероприятия</h2>
      <div class="event-info" v-if="event">
        <div class="event-title">{{ event.title }}</div>
        <img :src="'src/assets/img/Services/' + event.img" alt="Event Image" />

        <p>{{ event.description }}</p>
      </div>
      <div class="" v-else>Загрузка...</div>
    </div>

    <!--  Меню: заказчик может выбрать меню из списка доступных вариантов.-->
    <!--  Декор: заказчик может выбрать декор из списка доступных вариантов или заказать индивидуальный дизайн.-->
    <!--  Аниматоры: заказчик может выбрать аниматоров из списка доступных вариантов или заказать услуги отдельной компании.-->
    <!--  Музыка: заказчик может выбрать музыку из списка доступных вариантов или заказать услуги диджея или группы.-->
    <!--  Трансфер: заказчик может заказать трансфер для гостей.-->
    <!--  Фото и видеосъемка: заказчик может заказать фото и видеосъемку мероприятия.-->
    <div class="parameters">
      <div id="app">
        <div class="event-parameter">
          <label for="menu">Количество человек: </label>
          <p>{{ humanLabel }}</p>
          <input type="range" min="1" max="5" step="1" v-model="Human_value" name="human_value">
        </div>

        <div class="event-parameter">
          <label for="menu">Меню:</label>
          <select v-model="selectedMenu" id="menu">
            <option value="" disabled selected>Выберите из списка</option>
            <option v-for="menu in availableMenus" :value="menu">{{ menu }}</option>
          </select>
        </div>

        <div class="event-parameter">
          <label for="decor">Декор:</label>
          <select v-model="selectedDecor" id="decor">
            <option value="" disabled selected>Выберите из списка</option>
            <option v-for="decor in availableDecors" :value="decor">{{ decor }}</option>
          </select>
        </div>

        <div class="event-parameter">
          <label for="animators">Аниматоры:</label>
          <select v-model="selectedAnimators" id="animators">
            <option value="" disabled selected>Выберите из списка</option>
            <option v-for="animator in availableAnimators" :value="animator">{{ animator }}</option>
          </select>
        </div>

        <div class="event-parameter">
          <label for="music">Музыка:</label>
          <select v-model="selectedMusic" id="music">
            <option value="" disabled selected>Выберите из списка</option>
            <option v-for="music in availableMusic" :value="music">{{ music }}</option>
          </select>
        </div>

        <div class="event-parameter">
          <label for="transfer">Трансфер:</label>
          <input type="checkbox" id="transfer" v-model="hasTransfer">
        </div>

        <div class="event-parameter">
          <label for="photoVideo">Фото и видеосъемка:</label>
          <input type="checkbox" id="photoVideo" v-model="hasPhotoVideo">
        </div>
      </div>
      <div class="total_price">
        <h2>Итоговая цена:</h2>
        <h1>{{ totalPrice }}</h1>
      </div>
      <div class="submit_block">
        <button class="submit-button" @click="submitApplication">Оформить заявку</button>
        <div class="error_message" v-if="submit_error !== ''">{{ submit_error }}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "EventDetails",
  data() {
    return {
      event: null, // Здесь будет храниться информация о мероприятии
      selectedMenu: "",
      selectedDecor: "",
      selectedAnimators: "",
      selectedMusic: "",
      submit_error: '',
      hasTransfer: false,
      hasPhotoVideo: false,
      availableMenus: ["Меню 1", "Меню 2", "Меню 3", "Без меню"],
      availableDecors: ["Декор 1", "Декор 2", "Декор 3", "Без декора"],
      availableAnimators: ["Аниматоры 1", "Аниматоры 2", "Аниматоры 3", "Без аниматоров"],
      availableMusic: ["Музыка 1", "Музыка 2", "Музыка 3", "Без музыки"],
      price: 0,
      totalPrice: 0,
      humanLabel: 'До 15 человек',
      Human_value: 1,
    };
  },
  created() {
    // В этом хуке вы можете получить информацию о мероприятии по его ID
    // Например, вы можете использовать axios или другую библиотеку для выполнения запроса к API
    const eventId = this.$route.params.id; // Получаем ID из URL

    // Здесь выполните запрос к вашему API для получения информации о мероприятии по eventId
    fetch('http://EventServer/GetService.php', {
      method: 'POST',
      body: JSON.stringify({
        id: eventId,
      })
    })
        .then(response => response.json())
        .then(data => {
          this.event = data[0]
          console.log(this.event)
        })
        .catch(error => console.error(error));

    // В этом примере данные о мероприятии предполагаются статическими:

  },
  methods: {
    submitApplication() {
      if (
          this.selectedMenu === "Без меню" &&
          this.selectedDecor === "Без декора" &&
          this.selectedAnimators === "Без аниматоров" &&
          this.selectedMusic === "Без музыки" &&
          !this.hasTransfer &&
          !this.hasPhotoVideo
      ) {
        this.submit_error = "Необходимо выбрать хоть что-то";
      } else {
        console.log("Заявка успешно создана");
      }
    },
    // updateHumanLabel() {
    //
    //   switch (this.Human_value) {
    //     case '1':
    //       this.humanLabel = 'До 15 человек';
    //       break;
    //     case '2':
    //       this.humanLabel = '50-100 человек';
    //       break;
    //     case '3':
    //       this.humanLabel = '100-150 человек';
    //       break;
    //     case '4':
    //       this.humanLabel = '150-200 человек';
    //       break;
    //     case '5':
    //       this.humanLabel = 'Более 200 человек';
    //       break;
    //   }
    // },
    // Добавьте методы для других параметров мероприятия
  },
  computed: {
    totalPrice() {
      let add = 0;
      if (this.selectedMenu !== "" && this.selectedMenu !== "Без меню") add += 15000;
      if (this.selectedDecor !== "" && this.selectedDecor !== "Без декора") add += 25000;
      if (this.selectedAnimators !== "" && this.selectedAnimators !== "Без аниматоров") add += 10000;
      if (this.selectedMusic !== "" && this.selectedMusic !== "Без музыки") add += 1500;
      if (this.hasTransfer) add += 10000;
      if (this.hasPhotoVideo) add += 5000;
      if (this.humanLabel) add += parseInt(this.Human_value) * 5000;

      return add;
    },
    humanLabel() {
      let label = '';
      switch (this.Human_value) {
        case '1':
          label = "До 50 человек";
          break;
        case '2':
          label = "50-100 человек";
          break;
        case '3':
          label = "100-150 человек";
          break;
        case '4':
          label = "150-200 человек";
          break;
        case '5':
          label = "Более 200 человек";
          break;
        default:
          label = "До 50 человек";
      }
      return label;
    },
  },
  watch: {

  },

};
</script>

<style scoped>
.event-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.event-title {
  font-size: 24px;
  margin-bottom: 10px;
}
.error_message {
  color: darkred;
  font-size: 16px;
}
.event-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.event-image {
  max-width: 100%;
  margin: 10px 0;
}

.event-description {
  font-size: 16px;
}

.event-parameter {
  margin-top: 20px;
}

label {
  font-weight: bold;
}

select, input[type="checkbox"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  background-color: #fff;
}

input[type="checkbox"] {
  width: auto;
  margin-right: 5px;
}
.submit-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
.parameters {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
