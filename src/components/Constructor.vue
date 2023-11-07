<template>
  <div class="selects">
    <div class="input_label_box">
      <input type="radio" name="selectConstructor" id="create_service" value="create_service" v-model="selectedOption">
      <label for="create_service">Создать мероприятие</label>
    </div>

    <div class="input_label_box">
      <input type="radio" name="selectConstructor" id="edit_service" value="edit_service" v-model="selectedOption">
      <label for="edit_service">Редактировать мероприятие</label>
    </div>

    <div class="input_label_box">
      <input type="radio" name="selectConstructor" id="remove_service" value="remove_service" v-model="selectedOption">
      <label for="remove_service">Удалить мероприятие</label>
    </div>
  </div>




  <div style="text-align: center; font-size: 32px" v-if="selectedOption === null">Выберите функцию</div>


  <div v-if="selectedOption === 'create_service'" class="create-service">
    <h1 class="create-service-title">Создать Мероприятие:</h1>
    <div class="input-fields" v-if="Categories.length > 0">
      <input type="text" placeholder="Название" v-model="title" class="input-field">
      <input type="text" placeholder="Описание" v-model="description" class="input-field">
      <input type="number" placeholder="Цена" v-model="price" class="input-field">
      <select name="category" class="category-select" v-model="category">
        <option value="null" disabled selected>Выберите категорию мероприятия</option>
        <option v-for="category in Categories" :value="category.id">{{ category.name }}</option>
      </select>
      <input type="file" @change="EditImgSelected1" class="edit_img" name="edit_profile_img_1" id="edit_profile_img_1">
      <button class="Usually_Button" @click="CreateEvent">Создать</button>
    </div>
    <p v-else class="no-orders-message">Создавать пока нельзя!</p>
  </div>


  <div v-if="selectedOption === 'edit_service'">
    <h1>Редактировать мероприятие:</h1>
    <div class="">
      <p>Введите id или название мероприятия</p>
      <input type="text" placeholder="" v-model="EditEventId">
      <button class="Accept_Button" @click="FindEditEvent(EditEventId)">Найти объект</button>
    </div>
    <div class="orders">
      <table>
        <thead>
        <tr class="table_row">
          <th>Название</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Категория</th>
          <th>Изображение</th>
        </tr>
        </thead>
        <tbody>
          <tr class="table_row" v-if="ItemEditVisibility">
            <td class="table_column">{{ EditEvent.title }}</td>
            <td class="table_column">{{ EditEvent.description }}</td>
            <td class="table_column">{{ EditEvent.price }}</td>
            <td class="table_column">{{ Categories[EditEvent.id_category-1].name || 'Категория не найдена' }}</td>
            <td class="table_column table_img"><img :src="EditEvent.img" alt="Изображение" class="correct_img"></td>
            <td class="table_column">
              <button class="Usually_Button" style="font-size: 16px; padding: 10px" @click="EditEventFun(EditEvent)">Редактировать</button>
            </td>
          </tr>

          <tr class="table_row" v-if="editingEventId !== null">
            <td class="table_column">
              <input type="text" v-model="editingEvent.title">
            </td>
            <td class="table_column">
              <textarea name="description" v-model="editingEvent.description" id="editEvent" cols="30" rows="10"></textarea>
            </td>
            <td class="table_column">
              <input type="number" v-model="editingEvent.price">
            </td>
            <td class="table_column">
              <select v-model="editingEvent.id_category">
                <option v-for="category in Categories" :value="category.id">{{ category.name }}</option>
              </select>
            </td>
            <td class="table_column table_img">
              <input type="file" @change="EditImgSelected2" class="edit_img" name="edit_profile_img_2" id="edit_profile_img_2">
            </td>
            <td class="table_column">
              <button class="Accept_Button" @click="SaveEventChanges()">Сохранить</button>
              <button class="Cancel_Button" @click="CancelEdit">Отменить</button>
            </td>
          </tr>
          <div style="font-size: 32px; margin: 30px">Все мероприятия:</div>

          <tr class="table_row" v-for="(event, index) in paginatedEvents" :key="index">
            <td class="table_column">{{ event.title }}</td>
            <td class="table_column">{{ event.description }}</td>
            <td class="table_column">{{ event.price }}</td>
            <td class="table_column">{{ Categories[event.id_category-1].name || 'Категория не найдена' }}</td>
            <td class="table_column table_img"><img :src="event.img" alt="Изображение" class="correct_img"></td>
            <td class="table_column">
              <button class="Usually_Button" style="font-size: 16px; padding: 10px" @click="EditEventChange(event)">Выбрать для редактирования</button>
            </td>
          </tr>


        </tbody>

      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Предыдущая</button>
        <span>Страница {{ currentPage }} из {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Следующая</button>
      </div>

    </div>
<!--    <p v-else class="no-orders-message">Нет доступных мероприятий для редактирования.</p>-->
  </div>



  <div v-if="selectedOption === 'remove_service'" >
    <h1>Удалить мероприятие:</h1>
    <div class="">
      <p>Введите id или название мероприятия</p>
      <input type="text" placeholder="" v-model="RemoveEventId">
      <button class="Accept_Button" @click="FindRemoveEvent">Найти объект</button>
    </div>
    <div class="orders" v-if="ItemVisibility">
      <table >
        <thead>
        <tr class="table_row">
          <th>Название</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Категория</th>
          <th>Изображение</th>
        </tr>
        </thead>
        <tbody >
        <tr class="table_row">
          <td class="table_column">{{ RemoveEvent.title }}</td>
          <td class="table_column">{{ RemoveEvent.description }}</td>
          <td class="table_column">{{ RemoveEvent.price }}</td>
          <td class="table_column">{{ Categories[RemoveEvent.id_category]?.name || 'Категория не найдена' }} </td>
          <td class="table_column table_img"><img :src="RemoveEvent.img" alt="Изображение" class="correct_img"></td>
          <td class="table_column"><button class="Cancel_Button" @click="RemoveEventFunc(RemoveEvent.id)">Удалить</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <h1 v-else class="no-orders-message">Ничего не найдено</h1>
  </div>


</template>

<script>
export default {
  name: "Constructor",
  data() {
    return {
      selectedOption: '',
      orders: [],
      Events: [],
      Categories: [],
      title: null,
      description: null,
      price: null,
      category: null,
      selectedImg: null,

      RemoveEventId: null,
      RemoveEvent: {},
      ItemVisibility: false,

      EditEventId: null,
      ItemEditVisibility: false,
      EditEvent: null,
      editingEventId: null,
      editingEvent: {
        id: '',
        title: '',
        description: '',
        price: null,
        id_category: null,
        img: null, // Здесь также можете добавить img, если нужно
      },

      currentPage: 1, // Текущая страница
      itemsPerPage: 10, // Количество элементов на странице
    }
  },
  methods: {
    EditEventFun(event) {
      this.editingEvent = {...event};
      this.editingEventId = this.editingEvent.id
      // Найти мероприятие с указанным ID и установить его как активное для редактирования
    },
    SaveEventChanges() {
      // Сохранить отредактированные данные мероприятия
      const formDataEdit = new FormData();
      formDataEdit.append('id', this.editingEvent.id)
      formDataEdit.append('EditCategory', this.editingEvent.id_category)
      formDataEdit.append('EditPrice', this.editingEvent.price)
      formDataEdit.append('EditDescription', this.editingEvent.description)
      formDataEdit.append('EditTitle', this.editingEvent.title)
      formDataEdit.append('EditImg', this.editingEvent.img)
      fetch('http://EventServer/UpdateEvent.php', {
        method: 'POST',
        body: formDataEdit
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
          .catch((error) => console.error(error));


      // Очистить данные редактирования и сделать мероприятие неактивным для редактирования
      this.editingEventId = null;
      this.editingEvent = {
        title: '',
        description: '',
        price: null,
        id_category: null,
        img: null,
      };
    },

    CancelEdit() {
      this.editingEvent = {};
      this.editingEventId = null;
    },

    FindRemoveEvent() {

        fetch('http://EventServer/GetService.php', {
          method: 'POST',
          body: JSON.stringify({
            id: this.RemoveEventId,
          })
        })
            .then(response => response.json())
            .then(data => {
              this.RemoveEvent = data[0]
              this.ItemEditVisibility = true;

            })
            .catch(error => console.error(error));
    },
    EditEventChange(event) {
      this.editingEventId = null;
      this.FindEditEvent(event.id)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    FindEditEvent(id) {
        fetch('http://EventServer/GetService.php', {
          method: 'POST',
          body: JSON.stringify({
            id: id,
          })
        })
            .then(response => response.json())
            .then(data => {
              this.EditEvent = data[0]
              this.ItemEditVisibility = true;
            })
            .catch(error => console.error(error));
    },
    RemoveEventFunc(id) {
      if (confirm("Вы уверены что хотите удалить мероприятие с id = " + id)) {
        fetch('http://EventServer/RemoveEvent.php', {
          method: 'POST',
          body: JSON.stringify({
            id: id,
          })
        })
            .then(response => response.json())
            .then(data => {
              console.log('Успешно удалено')
            })
            .catch(error => console.error(error));
      }
    },
    EditImgSelected1(event) {
      this.selectedImg = event.target.files[0]
    },
    EditImgSelected2(event) {
      // Обработчик выбора изображения
      this.editingEvent.img = event.target.files[0];
    },

    CreateEvent() {
    const formDataCreate = new FormData();
    formDataCreate.append('createTitle', this.title)
    formDataCreate.append('createDescription', this.description)
    formDataCreate.append('CreatePrice', this.price)
    formDataCreate.append('CreateCategory', this.category)
    formDataCreate.append('CreateImg', this.selectedImg)
    fetch('http://EventServer/CreateEvent.php', {
      method: 'POST',
      body: formDataCreate,
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert(data.message)
          } else {
            alert(data.message)
          }
        })
          .catch(error => console.log(error));
    },



    // Перейти на предыдущую страницу
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Перейти на следующую страницу
    nextPage() {
      const totalPages = Math.ceil(this.Events.length / this.itemsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
      }
    },
  },
  computed: {
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.Events.slice(start, end);
    },
    // Вычисление общего количества страниц
    totalPages() {
      return Math.ceil(this.Events.length / this.itemsPerPage);
    },
  },
  mounted() {

  },
  created() {
    fetch('http://EventServer/GetAllCategories.php', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
          this.Categories = data
        })
        .catch(error => console.error(error));

    fetch('http://EventServer/GetAllEvents.php', {
      method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
          this.Events = data
        })
        .catch((error) => console.error(error));
  }
}
</script>

<style scoped>
h3 {
  margin-top: 5px;
}
h4 {
  font-weight: normal;
  margin: 10px;
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
li {
  list-style-type: none;
}
/* Стили для активного состояния input radio */
input[type="radio"]:checked + label {
  background-color: #ff4a94;
}

label:hover {
  cursor: pointer;
}


</style>