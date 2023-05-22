import {
  EventSubscriber,
  type EntitySubscriberInterface,
  type InsertEvent,
} from "typeorm";
import { datasource } from "..";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import { Sacco } from "../entity/Sacco";

@EventSubscriber()
export class TransactionSubscriber
  implements EntitySubscriberInterface<Transaction>
{
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Transaction;
  }

  /**
   * Called before post insertion.
   */

  async afterInsert(event: InsertEvent<Transaction>) {
    const userRepository = datasource.getRepository(User);
    const saccoRepository = datasource.getRepository(Sacco);

    const sender = await userRepository.findOne({
      where: {
        id: event.entity.sender.id,
      },
      relations: ["sacco"],
    });

    const recipient = await userRepository.findOne({
      where: {
        id: event.entity.recipient.id,
      },
      relations: ["sacco"],
    });

    if (sender && recipient) {
      const updatedSender = await userRepository.update(sender.id, {
        balance: sender.balance - event.entity.amount,
      });

      const updatedRecipient = await userRepository.update(recipient.id, {
        balance: recipient.balance + event.entity.amount,
      });

      const updatedSenderSaccoBalance = await saccoRepository.update(
        sender.sacco.id,
        {
          balance: sender.sacco.balance - event.entity.amount,
        }
      );

      const updatedRecipientSaccoBalance = await saccoRepository.update(
        recipient.sacco.id,
        {
          balance: recipient.sacco.balance + event.entity.amount,
        }
      );
    }
  }
}
