import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Sacco } from "./entity/Sacco";
import { Transaction } from "./entity/Transaction";
import { SaccoSubscriber } from "./subscribers/SaccoSubscriber";
import { UserSubscriber } from "./subscribers/UserSubscribers";
import { TransactionSubscriber } from "./subscribers/TransactionSubscriber";
import { dev } from "$app/environment";
import { DATABASE_URL } from "$env/static/private";

let AppDataSource;

if (dev) {
  AppDataSource = new DataSource({
    type: "sqlite",
    database: ".sqlite",
    synchronize: true,
    entities: [User, Sacco, Transaction],
    subscribers: [SaccoSubscriber, UserSubscriber, TransactionSubscriber],
    migrations: [],
  });
} else {
  const dbUrl = new URL(DATABASE_URL);
  const routingId = dbUrl.searchParams.get("options");
  dbUrl.searchParams.delete("options");
  AppDataSource = new DataSource({
    type: "cockroachdb",
    url: dbUrl.toString(),
    ssl: true,
    extra: {
      options: routingId,
    },
    entities: [User, Sacco, Transaction],
    subscribers: [SaccoSubscriber, UserSubscriber, TransactionSubscriber],
    migrations: [],
    timeTravelQueries: false,
  });
}

export const datasource = await AppDataSource?.initialize();
