<template>
  <div>
    <Header />
    <main>
      <div>
        <div class="museumTitleGrid">
          <button @click="changeSort('id')">ID</button>
          <button @click="changeSort('name')">Наименование</button>
          <button @click="changeSort('is_active')">Активен</button>
        </div>
      </div>
      <div v-for="museum in museums" :key="museum.id">
        <MuseumCard
          :id="museum.id"
          :name="museum.name"
          :is_active="museum.is_active"
          @deleteMuseum="deleteMuseum(museum.id)"
        />
      </div>
      <div class="wrapPagination">
        <p class="wrapPaginationText">Кол-во на странице:</p>
        <select
          name=""
          id=""
          value="15"
          class="wrapPaginationSelect"
          @change="changePageSize($event.target.value)"
        >
          <option value="1" :selected="useMuseum.pageSize === 1">1</option>
          <option value="5" :selected="useMuseum.pageSize === 5">5</option>
          <option value="10" :selected="useMuseum.pageSize === 10">10</option>
          <option value="15" :selected="useMuseum.pageSize === 15">15</option>
        </select>
        <p class="wrapPaginationText">{{ useMuseum.currentPage }}</p>
        <div class="wrapPaginationPage">
          <button class="paginationPage" @click="startPage">&lt;&lt;</button>
          <button class="paginationPage" @click="prevPage">&lt;</button>
          <button class="paginationPage" @click="nextPage">&gt;</button>
          <button class="paginationPage" @click="endPage">&gt;&gt;</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import MuseumCard from '../components/MuseumCard.vue';
import axios from 'axios';
import { useMuseumStore } from '../store/MuseumStore';
export default {
  data() {
    return {
      useMuseum: useMuseumStore(),
    };
  },
  components: {
    Header,
    MuseumCard,
  },
  computed: {
    museums() {
      return this.useMuseum.museums;
    },
  },
  methods: {
    deleteMuseum(id) {
      axios.delete(`https://developer3.elros.info/api/v1/museums/${id}`).then(() => {
        this.getMuseums();
      });
    },
    changePageSize(size) {
      this.useMuseum.setPageSize(+size);
      this.getMuseums();
    },
    startPage() {
      this.useMuseum.setPage((this.useMuseum.currentPage = 1));
      this.getMuseums();
    },
    endPage() {
      this.useMuseum.setPage((this.useMuseum.currentPage = this.useMuseum.totalPages));
      this.getMuseums();
    },
    nextPage() {
      if (this.useMuseum.currentPage < this.useMuseum.totalPages) {
        this.useMuseum.setPage(this.useMuseum.currentPage + 1);
        this.getMuseums();
      }
    },
    prevPage() {
      if (this.useMuseum.currentPage > 1) {
        this.useMuseum.setPage(this.useMuseum.currentPage - 1);
      }
      this.getMuseums();
    },
    changeSort(column) {
      this.useMuseum.setSort(column);
      this.getMuseums();
      console.log(this.useMuseum.museums);
    },
    getMuseums() {
      const useMuseum = useMuseumStore();
      axios
        .get(
          `https://developer3.elros.info/api/v1/museums/?page=${useMuseum.currentPage}&page_size=${useMuseum.pageSize}&ordering=${useMuseum.sortOrder}${useMuseum.sortBy}`,
        )
        .then(
          (response) => (
            useMuseum.setCount(response.data.count), useMuseum.setMuseums(response.data.results)
          ),
        );
    },
  },
  mounted() {
    this.getMuseums();
  },
};
</script>
<style scoped>
main {
  padding: 0 50px;
}
button {
  border: none;
  background-color: inherit;
  padding: 10px 0;
  text-align: start;
  font-size: medium;
}
.museumTitleGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.wrapPagination {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: end;
  align-items: center;
}
.wrapPaginationText {
  margin: 0;
}

.wrapPaginationPage {
  display: flex;
  gap: 5px;
}
.paginationPage {
  background-color: lightgray;
  border-radius: 5px;
  padding: 5px 5px;
}
</style>
