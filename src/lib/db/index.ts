import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Sacco } from "./entity/Sacco";
import { Transaction } from "./entity/Transaction";
import { SaccoSubscriber } from "./subscribers/SaccoSubscriber";
import { UserSubscriber } from "./subscribers/UserSubscribers";
import { TransactionSubscriber } from "./subscribers/TransactionSubscriber";
import { DATABASE_URL } from "$env/static/private";

const dbUrl = new URL(DATABASE_URL);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

//@ts-ignore
export const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId,
  },
  synchronize: true,
  entities: [User, Sacco, Transaction],
  subscribers: [SaccoSubscriber, UserSubscriber, TransactionSubscriber],
});

// export const AppDataSource = new DataSource({
//   type: "cockroachdb",
//   url: DATABASE_URL,

//   migrations: [],
// });

export const datasource = await AppDataSource.initialize();
