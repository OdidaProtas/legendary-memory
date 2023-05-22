import { Sacco } from "$lib/db/entity/Sacco";
import type { RequestEvent } from "./$types";

export async function load({ locals, params }: RequestEvent) {
  let sacco = await locals.datasource
    .getRepository(Sacco)
    .findOne({ where: { code: params.code }, relations: ["users"] });
  //@ts-ignore

  let saccoObj = {
    name: sacco?.name,
    code: sacco?.code,
    id: sacco?.id,
    country: sacco?.country,
    users: [...(sacco?.users ?? [])].map((user) => ({ ...user })),
    balance: sacco?.balance ?? 0,
  };

  return { sacco: saccoObj };
}
