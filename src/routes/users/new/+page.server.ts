import "reflect-metadata";
import type { RequestEvent } from "./svr/$types";
import { Sacco } from "$lib/db/entity/Sacco";

export async function load({ locals }: RequestEvent) {
  let saccos = await locals.datasource.manager.find(Sacco);
  saccos = saccos.filter((sacco) => Boolean(sacco.code));
  saccos = saccos.map((sacco) => ({ ...sacco }));
  return { saccos };
}
