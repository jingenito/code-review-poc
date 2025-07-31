import { RequestHandler } from "express";
import container from "../inversify.config";
import IGitService from "../services/IGitService";
import { ILogger } from "../services/LoggerService";
import TYPES from "../services/types";

/* Helpers to fetch singletons from the container */
const git = container.get<IGitService>(TYPES.GitService);
const log = container.get<ILogger>(TYPES.Logger);

export const getRepos: RequestHandler = async (req, res) => {
    try {
        const data = await git.listRepos(req.params.workspace);
        res.json(data);
    } catch (err) {
        log.error("listRepos failed:", err);   
    }
}