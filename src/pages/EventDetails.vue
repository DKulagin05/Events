<template>
  <Header/>
  <div class="wrapper">
    <div class="event-details">
      <h2>Детали мероприятия</h2>
      <div class="event-info" v-if="event">
        <div class="event-title">{{ event.title }}</div>
        <img :src="event.img" :alt="event.img" class="correct_img"/>
        <div class="event-description">
          <h1>Описание мероприятия</h1>
          <p>{{ event.description }}</p>
        </div>
      </div>
      <div class="" v-else>Загрузка...</div>
    </div>

    <div class="parameters">
      <div class="parameters_style">
        <service-selection
            v-for="category in serviceCategories"
            :key="category.category"
            :category="category.category"
            :services="category.services"
            v-model="category.services"
            @change="handleSelectionChanged"
        ></service-selection>
      </div>
<!--      <button @click="showSelectedServices">Показать выбранные услуги</button>-->
      <div class="event_place event-parameter">
        <label for="place">Адрес проведения мероприятия<span class="red">*</span></label>
        <input type="text" id="place" placeholder="ул. Примерная д. 8 кв. 12" v-model="event_place">
      </div>

      <div class="event_comment event-parameter">
        <label for="comment">Добавить комментарий к заявке</label>
        <textarea  id="comment" placeholder="Хочу чтобы были лебеди!" v-model="event_comment"></textarea>
      </div>

      <div class="event_date event-parameter">
        <label for="date">Дата проведения мероприятия<span class="red">*</span></label>
        <input type="date" id="date" v-model="event_date" @change="checkDate()">
        <div class="error_message" v-if="date_error !== ''">{{ date_error }}</div>
      </div>

      <div class="total_price">
        <h2>Примерная цена:</h2>
        <h1>{{ totalPrice }} р</h1>
      </div>

      <div class="submit_block">
        <button class="Usually_Button" @click="submitApplication">Оформить заявку</button>
        <div class="error_message" v-if="submit_error !== ''">{{ submit_error }}</div>
      </div>
    </div>


  </div>
</template>

<script>
import ServiceSelection from "../components/ServiceSelection.vue";
import Header from "../components/Header.vue";
export default {
  components: {
    'service-selection': ServiceSelection,
    Header,
  },
  name: "EventDetails",
  data() {
    return {
      user: null,
      event: null,
      submit_error: '',
      date_error: '',
      event_comment: '',
      event_id: 0,
      price: 0,
      totalPrice: 0,
      event_place: '',
      event_date: null,
      serviceCategories: [],
      selectedServices: [],
    };
  },
  methods: {
    checkDate() {
      const currentDate = new Date()
      const checkEventDate = new Date(this.event_date)
      if (checkEventDate < currentDate.setDate(currentDate.getDate() + 7)) {
        this.date_error = "Дата должна быть выбрана минимум за неделю!";
      } else if (checkEventDate > currentDate.setDate(currentDate.getDate() + 365)) {
        this.date_error = "Дата должна быть максимум за год"
      }
    },
    handleSelectionChanged() {
      this.selectedServices = this.serviceCategories
          .flatMap(category => category.services.filter(service => service.selected))
          .map(service => service.name);
    },
    submitApplication() {
      if (this.user === null) {
        this.submit_error = "Необходимо войти в аккаунт";
      } else {
        if (this.event_place === '') {
          this.submit_error = "Укажите адрес мероприятия";
        } else if (this.event_date === null){
          this.submit_error = "Укажите дату мероприятия";
        } else {
          if (this.event_comment === '' ) this.event_comment = "Без комментария"
          fetch('http://EventServer/CreateOrder.php', {
            method: 'POST',
            body: JSON.stringify({
              id_user: this.user.id,
              id_event: this.event_id,
              date: this.event_date,
              place: this.event_place,
              price: this.totalPrice,
              comment: this.event_comment,
              additional: this.selectedServices.join(', ')
            })
          })
              .then(response => response.json())
              .then(data => {
                alert(data);
                this.$router.push('/profile')
              })
              .catch(error => console.error(error));
        }
      }
    },
  },
  computed: {
    totalPrice() {
      if (this.event) {
        let add = parseInt(this.event.price);
        add += this.selectedServices.length * 5000
        // Добавьте другие вычисления для цены
        this.totalPrice = add;
        return add;
      } else return 0;

    },
  },
  created() {
    const eventId = this.$route.params.id; // Получаем ID из URL
    this.event_id = eventId;
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
        })
        .catch(error => console.error(error));

    fetch('http://EventServer/GetAllServices.php', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
          this.serviceCategories = data
        })
        .catch(error => console.error(error));

  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
};
</script>

<style scoped>
.event-details {
  max-width: 1080px;

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
.parameters_style {
  display: grid;
  grid-template-columns: repeat(2, 0.5fr);
  gap: 20px;
}
.event-description {
  font-size: 16px;
}

.event-parameter {
  margin-top: 20px;
}
.event_place {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.event_comment {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.event_comment textarea {
  resize: none;
  padding: 10px;
}
.event_place input {
  height: 40px;
  padding: 5px 10px;
  /*opacity: 0.8;*/
}
.event_date {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.event_date input {
  height: 40px;
  padding: 5px 10px;
  max-width: 130px;
}
label {
  font-weight: bold;
  font-size: 18px;
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
.total_price {
  margin: 20px 0;
}
input[type="checkbox"] {
  width: auto;
  margin-right: 5px;
}
.submit_block {
  margin: 0 0 50px 0;
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
  max-width: 920px;
  margin: 0 auto;
}
.event-info img {
  height: 500px;
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
}

</style>
