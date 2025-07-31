import { Router } from "express";
import { getRepos } from "./git.controller";

const gitRouter = Router()

gitRouter.route("/:workspace/repos").get(getRepos);

export default gitRouter;