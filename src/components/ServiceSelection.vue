<template>
  <div>
    <h3>{{ category }}</h3>
    <div v-for="service in services" :key="service.name">
      <input type="checkbox" :id="service.name" v-model="service.selected" @change="updateServices">
      <label :for="service.name">{{ service.name }}</label>
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