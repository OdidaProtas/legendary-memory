import {
  EventSubscriber,
  type EntitySubscriberInterface,
  type InsertEvent,
} from "typeorm";
import { Sacco } from "../entity/Sacco";
import { datasource } from "..";

@EventSubscriber()
export class SaccoSubscriber implements EntitySubscriberInterface<Sacco> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Sacco;
  }

  /**
   * Called before post insertion.
   */
  async afterInsert(event: InsertEvent<Sacco>) {
    let code = `ID${event.entity.country}${formatID(event.entity.id)}`;
    event.entity.code = code;
    const updated = await datasource.getRepository(Sacco).save(event.entity);
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
