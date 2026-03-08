/**
 * Lightweight Markdown → HTML converter.
 *
 * Handles the subset of markdown typically found in service descriptions:
 *   - ## / ### headings
 *   - **bold**
 *   - Unordered lists (lines starting with ` - `)
 *   - Blockquotes (`> …`)
 *   - Paragraphs separated by blank lines
 *
 * Falls back to the original string if it already looks like HTML.
 */
export function markdownToHtml(md: string): string {
	if (!md) return "";

	// If the content already contains HTML tags, return as-is
	if (/<[a-z][\s\S]*>/i.test(md)) return md;

	let html = md;

	// Normalise line breaks
	html = html.replace(/\r\n/g, "\n");

	// --- Headings ---
	html = html.replace(
		/^### (.+)$/gm,
		'<h4 class="font-semibold text-sm mt-4 mb-1">$1</h4>',
	);
	html = html.replace(
		/^## (.+)$/gm,
		'<h3 class="font-semibold text-base mt-5 mb-2">$1</h3>',
	);

	// --- Bold ---
	html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

	// --- Blockquotes ---
	html = html.replace(
		/^> (.+)$/gm,
		'<blockquote class="border-l-4 border-primary/30 pl-3 italic text-muted-foreground my-2">$1</blockquote>',
	);

	// --- Unordered list items (lines starting with " - " or "- ") ---
	// First, wrap consecutive list items in <ul>
	html = html.replace(/((?:^[ \t]*- .+\n?)+)/gm, (match) => {
		const items = match
			.split("\n")
			.filter((l) => l.trim().startsWith("- "))
			.map((l) => `<li class="ml-4">${l.trim().replace(/^- /, "")}</li>`)
			.join("\n");
		return `<ul class="list-disc pl-4 space-y-1 my-2">\n${items}\n</ul>\n`;
	});

	// --- Paragraphs: wrap remaining loose text blocks ---
	// Split by double newlines for paragraphs
	const blocks = html.split(/\n{2,}/);
	html = blocks
		.map((block) => {
			const trimmed = block.trim();
			if (!trimmed) return "";
			// Don't wrap if already an HTML block element
			if (/^<(h[1-6]|ul|ol|li|blockquote|div|section|p)/i.test(trimmed)) {
				return trimmed;
			}
			return `<p class="my-2">${trimmed.replace(/\n/g, "<br/>")}</p>`;
		})
		.join("\n");

	return html;
}
