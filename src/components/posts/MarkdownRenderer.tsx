import { useMemo } from "react";

/**
 * Lightweight Markdown-to-HTML renderer.
 * Handles: headings, bold, italic, links, unordered/ordered lists,
 * blockquotes, horizontal rules, and paragraphs.
 * Also strips trailing LinkedIn hashtag blocks automatically.
 */

function stripLinkedInHashtags(md: string): string {
	// Remove trailing block of hashtags (e.g. #GabonFITUR2026 #BusinessTravel ...)
	return md.replace(/(\n\s*)(#\w[\w\d]*\s*){3,}$/gm, "").trimEnd();
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
	let result = escapeHtml(text);
	// Bold: **text** or __text__
	result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
	result = result.replace(/__(.+?)__/g, "<strong>$1</strong>");
	// Italic: *text* or _text_
	result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
	result = result.replace(/(?<!\w)_(.+?)_(?!\w)/g, "<em>$1</em>");
	// Links: [text](url)
	result = result.replace(
		/\[([^\]]+)\]\(([^)]+)\)/g,
		'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>',
	);
	// Inline code
	result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
	return result;
}

export function markdownToHtml(md: string): string {
	if (!md) return "";

	const cleaned = stripLinkedInHashtags(md);
	const lines = cleaned.split("\n");
	const htmlParts: string[] = [];
	let inList: "ul" | "ol" | null = null;
	let inBlockquote = false;
	let paragraphBuffer: string[] = [];

	const flushParagraph = () => {
		if (paragraphBuffer.length > 0) {
			const text = paragraphBuffer.join(" ").trim();
			if (text) {
				htmlParts.push(`<p>${renderInline(text)}</p>`);
			}
			paragraphBuffer = [];
		}
	};

	const closeList = () => {
		if (inList) {
			htmlParts.push(`</${inList}>`);
			inList = null;
		}
	};

	const closeBlockquote = () => {
		if (inBlockquote) {
			htmlParts.push("</blockquote>");
			inBlockquote = false;
		}
	};

	for (const line of lines) {
		const trimmed = line.trim();

		// Empty line = paragraph break
		if (!trimmed) {
			flushParagraph();
			closeList();
			closeBlockquote();
			continue;
		}

		// Headings
		const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
		if (headingMatch) {
			flushParagraph();
			closeList();
			closeBlockquote();
			const level = headingMatch[1].length;
			htmlParts.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
			continue;
		}

		// Horizontal rule
		if (/^[-*_]{3,}$/.test(trimmed)) {
			flushParagraph();
			closeList();
			closeBlockquote();
			htmlParts.push("<hr />");
			continue;
		}

		// Unordered list items
		const ulMatch = trimmed.match(/^[-*+]\s+(.+)$/);
		if (ulMatch) {
			flushParagraph();
			closeBlockquote();
			if (inList !== "ul") {
				closeList();
				htmlParts.push("<ul>");
				inList = "ul";
			}
			htmlParts.push(`<li>${renderInline(ulMatch[1])}</li>`);
			continue;
		}

		// Ordered list items
		const olMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);
		if (olMatch) {
			flushParagraph();
			closeBlockquote();
			if (inList !== "ol") {
				closeList();
				htmlParts.push("<ol>");
				inList = "ol";
			}
			htmlParts.push(`<li>${renderInline(olMatch[1])}</li>`);
			continue;
		}

		// Blockquote
		const bqMatch = trimmed.match(/^>\s*(.*)$/);
		if (bqMatch) {
			flushParagraph();
			closeList();
			if (!inBlockquote) {
				htmlParts.push("<blockquote>");
				inBlockquote = true;
			}
			if (bqMatch[1]) {
				htmlParts.push(`<p>${renderInline(bqMatch[1])}</p>`);
			}
			continue;
		}

		// Regular text — accumulate for paragraph
		closeList();
		closeBlockquote();
		paragraphBuffer.push(trimmed);
	}

	// Flush remaining
	flushParagraph();
	closeList();
	closeBlockquote();

	return htmlParts.join("\n");
}

interface MarkdownRendererProps {
	content: string;
	className?: string;
}

export function MarkdownRenderer({
	content,
	className,
}: MarkdownRendererProps) {
	const html = useMemo(() => markdownToHtml(content), [content]);

	return (
		<div
			className={className}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized md→html
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
