<template>
  <v-table fixed-header height="300px" theme="dark">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Nome</th>
        <th class="text-left">Data</th>
        <th class="text-left">Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.data }}</td>
        <td>{{ item.acao }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
  data() {
    return {
      desserts: [
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
        {
          id: "2",
          name: "Lais",
          data: "há 2 dias",
        },
      ],
    };
  },
};
</script>
