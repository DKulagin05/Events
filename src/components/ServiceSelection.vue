<template>
  <div>
    <h3>{{ category }}</h3>
    <div v-for="service in services" :key="service.name" class="services_block">
      <input type="checkbox" :id="service.name" v-model="service.selected" @change="updateServices" class="tgl tgl-flip">
      <label :for="service.name" data-tg-off="Нет" data-tg-on="Да" class="tgl-btn" ></label>
      <h4 class="service_label">{{ service.name }}</h4>

    </div>
  </div>
</template>

<script>
export default {
  props: ['category', 'services'],
  methods: {
    updateServices() {
      this.$emit('change', this.services); // Вызываем событие 'change' и передаем массив сервисов
    }
  },
};
</script>