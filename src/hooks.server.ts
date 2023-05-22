import { datasource } from "$lib/db";
import "reflect-metadata";
import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  event.locals.datasource = datasource;
  return resolve(event);
}) satisfies Handle;
