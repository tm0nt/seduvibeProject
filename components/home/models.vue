<template>
    <v-row>
      <v-col cols="12" class="mt-5 mb-5 d-flex align-center justify-center">
          <v-btn @click="openSidebarFilter()" color="primary" class="text-capitalize">
            Filtros
            <v-icon class="ma-1">mdi-filter</v-icon>
          </v-btn>
      </v-col>
      <template v-if="sortedSeduvibe.length === 0">
        <v-col>
          <p class="text-caption  mt-5 text-medium-emphasis text-center">
            Não existe nenhum(a) criador(a) cadastrado!
          </p>
        </v-col>
      </template>
      <template v-else>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="user in sortedSeduvibe"
          :key="user.id"
        >
          <v-card
            class="mx-auto mt-n5 my-5 rounded-xl"
            max-width="300"
            color="#151515"
          >
            <v-img
              style="object-fit: contain"
              height="150"
              :src="user.coverPicture"
              tile
              class="blurred-image"
            ></v-img>
            <div class="d-flex align-center justify-center" style="height: 100%">
              <v-avatar
                class="circle-avatar"
                @click="redirectToURL('/@' + user.user)"
                size="100"
                style="position: absolute"
              >
                <v-img
                  :src="user.profilePicture"
                  contain
                  class="circle-image"
                  style="width: 100%; height: auto"
                ></v-img>
              </v-avatar>
            </div>
            <v-card-title
              class="text-subtitle-1 text-center mt- ml-3 white--text"
            >
              {{ user.name | primeiroNome(1) }}&nbsp;
              <v-icon small color="purple">mdi-check-decagram</v-icon>
            </v-card-title>
            <v-card-title
              class="grey--text text-grey-purple-1 text-center ml-3 mt-n10 caption font-italic"
            >
              @{{ user.user }}
            </v-card-title>
            <v-card-title
              class="grey--text text-grey-purple-1 text-center ml-3 mt-n6 caption font-italic"
            >
              {{ user.bio === null ? "." : user.bio }}
            </v-card-title>
          </v-card>
        </v-col>
      </template>
      <v-btn
        v-if="showLoadMoreButton && seduvibe.length > currentPage * itemsPerPage"
        dark
        color="purple"
        small
        :disabled="isLoading"
        block
        @click="loadMoreItems"
      >
        {{ isLoading ? "Procurando..." : "Ver Mais" }}</v-btn
      >
      <v-navigation-drawer
        v-model="openSidebarRight"
        right
        class="elevation-2"
        color="input_color"
        temporary
        app
      >
        <v-container>
          <p class="mt-5 mb-5 text-overline">TRIBOS</p>
          <v-checkbox
            v-for="filtro in listaFiltros"
            :key="filtro.id"
            class="mt-n5 mt-5"
            v-model="filtro.selected"
            :label="filtro.name"
            color="purple"
            dark
          ></v-checkbox>
        </v-container>
      </v-navigation-drawer>
    </v-row>
  </template>
  
  <script>
  
  export default {
    props: {
      selectedModelIds: Array,
    },
    data() {
      return {
        showLoadMoreButton: true,
        itemsPerPage: 4,
        currentPage: 1,
        assinante: 1,
        filtrosAtivos: false,
        voceAssina: null,
        assinaturaValor: null,
        listaFiltros: [],
        tribosSelecionadas: [],
        sortedSeduvibe: [],
        isLoading: false,
        openSidebarRight: false,
        userCount: 0,
        seduvibe: {},
      };
    },
    filters: {
      primeiroNome(value, numWords) {
        if (!value) return "";
        const words = value.split(" ");
        return words.slice(0, numWords).join(" ");
      },
    },
    watch: {
    listaFiltros: {
      handler(newVal) {
        const algumFiltroSelecionado = newVal.some((filtro) => filtro.selected);
  
        if (algumFiltroSelecionado) {
          this.filtrar();
        }
      },
      deep: true, // Observa alterações profundas na listaFiltros
    },
  },
  
    methods: {
      async filtrar() {
        // Construir uma lista de IDs dos itens selecionados
        const idsSelecionados = this.listaFiltros
          .filter((filtro) => filtro.selected)
          .map((filtro) => filtro.id);
  
        // Enviar o payload como um objeto com uma propriedade "tribeIds"
        const payload = {
          tribeIds: idsSelecionados,
        };
  
        // Realizar uma requisição com o payload
        try {
          const response = await fetchSeduvibeData.filter(payload);
          // Atualizar os resultados filtrados conforme necessário
          this.sortedSeduvibe = response.data.users;
        } catch (error) {
          console.error(error);
        }
  
        // Fechar a barra lateral após a filtragem
        this.openSidebarRight = false;
        const todosFiltrosDeselecionados = this.listaFiltros.every(
          (filtro) => !filtro.selected,
        );
  
        if (todosFiltrosDeselecionados) {
          this.fetchSeduvibeData(); // Chama a função fetchData
        }
      },
      fecharDialog() {
        // Emitir um evento ou fazer algo quando o botão "Fechar" é clicado
        this.$emit("fechar-dialog");
      },
      openSidebarFilter() {
        this.openSidebarRight = true;
      },
      extractPlanName(fullName) {
        const index = fullName.indexOf("-");
        return index !== -1 ? fullName.slice(0, index) : fullName;
      },
      comparePlans(planA, planB) {
        const planOrder = ["Básico", "Premium", "Premium+"];
  
        // Mover todos os 'Premium+' para o início da lista
        if (planA === "Premium+") return -1;
        if (planB === "Premium+") return 1;
  
        return planOrder.indexOf(planA) - planOrder.indexOf(planB);
      },
  
      redirectToURL(url) {
        this.$router.push(url);
        window.scrollTo(0, 0);
      },
      loadMoreItems() {
        this.isLoading = true;
  
        setTimeout(() => {
          this.itemsPerPage += 4;
  
          if (this.itemsPerPage >= this.seduvibe.length) {
            this.showLoadMoreButton = false;
          }
  
          this.isLoading = false;
        }, 1000);
      },
      async fetchSeduvibeData() {
        try {
          const response = await fetchSeduvibeData.fetchSeduvibeData();
          this.seduvibe = response.data.users;
  
          // Ordenar a lista antes de atribuir a sortedSeduvibe
          this.sortedSeduvibe = [...this.seduvibe].sort((a, b) => {
            const planA = this.extractPlanName(a.subscription.name);
            const planB = this.extractPlanName(b.subscription.name);
  
            // Comparar os planos
            return this.comparePlans(planA, planB);
          });
  
          console.log(this.sortedSeduvibe);
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .blurred-image {
    filter: blur(1px);
  }
  
  .circle-avatar {
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid purple !important;
  }
  .circle-image {
    border-radius: 50%;
  }
  </style>
  