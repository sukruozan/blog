import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const siteUrl = site ? site.toString().replace(/\/$/, '') : 'https://blog.sukruozan.com';

	const lines = [
		`# ${SITE_TITLE}`,
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		'## Blog Yazıları',
		'',
		...posts.map(
			(post) =>
				`- [${post.data.title}](${siteUrl}/blog/${post.id}/): ${post.data.description || post.data.title} (${post.data.pubDate.toISOString().split('T')[0]})`,
		),
		'',
		'## Yazar Hakkında',
		'',
		`- [Özgeçmiş / Profil](https://registry.jsonresume.org/sukruozan): Şükrü Ozan hakkında detaylı bilgi ve özgeçmiş.`,
		'',
		'## Ek Kaynaklar',
		'',
		`- [Tüm Blog İçeriği (Tam Metin)](${siteUrl}/llms-full.txt): LLM ve yapay zeka ajanları için tüm blog yazılarının birleştirilmiş tam metni.`,
		`- [RSS Beslemesi](${siteUrl}/rss.xml): Güncel içerik beslemesi.`,
		`- [Site Haritası](${siteUrl}/sitemap-index.xml): XML site haritası.`,
	];

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
