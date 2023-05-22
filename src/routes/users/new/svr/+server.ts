import { Sacco } from "$lib/db/entity/Sacco";
import { User } from "$lib/db/entity/User";
import type { RequestEvent } from "./$types";

export async function POST({ request, locals }: RequestEvent) {
  const data = await request.json();
  const name = data["name"];
  const saccoCode = data["sacco"];

  const saccoRepository = locals.datasource.getRepository(Sacco);
  const userRepository = locals.datasource.getRepository(User);

  const sacco = await saccoRepository.findOneBy({ code: saccoCode });

  const user = userRepository.create({
    username: name,
  });
  if (sacco) user.sacco = sacco;
  const withSacco = await userRepository.save(user);
  return new Response(JSON.stringify({ user: { ...withSacco } }));
}

export async function GET({ locals }: RequestEvent) {
  const saccoRepository = locals.datasource.getRepository(Sacco);
  const saccos = await saccoRepository.find();
  return new Response(JSON.stringify(saccos));
}
