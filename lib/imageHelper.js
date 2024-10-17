export const getImageUrl = (path) => {
  const baseUrl = `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGE_KIT_ID}`;
  return `${baseUrl}${path}`;
};
