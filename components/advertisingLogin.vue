<template>
  <VCol class="hidden-md-and-down" md="6" lg="4">
    <VCarousel touch hide-delimiter-background hide-delimiters :show-arrows="false" cycle>
      <VCarouselItem transition="scale-transition" v-for="(item, index) in items" :key="index">
        <VCard width="350" height="500" class="rounded-xl elevation-0" flat>
          <NuxtImg
            format="webp"
            :src="item.imgSrc"
            cover
            loading="lazy"
            preload
            class="h-100 rounded-xl d-flex justify-center"
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
    name: "Martina Oliveira",
    imgSrc:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjueTxJ1RbBynXapPXk-Xhjl5VO-1m_QAb1YL3ie5qoeuUe4WoaYdv8RNDTRRugPWbwShuallxTNXpK3b9Jsh1x0rtmmfCRVfREW1aXz-tUkO5H1K2Dc85kcLf6IzB6BpBQHYZUEeVB3ZvDvxyVP15otGe2X1eeZSWgMDNRW-A2BeCCX7BJBjGduFdrOYIk",
  },
  {
    name: "Mel Maia",
    imgSrc:
      "https://s2.glbimg.com/AfFpPzL8spkb7_IR21nsdbf80FQ=/e.glbimg.com/og/ed/f/original/2020/02/10/mel-maia.jpg",
  },
];
</script>
