import { describe, expect, it } from "vitest";
import { localizeServiceForLanguage } from "./services-localization";

// Minimal mock service matching the ServiceLike type
function mockService(slug: string, overrides: Record<string, unknown> = {}) {
	return {
		slug,
		title: `Titre FR — ${slug}`,
		description: `Description FR — ${slug}`,
		requirements: ["Pièce A", "Pièce B"],
		notes: undefined as string | undefined,
		delay: "24h à 72h",
		validity: "1 an",
		titleEn: undefined as string | undefined,
		titleEs: undefined as string | undefined,
		descriptionEn: undefined as string | undefined,
		descriptionEs: undefined as string | undefined,
		...overrides,
	};
}

describe("localizeServiceForLanguage", () => {
	// ── French: pass-through ────────────────────────────
	it("returns service unchanged for lang=fr", () => {
		const service = mockService("carte-consulaire");
		const result = localizeServiceForLanguage(service, "fr");
		expect(result).toBe(service); // Same reference
	});

	it("returns service unchanged for lang=fr-FR", () => {
		const service = mockService("carte-consulaire");
		const result = localizeServiceForLanguage(service, "fr-FR");
		expect(result).toBe(service);
	});

	// ── English ─────────────────────────────────────────
	it("localizes known service to English", () => {
		const service = mockService("carte-consulaire");
		const result = localizeServiceForLanguage(service, "en");
		expect(result.title).toBe("Consular Card");
		expect(result.description).toContain("identification document");
		expect(result.requirements?.length).toBeGreaterThan(0);
	});

	it("translates delay to English", () => {
		const service = mockService("carte-consulaire", { delay: "24h à 72h" });
		const result = localizeServiceForLanguage(service, "en");
		expect(result.delay).toBe("24 to 72 hours");
	});

	it("translates validity to English", () => {
		const service = mockService("carte-consulaire", { validity: "3 ans" });
		const result = localizeServiceForLanguage(service, "en");
		expect(result.validity).toBe("3 years");
	});

	it("uses DB titleEn over copy map when available", () => {
		const service = mockService("carte-consulaire", {
			titleEn: "DB Override Title",
		});
		const result = localizeServiceForLanguage(service, "en");
		expect(result.title).toBe("DB Override Title");
	});

	it("falls back to FR for unknown slug in EN", () => {
		const service = mockService("unknown-slug-xyz");
		const result = localizeServiceForLanguage(service, "en");
		expect(result.title).toBe("Titre FR — unknown-slug-xyz");
	});

	// ── Spanish ─────────────────────────────────────────
	it("localizes known service to Spanish", () => {
		const service = mockService("carte-consulaire");
		const result = localizeServiceForLanguage(service, "es");
		expect(result.title).toBe("Tarjeta Consular");
		expect(result.description).toContain("consular");
	});

	it("translates delay to Spanish", () => {
		const service = mockService("carte-consulaire", { delay: "Immédiat" });
		const result = localizeServiceForLanguage(service, "es");
		expect(result.delay).toBe("Inmediato");
	});

	it("translates validity to Spanish", () => {
		const service = mockService("carte-consulaire", { validity: "1 an" });
		const result = localizeServiceForLanguage(service, "es");
		expect(result.validity).toBe("1 año");
	});

	it("uses DB titleEs over copy map when available", () => {
		const service = mockService("carte-consulaire", {
			titleEs: "Título desde DB",
		});
		const result = localizeServiceForLanguage(service, "es");
		expect(result.title).toBe("Título desde DB");
	});

	it("handles es-ES locale variant", () => {
		const service = mockService("carte-consulaire");
		const result = localizeServiceForLanguage(service, "es-ES");
		expect(result.title).toBe("Tarjeta Consular");
	});

	// ── Edge cases ──────────────────────────────────────
	it("preserves original delay if not in map", () => {
		const service = mockService("carte-consulaire", {
			delay: "Délai personnalisé",
		});
		const result = localizeServiceForLanguage(service, "en");
		expect(result.delay).toBe("Délai personnalisé");
	});

	it("preserves undefined delay", () => {
		const service = mockService("carte-consulaire", { delay: undefined });
		const result = localizeServiceForLanguage(service, "en");
		expect(result.delay).toBeUndefined();
	});
});
