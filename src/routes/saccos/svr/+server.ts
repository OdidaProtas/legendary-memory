import { Sacco } from "$lib/db/entity/Sacco";
import type { RequestEvent } from "./$types";

export async function POST({ request, locals }: RequestEvent) {
  const data = await request.json();
  const name = data["name"];
  const country = data["country"];

  const saccoRepository = locals.datasource.getRepository(Sacco);

  const sacco = await saccoRepository.save({ name, country });

  return new Response(JSON.stringify(sacco));
}

export async function GET({ locals }: RequestEvent) {
  const saccoRepository = locals.datasource.getRepository(Sacco);
  const saccos = await saccoRepository.find();
  return new Response(JSON.stringify(saccos));
}
