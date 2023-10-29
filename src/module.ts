import { defineNuxtModule, createResolver, addImportsDir } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "image-on-demand-service",
    configKey: "imageOnDemandService",
  },
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);

    addImportsDir(resolver.resolve("./runtime/composables"));
  },
});
