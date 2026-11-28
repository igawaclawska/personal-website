const images = import.meta.glob("../../assets/*", { eager: true });

export function getAssetUrl(filename: string): string {
  const match = Object.keys(images).find((key) => key.endsWith(filename));
  return match ? (images[match] as { default: string }).default : "";
}
