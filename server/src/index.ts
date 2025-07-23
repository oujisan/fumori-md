import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mdRoute from './routes/markdown';
import adminRoute from './routes/admin';

dotenv.config();
const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Fumori Markdown API" });
});

app.use("/api/notes", mdRoute);
app.use("/api/oujisan", adminRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});