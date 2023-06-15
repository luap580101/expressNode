# expressNode

# 使用 Node.js + Express 製作後台

## 使用 express 先安裝
:::    success
npm install express

:::

## 開始架設伺服器

### 啟動服務器
新增 server.js
```
const express = require('express');
const app = express();

// 启动服务器
const port = 3072;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}/`);
});
```
> node server.js
>> http://localhost:3072/

### 使用 nodemon 啟動伺服器
:::success
npm install nodemon
:::
在 package.json "scripts" 新增 "dev": "nodemon server.js"
```
npm run dev
```

###  顯示圖片
新增 public 資料夾，在裡面放 資料夾images
```
// 设置静态文件目录
app.use(express.static('public'));

// 定义路由，根据图片名称动态展示图片
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = `public/${imageName}`;
  res.sendFile(imagePath, { root: __dirname });
});
```
>>http://localhost:3072/images/example.jpg

### repress router
新增一個 apis.js
```
const express = require('express');
const router = express.Router();

// 定义API路由
router.get('/example', (req, res) => {
  res.json({ message: 'Hello, API!' });
});

module.exports = router;
```
在 server.js 新增
```
const apisRouter = require('./apis');

// 将apisRouter挂载到/apis路径下
app.use('/apis', apisRouter);
```
>> http://localhost:3072/apis/example
>> {"message":"Hello, API!"}

### 使用 dotenv
:::    success
npm install dotenv
:::
新增檔案 .env
```
API_KEY=abcdef123456
DATABASE_URL=mongodb://localhost:27017/mydatabase
```
在 server.js 新增
```
require("dotenv").config();

const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
  
app.get("/envData", (req, res) => {
  res.json({ name: "envData", API_KEY: apiKey, DATABASE_URL: dbUrl });
});
```
>> http://localhost:3072/envData
>> {"name":"envData","API_KEY":"abcdef123456","DATABASE_URL":"mongodb://localhost:27017/mydatabase"}

### 使用 cors
:::    success
npm install cors
::: 
在 server.js 新增
```
const cors = require('cors');

// 将cors中间件作为全局中间件使用
app.use(cors());
```

**如果需要設定的話：**
```
const corsOptions = {
  origin: [
    'http://www.example.com',
    'http://localhost:8080',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```
### 連線資料庫

### 上傳圖片
:::    success
npm install multer
:::

在 public 新增 uploads
```
const multer = require('multer');

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // 设置文件存储目录
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 设置文件名
  }
});

const upload = multer({ storage: storage });

// 处理文件上传请求
app.post('/upload', upload.single('file'), (req, res) => {
  // 文件上传成功后的处理逻辑
  res.json({ message: '文件上传成功' });
});

```

前端
```
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

```
