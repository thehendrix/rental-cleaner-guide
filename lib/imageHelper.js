export const getImageUrl = (path) => {
  const baseUrl = `https://ik.imagekit.io/${process.env.IMAGE_KIT_ID}`;
  return `${baseUrl}${path}`;
}
