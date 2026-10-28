import Head from 'next/head';

export default function CommentsHome() {
  return (
    <>
      <Head>
        <title>Franklin Comments</title>
        <meta name="description" content="A place for conversations on Songhai's website." />
      </Head>
      <main
        style={{
          maxWidth: 640,
          margin: '12vh auto',
          padding: 24,
          fontFamily: 'Helvetica Neue, Arial, sans-serif',
        }}
      >
        <p style={{ fontSize: 12, color: '#75706a' }}>SONGHAI</p>
        <h1 style={{ fontSize: 32, fontWeight: 500, margin: '20px 0' }}>让想法继续对话。</h1>
        <p style={{ lineHeight: 1.8 }}>
          这里为首页与博客提供留言服务。使用 GitHub 登录，留言与回复保存在 GitHub Discussions。
        </p>
        <nav style={{ display: 'flex', gap: 24, marginTop: 32 }}>
          <a href="https://songhai.site">首页 ↗</a>
          <a href="https://blog.songhai.site">博客 ↗</a>
        </nav>
        <p style={{ marginTop: 64, fontSize: 12, color: '#75706a' }}>
          <a href="https://github.com/SonghaiFan/franklin-comments">Franklin Comments</a> · Built
          with <a href="https://github.com/giscus/giscus">giscus</a>
        </p>
      </main>
    </>
  );
}
