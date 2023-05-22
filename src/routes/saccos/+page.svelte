<script lang="ts">
  import type { PageServerData } from "./$types";
  export let data: PageServerData;
</script>

<section class=" space-y-6 lg:px-48 p-3 bg-gray-300 min-h-screen">
  <header class="flex">
    <h1 class="text-3xl flex-1">Saccos</h1>
    <a href="/saccos/new">Add sacco</a>
  </header>
  <hr />

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> Sacco name </th>
          <th scope="col" class="px-6 py-3"> Code </th>
          <th scope="col" class="px-6 py-3"> Country </th>

          <th scope="col" class="px-6 py-3" />
        </tr>
      </thead>
      <tbody>
        {#each data?.saccos ?? [] as sacco}
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {sacco.name}
            </th>
            <td class="px-6 py-4"> {sacco.code} </td>
            <td class="px-6 py-4"> {sacco.country} </td>
            <td class="px-6 py-4">
              <a href="/saccos/{sacco.code}">Detail</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
