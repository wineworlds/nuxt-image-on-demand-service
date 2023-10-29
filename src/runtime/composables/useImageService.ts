import type { T3File } from "@t3headless/nuxt-typo3";
import type { Ref } from "vue";

interface ImageServiceOptions {
  image?: T3File;
  type?: Ref<string> | string; // webp
  text?: Ref<string> | string; // Dummy Image
  bgColor?: Ref<string> | string; // #fff
  textColor?: Ref<string> | string; // #000
  crop?: Ref<string> | string; // desktop
}

interface ImageServiceResizeProps {
  width?: number;
  height?: number;
  crop?: string;
}

interface ImageServiceQuery {
  id?: number;
  type?: string;
  text?: string;
  bgColor?: string;
  textColor?: string;
  crop?: string;
}

export const useImageService = (options: ImageServiceOptions) => {
  const { options: t3Options } = useT3Options();
  const baseUrl: string = `${t3Options.api.baseUrl}/image-service`;

  const width = ref<number>(300);
  const height = ref<number>(300);
  const name = ref<string>("dummy.jpg");
  const query = reactive<ImageServiceQuery>({
    type: "jpg",
  });
  const queryString = computed<string>(() =>
    Object.entries(query)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as any)}`)
      .join("&")
  );

  // watchEffect(() => {
  if (options?.image) {
    const { fileReferenceUid: uid, filename, dimensions } = options.image.properties // prettier-ignore

    query.id = uid;
    name.value = filename;
    width.value = dimensions.width;
    height.value = dimensions.height;
  }
  if (options?.type) query.type = toValue(options.type);
  if (options?.text) query.text = toValue(options.text);
  if (options?.bgColor) query.bgColor = toValue(options.bgColor);
  if (options?.textColor) query.textColor = toValue(options.textColor);
  if (options?.crop) query.crop = toValue(options.crop);
  // })

  const url = computed<string>(() => `${baseUrl}/${width.value}/${height.value}/${name.value}?${queryString.value}`) // prettier-ignore

  const resize = (props: ImageServiceResizeProps): string => {
    const { width: w, height: h, crop: c } = props;

    if (w) width.value = w;
    if (h) height.value = h;
    if (c) query.crop = c;

    // adjust height in proportion if only the width is specified and an image is present.
    if (w && !h && options.image) {
      const { dimensions } = options.image.properties;
      width.value = w;
      height.value = (dimensions.height / dimensions.width) * w;
    }

    // adjust width in proportion if only the height is specified and an image is present.
    if (h && !w && options.image) {
      const { dimensions } = options.image.properties;
      width.value = h;
      height.value = (dimensions.height / dimensions.width) * h;
    }

    return url.value;
  };

  return {
    resize,
    url,
  };
};
