<template>
  <form @submit.prevent="uploadFile" enctype="multipart/form-data">
    <input type="file" ref="fileInput" />
    <button type="submit">上傳</button>
  </form>
</template>

<script>
export default {
  name: 'UploadComponent',
  methods: {
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.$refs.fileInput.files[0]);

      fetch("http://localhost:3072/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          // 處理上傳成功後的邏輯
        })
        .catch((error) => {
          console.error("檔案上傳失敗：", error);
          // 處理上傳失敗後的邏輯
        });
    },
  },
};
</script>
