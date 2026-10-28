# Franklin Comments

A self-hosted fork of [giscus](https://github.com/giscus/giscus), shared by songhai.site and blog.songhai.site at comments.songhai.site. The original MIT license and upstream attribution are retained.

## Data and boundaries

Comments remain in SonghaiFan/website → Discussions → Announcements. Keep the original repo/category IDs and exact specific-mapping terms. No discussion migration, copying, or deletion is required. The independent private knowledge vault is not connected to the App.

The service permits only this repository and the explicit site/local origins in lib/songhai.ts. GitHub App installation must select only website, with Discussions read/write and Metadata read. OAuth return URLs are checked before issuing and after decoding state. The fork uses a separate browser session key; readers authorize the new App once.

## Development

Use Node 24 or newer and Yarn 1. Copy .env.example to .env.local, fill the dedicated App credentials and a random encryption password, then set NEXT_PUBLIC_GISCUS_APP_HOST=http://127.0.0.1:4181. Never commit real environment files or PEM keys. Production app host is https://comments.songhai.site.

Run yarn install --frozen-lockfile, yarn test, yarn lint, yarn build. For local service: yarn cscript && yarn cthemes && yarn next dev -H 127.0.0.1 -p 4181. Home and Blog previews remain on 4174 and 5173. The website repo chooses the local comments service automatically on loopback.

## Custom interface

components/Giscus.tsx owns the composer → discussion summary → timeline → footer order. components/CommentBox.tsx uses a compact signed-out invitation and preserves Markdown preview, replies, keyboard submission, and drafts after failed submissions. styles/songhai.css contains the shared borderless hierarchy; styles/themes/songhai_light.css and songhai_dark.css own the palettes. The website embeds these named themes, with no cross-origin custom CSS fetch.

## Deploy and rollback

Vercel project franklin-comments builds this fork. Secrets belong only in encrypted server environment variables. Add comments.songhai.site to that project and configure the exact CNAME Vercel returns. OAuth callbacks include the production endpoint and the explicit local endpoint. Keep upstream giscus installed until the fork is fully verified.

Publish the service first, verify original discussions and GitHub OAuth, then publish the website embed switch. To roll back, restore the website's previous engagement module and theme assets; discussions stay intact in GitHub. Do not remove the old App or revoke existing credentials during rollout.
