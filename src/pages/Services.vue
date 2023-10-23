<template>
  <div class="wrapper">
    <div class="services_list">
      <div
          class="service-item"
          v-for="service in services"
          :key="service.id"
          @click="onItemClick(service.id)"
      >
          <div class="service_title">{{ service.title }}</div>
          <img :src="'src/assets/img/' + service.img" alt="Service Image" />
          <div class="description">
            <div class="overlay"></div>
            <p>{{ service.description }}</p>
          </div>


<!--        Тематическая свадьба: стоимость создания темы свадьбы может составлять от 10000 до 50000 рублей.-->
<!--        Детский праздник: стоимость меню для детского праздника может составлять от 500 рублей на ребенка.-->
<!--        Корпоративный вечер: стоимость декора для корпоративного вечера может составлять от 10000 рублей.-->
<!--        Новогодний корпоратив: стоимость услуг аниматоров для новогоднего корпоратива может составлять от 10000 рублей за вечер.-->
<!--        Юбилей: стоимость трансфера для гостей юбилея может составлять от 10000 рублей.-->
<!--        Свадебная фотосессия: стоимость свадебной фотосессии может составлять от 20000 рублей.-->

      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: "Services",
  data() {
    return {
      services: [
        {
          id: 1,
          image: 'test.jpg',
          title: 'Организация свадьбы',
          description: 'Мы поможем вам организовать свадьбу вашей мечты!',
        },
        {
          id: 2,
          image: 'test2.png',
          title: 'Организация корпоративного мероприятия',
          description: 'Мы организуем корпоративное мероприятие, которое запомнится вашим сотрудникам!',
        },
        {
          id: 3,
          image: 'test3.jpg',
          title: 'Организация детского праздника',
          description: 'Мы поможем вам организовать детский праздник, который понравится вашему ребенку!',
        },
      ],
    };
  },
  methods: {
    onItemClick(id) {
      // Обработка клика
      this.$router.push(`/event/${id}`);
    },
  },
  created() {
    fetch('http://EventServer/GetAllServices.php', {
      method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
          this.services = data
        })
        .catch((error) => console.error(error));
  }
}
</script>

<style scoped>

.services_list {
  display: grid;
  grid-template-columns: repeat(2, 0.5fr); /* Два элемента в строке */
  gap: 20px; /* Расстояние между элементами */
  justify-items: center;
}
.service-item {
  position: relative;
  width: 600px;
  height: 400px;
  margin: 10px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.service_title {
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
}
.description {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  text-align: center;
  transition: 0.3s;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  transition: 0.3s;
}

.service-item:hover .overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>