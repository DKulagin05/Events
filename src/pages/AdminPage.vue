<template>
  <div class="wrapper" style="margin-bottom: 50px;">
    <div class="selects">
      <div class="input_label_box">
        <input type="radio" name="selectConstructor" id="promo" value="orders" v-model="selectedOption">
        <label for="promo">Управление заказами</label>
      </div>

      <div class="input_label_box">
        <input type="radio" name="selectConstructor" id="hotel" value="hotel" v-model="selectedOption">
        <label for="hotel">Создать отель</label>
      </div>




    </div>
    <div style="text-align: center; font-size: 32px" v-if="selectedOption === null">Выберите функцию</div>
    <OrdersControl v-if="selectedOption === 'orders'"/>
<!--    <HotelConstructor v-if="selectedOption === 'hotel'"/>-->
  </div>
</template>

<script>
import OrdersControl from '@/components/OrdersControl.vue';
// import HotelConstructor from "@/components/HotelConstructor.vue";

export default {
  name: "AdminPage",
  components: {
    OrdersControl,
    // HotelConstructor,
  },
  data() {
    return {
      selectedOption: null,
      user: null
    }
  },
  watch: {

  },
  methods: {
  },
  mounted() {
    // if (localStorage.getItem('user')) {
    //   this.user = localStorage.getItem('user')
    // } else {
    //   this.user = {
    //     admin: 0
    //   }
    // }
    // if (this.user.admin === '1') {
    // } else {
    //   this.$router.push('/auth')
    // }
  }
}
</script>

<style scoped>
.selects {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}

input[type="radio"] {
  display: none;
}

label {
  border: 1px solid #00BFFF;
  padding: 15px;
}

/* Стили для активного состояния input radio */
input[type="radio"]:checked + label {
  background-color: #00BFFF;
}

label:hover {
  cursor: pointer;
}
</style>