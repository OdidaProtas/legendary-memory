<script lang="ts">
  import type { PageServerData } from "./$types";
  export let data: PageServerData;
</script>

<section class=" space-y-6 pt-9 lg:px-48 p-3 bg-gray-300 min-h-screen">
  <header class="flex">
    <h1 class="text-3xl flex-1">Users</h1>
    <a href="/users/new">Add user</a>
  </header>
  <hr />

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> Username </th>
          <th scope="col" class="px-6 py-3"> Balance </th>
          <th scope="col" class="px-6 py-3" />
        </tr>
      </thead>
      <tbody>
        {#each data?.users ?? [] as user}
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {user.username}
            </th>
            <td class="px-6 py-4"> {user.balance} </td>
            <td class="px-6 py-4">
              <a href="/users/{user.id}">Detail</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
