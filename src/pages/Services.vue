<template>
  <div class="wrapper">
    <div class="service_header">
      <h1>Выберите мероприяите из предложенных</h1>
      <h2>Или создайте свое <router-link to="/CreateForm">Создать</router-link></h2>
    </div>

    <div style="margin-bottom: 50px;">
      <div class="selects" >
        <div class="" v-for="category in categories" >
          <div class="input_label_box">
            <input type="radio" name="selectConstructor" :id="category.id" :value="category.id" v-model="selectedOption">
            <label :for="category.id">{{ category.name }}</label>
          </div>
        </div>
      </div>

      <div class="services_list">
        <div
            class="service-item"
            v-for="service in services"
            :key="service.id"
            @click="onItemClick(service.id)"
        >
          <div class="service_title">{{ service.title }}</div>
          <img :src="service.img" alt="Service Image" />
          <div class="description">
            <div class="overlay"></div>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
      <div style="text-align: center; font-size: 32px" v-if="selectedOption === null">Выберите категорию</div>

    </div>
  </div>
</template>

<script>
export default {

  name: "Services",
  data() {
    return {
      selectedOption: null,
      categories: [],
      services: [],
    };
  },
  methods: {
    onItemClick(id) {
      // Обработка клика
      this.$router.push(`/event/${id}`);
    },
  },
  watch: {
    selectedOption() {
      fetch('http://EventServer/GetCategory.php', {
        method: 'POST',
        body: JSON.stringify({
          id: this.selectedOption
        })
      })
          .then(response => response.json())
          .then(data => {
            this.services = data
          })
          .catch(error => console.error(error));
    }
  },
  created() {
    // fetch('http://EventServer/GetAllServices.php', {
    //   method: 'GET',
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       this.services = data
    //     })
    //     .catch((error) => console.error(error));

    fetch('http://EventServer/GetAllCategories.php', {
      method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
          this.categories = data
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