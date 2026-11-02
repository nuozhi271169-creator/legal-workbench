const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 初始化数据文件
function initData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initial = { events: [], deadlines: [], excerpts: [], ai: {} };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
  }
}
initData();

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { events: [], deadlines: [], excerpts: [], ai: {} };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 获取所有数据
app.get('/api/data', (req, res) => {
  res.json(readData());
});

// 事件
app.post('/api/events', (req, res) => {
  const data = readData();
  const event = { id: Date.now().toString(), ...req.body };
  data.events.push(event);
  writeData(data);
  res.json(event);
});

app.delete('/api/events/:id', (req, res) => {
  const data = readData();
  data.events = data.events.filter(e => e.id !== req.params.id);
  writeData(data);
  res.json({ success: true });
});

// 期限
app.post('/api/deadlines', (req, res) => {
  const data = readData();
  const dl = { id: Date.now().toString(), ...req.body };
  data.deadlines.push(dl);
  writeData(data);
  res.json(dl);
});

app.delete('/api/deadlines/:id', (req, res) => {
  const data = readData();
  data.deadlines = data.deadlines.filter(d => d.id !== req.params.id);
  writeData(data);
  res.json({ success: true });
});

// 摘录
app.post('/api/excerpts', (req, res) => {
  const data = readData();
  const ex = { id: Date.now().toString(), time: new Date().toLocaleString(), ...req.body };
  data.excerpts.unshift(ex);
  writeData(data);
  res.json(ex);
});

app.delete('/api/excerpts/:id', (req, res) => {
  const data = readData();
  data.excerpts = data.excerpts.filter(e => e.id !== req.params.id);
  writeData(data);
  res.json({ success: true });
});

// AI 推荐
app.post('/api/ai', (req, res) => {
  const data = readData();
  data.ai = { date: new Date().toISOString().split('T')[0], content: req.body.content };
  writeData(data);
  res.json(data.ai);
});

app.listen(PORT, () => {
  console.log(`法律人工作台后端已启动: http://localhost:${PORT}`);
});