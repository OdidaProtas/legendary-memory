<script lang="ts">
  import { goto } from "$app/navigation";
  import { countries } from "$lib/countries";
  import { Sacco } from "$lib/db/entity/Sacco";
  import axios from "axios";
  import type { PageData } from "./$types";
  export let data: PageData;

  let name = "";
  let sacco = "";

  let error = false;
  let success = false;
  let saving = false;
  async function handleSubmit() {
    try {
      success = false;
      error = false;
      saving = true;
      const res = await axios.post(`/users/new/svr`, { sacco, name });
      if (res.data) {
        error = false;
        saving = false;
        success = true;
        goto(`/users/${res.data.id}`);
      }
    } catch (error) {
      error = true;
      saving = false;
      success = false;
    }
  }
</script>

<section class=" lg:px-48 px-6 space-y-6 p-3 bg-gray-300 min-h-screen">
  <header class="flex">
    <h1 class="text-3xl flex-1">New user</h1>
    <button on:click={() => history.back()}>Go back</button>
  </header>
  <hr />

  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Holy smokes!</strong>
      <span class="block sm:inline">Something went wrong.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          ><title>Close</title><path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          /></svg
        >
      </span>
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-6">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Username</label
      >
      <input
        type="text"
        id="name"
        bind:value={name}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type username"
        required
      />
    </div>

    <div class="mb-6">
      <label
        for="sacco"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Sacco</label
      >
      <select
        bind:value={sacco}
        required
        id="sacco"
        name="sacco"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose sacco</option>
        {#each data?.saccos ?? [] as sacco}
          <option value={sacco.code}>{sacco.name}</option>
        {/each}
      </select>
    </div>
    <button
      disabled={saving}
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >{#if saving} Saving...{:else}Save{/if}</button
    >
  </form>
</section>
