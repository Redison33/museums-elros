<template>
  <main>
    <div class="inputWrap">
      <label for="name">Полное наименование</label>
      <input :value="newName" @input="newName = $event.target.value" type="text" id="name" />
      <span v-if="errors.newName" class="error">Поле не должно быть пустым</span>
    </div>
    <div class="inputWrap">
      <label for="shortName">Краткое наименование</label>
      <input
        :value="newShortName"
        @input="newShortName = $event.target.value"
        type="text"
        id="shortName"
      />
      <span v-if="errors.newShortName" class="error">Поле не должно быть пустым</span>
    </div>
    <div class="inputWrap">
      <label for="description">Описание</label>
      <textarea
        :value="description"
        @input="description = $event.target.value"
        name=""
        id="description"
        cols="30"
        rows="10"
      ></textarea>
      <span v-if="errors.description" class="error">Поле не должно быть пустым</span>
    </div>
    <div>
      <button class="buttonBack" @click="$router.push('/')">Назад</button>
      <button class="buttonAdd" @click="addMuseum">Добавить</button>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      newName: '',
      newShortName: '',
      description: '',
      errors: {
        newName: false,
        newShortName: false,
        description: false,
      },
    };
  },
  methods: {
    addMuseum() {
      if (this.validateForm()) {
        axios
          .post('https://developer3.elros.info/api/v1/museums/', {
            name: this.newName,
            short_name: this.newShortName,
            description: this.description,
            is_active: true,
          })
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => {
            console.error('Ошибка при добавлении музея:', error);
          });
      }
    },
    validateForm() {
      this.errors.newName = !this.newName;
      this.errors.newShortName = !this.newShortName;
      this.errors.description = !this.description;
      return !(this.errors.newName || this.errors.newShortName || this.errors.description);
    },
  },
};
</script>
<style scoped>
main {
  margin-top: 20px;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.inputWrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  border: none;
  background-color: #f6f6f6;
  color: black;
  height: 50px;
  font-size: large;
}
textarea {
  border: none;
  background-color: #f6f6f6;
  color: black;
  height: 100px;
  font-size: large;
  resize: none;
}
button {
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: larger;
}
.buttonBack {
  background-color: #e6f1fc;
  color: #5daaf0;
}
.buttonAdd {
  background-color: #def2e7;
  color: #4bbb7e;
}
.error {
  color: red;
  font-size: smaller;
}
</style>
