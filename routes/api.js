const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // 예시: 모든 유저 가져오기
  router.get('/host/main', async (req, res) => {
    try {
      const hostsRef = db.collection('hosts');
      const snapshot = await hostsRef.get();
      const hosts = [];
      snapshot.forEach((doc) => {
        hosts.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(hosts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 예시: 새로운 유저 추가하기
  router.post('/host', async (req, res) => {
    try {
      const newHost = req.body;
      const hostsRef = db.collection('hosts');
      const docRef = await hostsRef.add(newHost);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
