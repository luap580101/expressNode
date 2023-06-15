const express = require("express");
const app = express();
const apisRouter = require("./apis");
require("dotenv").config();
const cors = require('cors');
const multer = require('multer');

// 将cors中间件作为全局中间件使用
app.use(cors());

// 设置静态文件目录
app.use(express.static("public"));

// 定义路由，根据图片名称动态展示图片
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = `public/${imageName}`;
  res.sendFile(imagePath, { root: __dirname });
});

// 将apisRouter挂载到/apis路径下
app.use("/apis", apisRouter);

app.get("/envData", (req, res) => {
  const apiKey = process.env.API_KEY;
  const dbUrl = process.env.DATABASE_URL;
  res.json({ name: "envData", API_KEY: apiKey, DATABASE_URL: dbUrl });
});

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

// 启动服务器
const port = 3072;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}/`);
});
