<template>
  <div class="wrapper">

    <div style="margin-bottom: 50px;">
      <h1>Сортировка</h1>
      <div class="selects">
        <div class="input_label_box">
          <p>По категориям</p>
          <select id="category" v-model="filters.category">
            <option value="all" selected>Все</option>
            <option :value="category.id" v-for="category in categories">{{category.name}}</option>
          </select>
        </div>
        <div class="input_label_box">
          <p>По цене</p>
          <select id="price" v-model="filters.price">
            <option value="1" selected>От дорогих к дешевым</option>
            <option value="2" selected>От дешевых к дорогим</option>
          </select>
        </div>
        <div class="input_label_box">
          <p>По названию</p>
          <input type="text" id="name" placeholder="Название или описание" v-model="filters.name">
        </div>
      </div>

      <div class="services_list" v-if="services.length > 0">
        <div
            class="service-item"
            v-for="(service, index) in paginatedServices"
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
      <div class="pagination" style="display:flex; justify-content: center; gap: 10px" v-if="services.length > 5">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">←</button>
        <button
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            @click="goToPage(pageNumber)"
        >{{ pageNumber }}</button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">→</button>
      </div>
      <div class="alert_message" v-else>Ничего не найдено</div>

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
      filters: {
        price: 0,
        category: 'all',
        name: '',
      },
      currentPage: 1, // Текущая страница
      itemsPerPage: 6, // Количество элементов на странице
    };
  },
  methods: {
    onItemClick(id) {
      // Обработка клика
      this.$router.push(`/event/${id}`);
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    fetchData() {
      fetch('http://EventServer/GetEvents.php', {
        method: 'POST',
        body: JSON.stringify({
          id: this.filters.category,
          price: this.filters.price,
          name: this.filters.name
        })
      })
          .then(response => response.json())
          .then(data => {
            if (typeof(data) === 'string') {
              this.services = ''
            } else {
              this.services = data
              this.currentPage = 1
            }
          })
          .catch(error => console.error(error));
    }
  },
  computed: {
    // Вычисляемое свойство для получения отфильтрованных и пагинированных услуг
    paginatedServices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.services.slice(start, end);
    },
    // Вычисляемое свойство для определения общего числа страниц
    totalPages() {
      return Math.ceil(this.services.length / this.itemsPerPage);
    },
  },
  watch: {
    filters: {
      handler: function (newFilters, oldFilters) {
        // Обработка изменений всех свойств filters

        if (this.fetchDataTimeout) {
          clearTimeout(this.fetchDataTimeout);
        }

        this.fetchDataTimeout = setTimeout(() => {
          this.fetchData();
        }, 500); // Установить желаемую задержку в миллисекундах (например, 500 мс)

      },
      deep: true, // Глубокое наблюдение
    },

  },
  mounted() {
    this.fetchData()
  },
  created() {
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

.selects {
  display: flex;
  gap: 25px;
  align-items: center;
  margin-bottom: 20px;
}

.input_label_box {
  margin-right: 20px;
}

p {
  margin: 0;
  font-weight: bold;
}

select, input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* Стили для select */
select {
  background-color: #fff;
  cursor: pointer;
}

/* Стили для input */
input {
  background-color: #f9f9f9;
}

/* Оформление выделенных элементов в select */
select option:checked {
  background-color: #007bff;
  color: #fff;
}

/* Дополнительные стили для select при наведении */
select:hover {
  border-color: #007bff;
}

/* Дополнительные стили для input при фокусе */
input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>