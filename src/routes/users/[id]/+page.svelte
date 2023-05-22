<script lang="ts">
  import axios from "axios";
  import type { PageData } from "./$types";
  import { Modal, Button } from "flowbite-svelte";
  import { invalidateAll } from "$app/navigation";
  export let data: PageData;
  let modalOpen = false;
  let amount = "";
  let recipient = "";

  let saving = false;

  let success = false;

  let error = false;

  async function handlePay() {
    try {
      saving = true;
      success = false;
      error = false;
      const response = await axios.post(`/transactions`, {
        sender: data.user.id,
        amount,
        recipient,
      });

      if (response.data) {
        success = true;
        error = false;
        saving = false;
        amount = "";
        recipient = "";
        invalidateAll();
      }
    } catch (error) {
      success = false;
      error = true;
      saving = false;
    }
  }
</script>

<form on:submit|preventDefault={handlePay}>
  <Modal class="w-full" bind:open={modalOpen}>
    <p slot="header" class="text-xl">Make payment</p>
    {#if success}
      <div
        class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
        role="alert"
      >
        <span class="font-medium">Success!</span> Transaction successfull.
      </div>
    {/if}
    <p class="my-6">
      Available balace: {data.user.balance ?? 0}
    </p>
    <div>
      <label
        for="amount"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Amount</label
      >
      <input
        type="number"
        id="amount"
        bind:value={amount}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="0"
        required
      />

      <div class="text-red-800">
        New balance will be {(data?.user?.balance ?? 0) -
          parseInt(amount ? amount : " 0")}
      </div>
    </div>
    <label
      for="recipient"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Select recipient</label
    >
    <select
      required
      bind:value={recipient}
      id="reciptient"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {#each data.users as user}
        <option value={user?.id}> {user.username}</option>
      {/each}
    </select>

    <Button type="submit" slot="footer"
      >{#if saving}Please wait... {:else} Send{/if}</Button
    >
  </Modal>
</form>

<section class=" lg:px-48 px-6 space-y-6 p-3 bg-gray-300 min-h-screen">
  <header class="flex">
    <h1 class="text-3xl flex-1">User detail</h1>
    <button on:click={() => history.back()}>Go back</button>
  </header>
  <hr />
  <div class="flex justify-end">
    <Button
      on:click={() => {
        modalOpen = true;
      }}>Make payment</Button
    >

    {#if error}
      <div
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span class="font-medium">Error!</span>Sorry an error occured
      </div>
    {/if}
  </div>
  <article>
    <h6 class="text-2xl">
      Name: {data.user?.username ?? "Unknown Name"}
    </h6>
    <h6 class="text-xl">
      Sacco : {data.user?.sacco?.code ?? "Unknown Sacco"}
    </h6>
    <h6 class="text-xl">
      Country :{data?.user.sacco?.country ?? "Unknown country"}
    </h6>
    <h6 class="text-3xl">
      Transfer Bal : KES {data.user?.balance ?? "Unknown Bal"}
    </h6>
  </article>
  <hr />
  <p class="text-3xl">Incoming transactions</p>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> Transaction code </th>
          <th scope="col" class="px-6 py-3"> Amount </th>
          <th scope="col" class="px-6 py-3"> Time </th>
        </tr>
      </thead>
      <tbody>
        {#each data.user?.incomingTransactions ?? [] as txn}
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {txn.code}
            </th>
            <td class="px-6 py-4"> {txn.amount} </td>
            <td class="px-6 py-4"> {txn.createdAt} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <p class="text-3xl">Outgoing transactions</p>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> Transaction Code </th>
          <th scope="col" class="px-6 py-3"> Amount </th>
          <th scope="col" class="px-6 py-3"> Time </th>
        </tr>
      </thead>
      <tbody>
        {#each data.user?.outgoingTransactions ?? [] as txn}
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {txn.code}
            </th>
            <td class="px-6 py-4"> {txn.amount} </td>
            <td class="px-6 py-4"> {txn.createdAt} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
