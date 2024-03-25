import { defineStore } from 'pinia';

export const useMuseumStore = defineStore('museums', {
  state: () => ({
    museums: [],
    currentPage: 1,
    pageSize: 15,
    count: 0,
    totalPages: 0,
    sortBy: '',
    sortOrder: '-',
  }),
  actions: {
    setCount(count) {
      this.count = count;
      this.totalPages = Math.ceil(count / this.pageSize);
    },
    setMuseums(museums) {
      this.museums = museums;
    },
    setPage(page) {
      this.currentPage = page;
    },
    setPageSize(size) {
      this.pageSize = size;
      this.totalPages = Math.ceil(this.count / size);
      this.currentPage = 1;
    },
    setSort(column) {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === '-' ? '' : '-';
      } else {
        this.sortBy = column;
        this.sortOrder = '-';
      }
    },
  },
});
