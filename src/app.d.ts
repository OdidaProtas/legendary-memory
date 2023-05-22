// See https://kit.svelte.dev/docs/types#app

import type { datasource } from "$lib/db";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      datasource: typeof datasource;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
