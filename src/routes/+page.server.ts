import "reflect-metadata";
import type { RequestEvent } from "./$types";
import { Sacco } from "$lib/db/entity/Sacco";

export async function load({ locals }: RequestEvent) {
  const saccoRepository = locals.datasource.getRepository(Sacco);
  const saccos = await saccoRepository.find();
  return {};
}
