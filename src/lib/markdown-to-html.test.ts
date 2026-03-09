import { describe, expect, it } from "vitest";
import { markdownToHtml } from "./markdown-to-html";

describe("markdownToHtml", () => {
	it("returns empty string for falsy input", () => {
		expect(markdownToHtml("")).toBe("");
	});

	it("passes HTML through unchanged", () => {
		const html = '<p class="test">Hello</p>';
		expect(markdownToHtml(html)).toBe(html);
	});

	it("converts ## headings to h3", () => {
		const result = markdownToHtml("## Titre");
		expect(result).toContain("<h3");
		expect(result).toContain("Titre");
	});

	it("converts ### headings to h4", () => {
		const result = markdownToHtml("### Sous-titre");
		expect(result).toContain("<h4");
		expect(result).toContain("Sous-titre");
	});

	it("converts **bold** to <strong>", () => {
		const result = markdownToHtml("Ce texte est **important** ici.");
		expect(result).toContain("<strong>important</strong>");
	});

	it("converts blockquotes", () => {
		const result = markdownToHtml("> Citation importante");
		expect(result).toContain("<blockquote");
		expect(result).toContain("Citation importante");
	});

	it("converts unordered lists", () => {
		const input = "- Premier\n- Deuxième\n- Troisième";
		const result = markdownToHtml(input);
		expect(result).toContain("<ul");
		expect(result).toContain("<li");
		expect(result).toContain("Premier");
		expect(result).toContain("Deuxième");
		expect(result).toContain("Troisième");
	});

	it("wraps plain text in paragraphs", () => {
		const result = markdownToHtml("Un paragraphe simple.");
		expect(result).toContain("<p");
		expect(result).toContain("Un paragraphe simple.");
	});

	it("handles complex mixed content", () => {
		const input = `## Section

Un paragraphe avec du **gras**.

- Item 1
- Item 2

> Note importante`;

		const result = markdownToHtml(input);
		expect(result).toContain("<h3");
		expect(result).toContain("<strong>gras</strong>");
		expect(result).toContain("<ul");
		expect(result).toContain("<blockquote");
	});
});
