<template>
  <div class="museumGrid">
    <p>{{ id }}</p>
    <p>{{ name }}</p>
    <div class="isActiveWrap">
      <span v-if="is_active" class="isActive isActiveTrue">Да</span>
      <span v-else class="isActive isActiveFalse">Нет</span>
    </div>
    <button @click="deleteMuseum">удалить</button>
  </div>
</template>
<script>
export default {
  props: { id: Number, name: String, is_active: Boolean },
  methods: {
    deleteMuseum() {
      this.$emit('deleteMuseum');
    },
  },
};
</script>
<style scoped>
.museumGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid lightgray;
}
.isActiveWrap {
  align-self: center;
}
.isActive {
  border-radius: 8px;
  padding: 4px 8px;
}
.isActiveTrue {
  background-color: #def2e7;
  color: #4bbb7e;
}
.isActiveFalse {
  background-color: #f2dede;
  color: #bb4b4b;
  border-radius: 8px;
  padding: 4px 8px;
}
button {
  width: 100px;
  align-self: center;
}
</style>
