import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './router.js';
import { DB_URL, PORT_APP } from './config/config.js';

const PORT = process.env.PORT ?? PORT_APP;
const app = express();

app.use(express.json());
app.use('/api/', router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`server has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
