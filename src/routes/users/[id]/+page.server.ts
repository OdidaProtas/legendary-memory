import { User } from "$lib/db/entity/User";
import type { RequestEvent } from "./$types";

export async function load({ locals, params }: RequestEvent) {
  let user = await locals.datasource.getRepository(User).findOne({
    where: { id: params.id },
    relations: ["sacco", "incomingTransactions", "outgoingTransactions"],
  });

  let allUsers = await locals.datasource.getRepository(User).find();

  allUsers = allUsers.map((user) => ({ ...user }));

  allUsers = allUsers.filter((u) => {
    if (parseInt(u.id) === parseInt(params.id)) {
      return false;
    }
    return true;
  });


  let userObj = {
    username: user?.username,
    code: user?.code,
    sacco: { ...user?.sacco },
    incomingTransactions: [...(user?.incomingTransactions ?? [])].map(
      (txn) => ({ ...txn })
    ),
    outgoingTransactions: [...(user?.outgoingTransactions ?? [])].map(
      (txn) => ({ ...txn })
    ),
    id: user?.id,
    balance: user?.balance,
  };

  return { user: userObj, users: allUsers };
}
