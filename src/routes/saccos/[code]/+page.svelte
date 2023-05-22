<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<section class=" lg:px-48 px-6 space-y-6 p-3 bg-gray-300 min-h-screen">
  <header class="flex">
    <h1 class="text-3xl flex-1">Sacco detail</h1>
    <button on:click={() => history.back()}>Go back</button>
  </header>
  <hr />

  <article>
    <h6 class="text-2xl">
      Name: {data.sacco?.name ?? "Unknown Name"}
    </h6>
    <h6 class="text-xl">
      Code : {data.sacco?.code ?? "Unknown Sacco"}
    </h6>
    <h6 class="text-xl">
      Transfer Bal : KES {data.sacco?.balance ?? "Unknown Bal"}
    </h6>
    <h6 class="text-xl">
      Country {data.sacco?.country ?? "Unknown country"}
    </h6>
  </article>
  <hr />
  <p class="text-3xl">Members</p>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> Name </th>
          <th scope="col" class="px-6 py-3"> Code </th>
          <th scope="col" class="px-6 py-3">Balance</th>
          <th scope="col" class="px-6 py-3">User detail</th>
        </tr>
      </thead>
      <tbody>
        {#each data.sacco?.users ?? [] as user}
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {user.username}
            </th>
            <td class="px-6 py-4"> {user.code} </td>
            <td class="px-6 py-4"> {user.balance} </td>
            <td>
              <a href="/users/{user?.id}">Details</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
