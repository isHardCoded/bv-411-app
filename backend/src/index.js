import express from 'express';
import db from './models/index.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorMiddleware } from './middlewares/error.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    abortOnLimit: true,
    createParentPath: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);

app.use(errorMiddleware);

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('DB connected');

    await db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

start();
