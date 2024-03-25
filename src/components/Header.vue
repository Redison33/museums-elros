<template>
  <header>
    <h1>Музей</h1>
    <button @click="$router.push('/create')">+ Добавить</button>
  </header>
</template>
<script></script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
}
h1 {
  margin: 0;
}
button {
  border: none;
  background-color: #def2e7;
  color: #4bbb7e;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: larger;
}
</style>
