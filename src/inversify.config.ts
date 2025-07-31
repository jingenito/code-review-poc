import "reflect-metadata";
import { Container } from "inversify";
import { env } from "./env";
import { ILogger, LoggerService } from "./services/LoggerService";
import TYPES from "./services/types";
import IGitService from "./services/IGitService";
import { BitbucketService } from "./services/BitbucketService";

const container = new Container({ defaultScope: "Singleton" });

// primitive binding for token
container.bind<string>("BITBUCKET_TOKEN").toConstantValue(env.BITBUCKET_TOKEN);

// infrastructure
container.bind<ILogger>(TYPES.Logger).to(LoggerService);
container.bind<IGitService>(TYPES.GitService).to(BitbucketService);

export default container;
