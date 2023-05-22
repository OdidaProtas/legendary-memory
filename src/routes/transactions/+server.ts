import { Transaction } from "$lib/db/entity/Transaction";
import { User } from "$lib/db/entity/User";
import type { RequestEvent } from "./$types";

export async function POST({ request, locals }: RequestEvent) {
  let data = await request.json();
  const amount = data["amount"];
  const senderId = data["sender"];
  const recipientId = data["recipient"];
  const code = generateTransactionCode();

  const userRepository = locals.datasource.getRepository(User);
  const transactionRepository = locals.datasource.getRepository(Transaction);

  const sender = await userRepository.findOneBy({ id: senderId });
  const recipient = await userRepository.findOneBy({ id: recipientId });

  const transaction = transactionRepository.create({
    code,
    amount,
    description: "Description",
  });

  if (sender && recipient) {
    transaction.sender = sender;
    transaction.recipient = recipient;
  }

  const savedTxn = await transactionRepository.save(transaction);
  return new Response(JSON.stringify(savedTxn));
}

function generateTransactionCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    code += randomChar;
  }

  return code;
}
