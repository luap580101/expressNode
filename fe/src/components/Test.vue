<template>
  <div>
    <button @click="fetchData">取得資料</button>
    <p>{{ responseData }}</p>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  data() {
    return {
      responseData: ''
    };
  },
  methods: {
    fetchData() {
      fetch('http://localhost:3072/apis/hello')
        .then(response => response.json())
        .then(data => {
          this.responseData = data;
        })
        .catch(error => {
          console.error('發生錯誤：', error);
        });
    }
  }
};
</script>
