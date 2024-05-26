<template>
  <VCol class="hidden-md-and-down" md="6" lg="4">
    <VCarousel touch hide-delimiter-background hide-delimiters :show-arrows="false" cycle>
      <VCarouselItem transition="scale-transition" v-for="(item, index) in items" :key="index">
        <VCard width="350" height="500" class="rounded-xl elevation-0" flat>
          <NuxtImg
            format="webp"
            :src="item.imgSrc"
            loading="lazy"
            preload
            class="w-50 rounded-xl d-flex my-15 mx-auto"
          >
            <div class="ml-4 mt-4">
              <NuxtLink to="/@user"
                ><VBtn color="primary" variant="elevated" rounded class="text-capitalize">
                  {{ item.name }}
                </VBtn></NuxtLink
              >
            </div>
          </NuxtImg>
        </VCard>
      </VCarouselItem>
    </VCarousel>
  </VCol>
</template>

<script setup>
const items = [
  {
    name: "Mel Maia",
    imgSrc:
      "./adv.png",
  },
];
</script>
