import express from 'express';
import db from './models/index.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';

import { errorMiddleware } from './middlewares/error.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(errorMiddleware);
app.use(express.json());
app.use(cors());

app.use('/api', routes);

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
