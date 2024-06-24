const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // 예시: 모든 유저 가져오기
  router.get('/users', async (req, res) => {
    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 예시: 새로운 유저 추가하기
  router.post('/users', async (req, res) => {
    try {
      const newUser = req.body;
      const usersRef = db.collection('users');
      const docRef = await usersRef.add(newUser);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
