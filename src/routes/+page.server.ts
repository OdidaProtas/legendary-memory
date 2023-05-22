import "reflect-metadata";
import { AppDataSource } from "../lib/db";
import { User } from "../lib/db/entity/User";
import type { RequestEvent } from "./$types";
import { Sacco } from "$lib/db/entity/Sacco";

export async function load({ locals }: RequestEvent) {
  const saccoRepository = locals.datasource.getRepository(Sacco);
  const saccos = await saccoRepository.find();
  console.log(saccos);
  return {};
}
