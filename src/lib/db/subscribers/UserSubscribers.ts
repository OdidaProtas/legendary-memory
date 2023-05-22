import {
  EventSubscriber,
  type EntitySubscriberInterface,
  type InsertEvent,
} from "typeorm";
import { Sacco } from "../entity/Sacco";
import { datasource } from "..";
import { User } from "../entity/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called before post insertion.
   */
  async afterInsert(event: InsertEvent<User>) {
    let code = `ID${event.entity.sacco.country}${formatID(event.entity.id)}`;
    event.entity.code = code;
    const updated = await datasource.getRepository(User).save(event.entity);
    console.log("upd", updated);
  }
}

function formatID(id: string) {
  let inputString = id.toString();

  if (inputString.length < 6) {
    let numZeroes = 6 - inputString.length;
    inputString = "0".repeat(numZeroes) + inputString;
  } else if (inputString.length > 6) {
    inputString = inputString.slice(0, 6);
  } else {
    // No need to modify if input is already 6 digits
  }

  return inputString;
}
