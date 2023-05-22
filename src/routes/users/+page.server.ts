import "reflect-metadata";
import type { RequestEvent } from "./$types";
import { User } from "$lib/db/entity/User";

export async function load({ locals }: RequestEvent) {
  let users = await locals.datasource.manager.find(User);
  users = users.map((user) => ({ ...user }));
  return { users };
}
