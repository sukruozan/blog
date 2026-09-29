import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const siteUrl = site ? site.toString().replace(/\/$/, '') : 'https://blog.sukruozan.com';

	const sections = [
		`# ${SITE_TITLE} - Tam Blog Arşivi`,
		'',
		`> ${SITE_DESCRIPTION}`,
		`> URL: ${siteUrl}`,
		'',
		'---',
		'',
	];

	for (const post of posts) {
		const postDate = post.data.pubDate.toISOString().split('T')[0];
		sections.push(`## ${post.data.title}`);
		sections.push(`- **Tarih**: ${postDate}`);
		sections.push(`- **URL**: ${siteUrl}/blog/${post.id}/`);
		if (post.data.description) {
			sections.push(`- **Özet**: ${post.data.description}`);
		}
		sections.push('');
		if (post.body) {
			sections.push(post.body.trim());
		}
		sections.push('');
		sections.push('---');
		sections.push('');
	}

	return new Response(sections.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
