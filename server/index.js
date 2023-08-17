import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import niteshRoutes from './routes/hare.routes.js';

dotenv.config();

const app = express();
// const port = process.env.PORT // 5000;
app.use(cors());
app.use(express({ limig: "50mb" }))

app.use('/api/v1/hare', niteshRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hare Krishna!! Backend is working" })
})

app.listen(8080, () => console.log("Server has started on port 8080"))