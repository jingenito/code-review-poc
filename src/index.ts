// express
import express from 'express';
import { Request, Response } from 'express';

// makes env variables available via process.env
import dotenv from 'dotenv';
dotenv.config();

import bitbucketRouter from './routes/git.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/hello-world", (req: Request, res: Response) => {
  res.json({
      response: 'Hello World!',
    });
})

app.use("/api/bitbucket", bitbucketRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
