const express = require('express');
const router = express.Router();

// 定义API路由
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, API!' });
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // 根据用户ID查询数据库或执行其他操作
  // 假设这里返回一个模拟的用户对象
  const user = { id: userId, name: 'John Doe', email: 'john@example.com' };
  res.json(user);
});

module.exports = router;
