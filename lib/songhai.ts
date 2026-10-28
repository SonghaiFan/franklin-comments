export const songhai = {
  repo: 'SonghaiFan/website',
  repoId: 'R_kgDOVYyQ6Q',
  categoryId: 'DIC_kwDOVYyQ6c4DJyNw',
};

const origins = new Set([
  'https://songhai.site',
  'https://blog.songhai.site',
  'https://comments.songhai.site',
  'http://127.0.0.1:4174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4181',
]);

export function isSonghaiOrigin(value: string) {
  try {
    const url = new URL(value);
    return !url.username && !url.password && origins.has(url.origin);
  } catch {
    return false;
  }
}
