<template>
  <div class="wrapper" style="margin-bottom: 50px;">
    <div class="selects">
      <div class="input_label_box">
        <input type="radio" name="selectConstructor" id="wait_orders" value="wait_orders" v-model="selectedOption">
        <label for="wait_orders">Ожидающие подтверждения</label>
      </div>

      <div class="input_label_box">
        <input type="radio" name="selectConstructor" id="all_orders" value="all_orders" v-model="selectedOption">
        <label for="all_orders">Все заказы</label>
      </div>




    </div>
    <div style="text-align: center; font-size: 32px" v-if="selectedOption === null">Выберите функцию</div>
    <div v-if="selectedOption === 'wait_orders'">
      <h1>Заявки, ожидающие подтверждения:</h1>
      <div class="orders" v-if="orders.length > 0">
        <ul style="display:flex; flex-direction: column; gap: 20px; font-size: 18px;">
          <li v-for="order in orders" :key="order.id"  style="background-color: #96e0fb; border-radius: 15px; padding: 15px;">
            <h3>{{ order.date }} - {{ order.event_title }} - {{ order.place }} - {{ order.price }} руб. - {{ order.phone }} - <span style="border-bottom: 1px solid brown">{{ order.status_title }}</span>
              <button v-if="order.status_title === 'В обработке'" @click="CancelOrder(order.id)">Отменить</button></h3>
            Заказанные услуги: {{ order.additional }}
          </li>
        </ul>
      </div>
      <p v-else>Заказов пока нет</p>
    </div>
    <div v-if="selectedOption === 'all_orders'" >
      <h1>Все заявки:</h1>
      <div class="orders" v-if="orders.length > 0" >
        <ul style="display:flex; flex-direction: column; gap: 20px; font-size: 18px;">
          <li v-for="order in orders" :key="order.id" style="background-color: #96e0fb; border-radius: 15px; padding: 15px;">
            <h3>{{ order.date }} - {{ order.event_title }} - {{ order.place }} - {{ order.price }} руб. - <span style="border-bottom: 1px solid brown">{{ order.status_title }}</span></h3>
            Заказанные услуги: {{ order.additional }}
          </li>
        </ul>
      </div>
      <p v-else>Заказов пока нет</p>
    </div>
    <!--    <HotelConstructor v-if="selectedOption === 'hotel'"/>-->
  </div>
</template>

<script>
export default {
  name: "OrdersControl",
  data() {
    return {
      selectedOption: '',
      orders: [],
    }
  },
  mounted() {

  },
  watch: {
    selectedOption() {
      if (this.selectedOption === 'wait_orders') {
        fetch('http://EventServer/GetWaitOrders.php', {
          method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
              this.orders = data
            })
            .catch(error => console.error(error));
      }
      if (this.selectedOption === 'all_orders') {
        fetch('http://EventServer/GetOrders.php', {
          method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
              this.orders = data
            })
            .catch(error => console.error(error));
      }
    }
  },
}
</script>

<style scoped>
h3 {
  margin-top: 5px;
}
.selects {
  display: flex;
  gap: 10px;
  padding: 10px;
  flex-wrap: wrap;
}

input[type="radio"] {
  display: none;
}

label {
  border: 1px solid #ff4a94;
  padding: 10px;
}

/* Стили для активного состояния input radio */
input[type="radio"]:checked + label {
  background-color: #ff4a94;
}

label:hover {
  cursor: pointer;
}
</style>