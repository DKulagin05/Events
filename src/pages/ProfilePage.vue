<template>
  <Header />
  <div class="container">
    <div class="wrapper">
      <div v-if="CategoryArray.length > 0">
        <h1>Личный кабинет</h1>
        <h2>Добро пожаловать, {{ user.name }}!</h2>
<!--        <p class="status">Статус клиента: {{ CategoryArray[user.client_category_id - 1] }}</p>-->

        <h3>Детали профиля:</h3>
        <div v-if="!editMode">
          <ul style="font-size: 18px; display:flex; flex-direction: column; gap: 5px">
            <li><strong>ФИО:</strong> {{ user.name }} {{ user.surname }}</li>
            <li><strong>Номер телефона:</strong> {{ user.phone }}</li>
            <li><strong>Почта:</strong> {{ user.email }}</li>
<!--            <li><strong>Дата рождения:</strong> {{ user.birthday ?? 'Неизвестно' }}</li>-->
<!--            <li><strong>Всего потрачено:</strong> {{ totalSpent }} руб.</li>-->
          </ul>
          <button class="Usually_Button" @click="toggleEditMode">Редактировать</button>
        </div>
        <div v-else class="edit-container">
          <label for="name">Имя:</label>
          <input type="text" id="name" v-model="editedUser.name" required>
          <label for="surname">Фамилия:</label>
          <input type="text" id="surname" v-model="editedUser.surname" required>
          <label for="phone">Номер телефона:</label>
          <input type="text" id="phone" v-model="editedUser.phone" required>
          <label for="email">Почта:</label>
          <input type="text" id="email" v-model="editedUser.email" required>
          <div class="edit-btn">
            <button class="Accept_Button" @click="saveChanges">Сохранить</button>
            <button class="Cancel_Button" @click="cancelEdit">Отмена</button>
          </div>
        </div>
        <h3>Ваши заказы:</h3>
        <div class="orders" v-if="orders.length > 0">
          <ul style="display:flex; flex-direction: column; gap: 20px; font-size: 18px;">
            <li v-for="order in orders" :key="order.id" style="">
                          <h3>{{ order.date }} - {{ order.event_title }} - {{ order.place }} - {{ order.price }} руб. - <span style="border-bottom: 1px solid brown">{{ order.status_title }}</span>
              <button class="Cancel_Button" v-if="order.status_title === 'В обработке'" @click="CancelOrder(order.id, order.event_title)">Отменить</button></h3>
                          <h4><strong>Ваш комментарий:</strong> {{ order.comment }}</h4>
                          <h4><strong>Заказанные услуги:</strong> {{ order.additional }}</h4>
            </li>
          </ul>
        </div>
        <p v-else>Заказов пока нет</p>
      </div>
      <p v-else>Загрузка</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: 'UserProfile',
  components: {
    Header
  },
  data() {
    return {
      user: {
        name: 'user',
        surname: 'surname',
        email: 'email',
        phone: 8123456789,
      },
      editedUser: {},
      CategoryArray: [
          1,2,3,4
      ],
      orders: [],
      editMode: false,
    };
  },
  computed: {
    totalSpent() {
      // return this.orders.reduce((total, order) => total + parseFloat(order.total_price), 0);
    },
  },
  methods: {
    CancelOrder(id, name) {
      if (confirm('Вы уверены что хотите отменить заказ ' + name)) {
        fetch('http://EventServer/ActionOrder.php', {
          method: 'POST',
          body: JSON.stringify({
            id: id,
            type: 'Cancel',
          })
        })
            .then(response => response.json())
            .then(data => {
              alert("Успешно отменено")
              window.location.reload();
            })
            .catch(error => console.error(error));
      }
    },
    // checkStatus(date) {
    //   const objectDate = new Date(date);
    //   const currentDate = new Date();
    //
    //   if (objectDate < currentDate) {
    //     return 'Завершен';
    //   } else {
    //     return 'В процессе';
    //   }
    // },
    toggleEditMode() {
      this.editMode = !this.editMode;
      this.editedUser = { ...this.user };
    },
    // saveChanges() {
    //   fetch('http://practic/src/api/EditUser.php', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       id_user: this.editedUser.client_id,
    //       name: this.editedUser.client_name,
    //       phone: this.editedUser.client_phone,
    //       birthday: this.editedUser.birthday
    //     })
    //   })
    //       .then(response => response.json())
    //       .then(data => {
    //         alert(data);
    //         fetch('http://practic/src/api/Login.php', {
    //           method: 'POST',
    //           body: JSON.stringify({
    //             phone: this.editedUser.client_phone,
    //             password: this.user.password,
    //           })
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //               localStorage.clear();
    //               localStorage.setItem('user', JSON.stringify(data));
    //               location.reload();
    //             })
    //             .catch(error => console.error(error));
    //       })
    //       .catch(error => console.error(error));
    //
    //   this.user = { ...this.editedUser };
    //   this.editMode = false;
    // },
    cancelEdit() {
      this.editMode = false;
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));

    fetch('http://EventServer/GetUserOrders.php', {
      method: 'POST',
      body: JSON.stringify({
        id_user: this.user.id
      })
    })
        .then(response => response.json())
        .then(data => {
          this.orders = data.sort((a, b) => b.id - a.id);
        })
        .catch(error => console.error(error));
  }
};
</script>

<style scoped>

.container {
  background-color: #f0f5f9; /* Светло-голубой фон контейнера */
  padding: 20px;
}

/* Стили для страницы "Личный кабинет" */
.wrapper {
  margin: 0 auto;
  padding: 20px;
  background-color: #EAF5FF;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
  font-size: 18px;
}

ul {
  margin-left: 20px;
}
h4 {
  font-weight: normal;
}
.status {
  color: #0066CC;
  font-weight: bold;
}

.edit-button {
  margin-bottom: 10px;
}

.edit-button,
.save-button,
.cancel-button {
  background-color: #00bfff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 10px;
}

.edit-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 250px;
  margin-left: 50px;
  font-weight: bold;
}

.edit-btn {
  display: flex;
  justify-content: space-around;
}

.Usually_Button {
  font-size: 16px;
  padding: 5px 10px;
}

/* Адаптивный дизайн для ширины экрана до 600px */
@media screen and (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .wrapper {
    padding: 10px;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 18px;
  }

  ul {
    margin-left: 10px;
  }

  .edit-container {
    max-width: 200px;
    margin-left: 30px;
  }
}
</style>
