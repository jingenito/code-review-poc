import { Router } from "express";
import { getRepos } from "./git.controller";

const router = Router()

router.route("/:workspace/repos").get(getRepos);

export default router;