type PostLike = {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	category: string;
};

/**
 * Format a date for the given language.
 */
export function formatPostDate(timestamp: number, lang: string): string {
	const normalizedLang = lang.toLowerCase().split("-")[0];
	const locale =
		normalizedLang === "es"
			? "es-ES"
			: normalizedLang === "en"
				? "en-GB"
				: "fr-FR";
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(timestamp));
}

/**
 * Localize a post for the given language.
 *
 * Since posts are dynamically synced from LinkedIn and cleaned by Gemini AI,
 * there is no static EN/ES copy map — we keep the original French content.
 * This function is a centralized hook for future per-slug overrides and handles
 * the category label translation.
 */
export function localizePostForLanguage<T extends PostLike>(
	post: T,
	lang: string,
): T {
	const normalizedLang = lang.toLowerCase().split("-")[0];
	if (normalizedLang === "fr") return post;

	// For now, return post as-is (French content serves as universal fallback).
	// When the admin panel supports per-post EN/ES fields, or when an AI
	// translation pipeline is added, this function will apply the translations.
	return post;
}
