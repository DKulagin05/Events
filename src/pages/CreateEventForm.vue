<template>
  <div class="create-event-form">
    <h1>Создать мероприятие</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Название</label>
        <input type="text" class="form-control" id="title" v-model="event.title">
      </div>
      <div class="form-group">
        <label for="description">Описание</label>
        <textarea class="form-control" id="description" v-model="event.description"></textarea>
      </div>
      <div class="form-group">
        <label for="human_value">Количество человек: </label>
        <p>{{ humanLabel }}</p>
        <input type="range" id="human_value" min="1" max="5" step="1" v-model="Human_value" name="human_value">
      </div>
      <div class="form-group">
        <label for="date">Дата</label>
        <input type="date" class="form-control" id="date" v-model="event.date">
      </div>
      <div class="form-group">
        <label for="time">Время</label>
        <input type="time" class="form-control" id="time" v-model="event.time">
      </div>
      <div class="form-group">
        <label for="location">Место</label>
        <input type="text" class="form-control" id="location" v-model="event.location">
      </div>

      <div class="form-group">
        <input type="checkbox" id="access_status">
        <label for="access_status">Сделать мероприятие доступным на сайте?<span>*</span></label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="confirmation">
        <label for="confirmation">Вы согласны с <a href="#">Условиями использования</a></label>
      </div>
      <button type="submit" class="btn btn-primary">Создать</button>
    </form>
  </div>
</template>

<script>
export default {

  name: "CreateEventForm",
  data() {
    return {
      event: {
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        price: "",
        humanLabel: 'До 50 человек',
        Human_value: 1,
      },
    };
  },
  methods: {

    onSubmit() {
      console.log(this.Human_value + " " + this.humanLabel);
      // Проверка данных

      // Отправка запроса на сервер

    },
  },
  computed: {
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
      console.log(this.Human_value)
      return label;
    },
  },

};
</script>

<style scoped>
.create-event-form {
  width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 10px;
}
input[type="checkbox"] {
  margin: 0 10px 0 0;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px 0 30px 0;
}

.form-error {
  color: red;
}
</style>