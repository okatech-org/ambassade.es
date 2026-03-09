import { describe, expect, it } from "vitest";
import { getLocalizedValue } from "./i18n-utils";

describe("getLocalizedValue", () => {
	// ── Edge cases ──────────────────────────────────────
	it("returns empty string for undefined", () => {
		expect(getLocalizedValue(undefined, "fr")).toBe("");
	});

	it("returns empty string for null", () => {
		expect(getLocalizedValue(null, "fr")).toBe("");
	});

	it("returns string directly when value is a string", () => {
		expect(getLocalizedValue("Bonjour", "en")).toBe("Bonjour");
	});

	// ── French (default) ───────────────────────────────
	it("returns FR value for lang=fr", () => {
		const val = { fr: "Bonjour", en: "Hello", es: "Hola" };
		expect(getLocalizedValue(val, "fr")).toBe("Bonjour");
	});

	it("falls back to FR when lang is unknown", () => {
		const val = { fr: "Bonjour", en: "Hello", es: "Hola" };
		expect(getLocalizedValue(val, "de")).toBe("Bonjour");
	});

	// ── English ─────────────────────────────────────────
	it("returns EN value for lang=en", () => {
		const val = { fr: "Bonjour", en: "Hello", es: "Hola" };
		expect(getLocalizedValue(val, "en")).toBe("Hello");
	});

	it("handles locale with region code en-US", () => {
		const val = { fr: "Bonjour", en: "Hello", es: "Hola" };
		expect(getLocalizedValue(val, "en-US")).toBe("Hello");
	});

	// ── Spanish ─────────────────────────────────────────
	it("returns ES value for lang=es", () => {
		const val = { fr: "Bonjour", en: "Hello", es: "Hola" };
		expect(getLocalizedValue(val, "es")).toBe("Hola");
	});

	it("handles locale with region code es-ES", () => {
		const val = { fr: "Bonjour", en: "Hello", es: "Hola" };
		expect(getLocalizedValue(val, "es-ES")).toBe("Hola");
	});

	// ── Fallbacks ───────────────────────────────────────
	it("falls back to FR when EN is missing", () => {
		const val = { fr: "Bonjour" };
		expect(getLocalizedValue(val, "en")).toBe("Bonjour");
	});

	it("falls back to FR when ES is missing", () => {
		const val = { fr: "Bonjour" };
		expect(getLocalizedValue(val, "es")).toBe("Bonjour");
	});
});
