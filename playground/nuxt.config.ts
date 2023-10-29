export default defineNuxtConfig({
  modules: ["../src/module", "@t3headless/nuxt-typo3"],
  imageOnDemandService: {},
  typo3: {
    api: {
      baseUrl: "https://content.kunzmann.staging.testworlds.de",
    },
  },
  devtools: { enabled: true },
});
