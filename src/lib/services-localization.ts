type LocalizedFields = {
	title?: string;
	description?: string;
	requirements?: string[];
	notes?: string;
};

type ServiceLike = {
	slug: string;
	title: string;
	titleEn?: string;
	description: string;
	descriptionEn?: string;
	requirements?: string[];
	notes?: string;
	delay?: string;
	validity?: string;
};

const EN_DELAY_MAP: Record<string, string> = {
	"Selon disponibilite": "Subject to availability",
	"Selon disponibilité": "Subject to availability",
	"Immediat (dossier complet)": "Immediate (complete file)",
	"Immédiat (dossier complet)": "Immediate (complete file)",
	Immediat: "Immediate",
	Immédiat: "Immediate",
	"24h a 72h": "24 to 72 hours",
	"24h à 72h": "24 to 72 hours",
	"24h a 48h": "24 to 48 hours",
	"24h à 48h": "24 to 48 hours",
	"Variable (procedure complexe)": "Variable (complex procedure)",
	"Variable (procédure complexe)": "Variable (complex procedure)",
	"Sur rendez-vous": "By appointment",
	"Minimum 10 jours (publication des bans)":
		"Minimum 10 days (publication of banns)",
};

const EN_VALIDITY_MAP: Record<string, string> = {
	"3 ans": "3 years",
	"1 an": "1 year",
	"30 jours": "30 days",
};

const EN_SERVICE_COPY: Record<string, LocalizedFields> = {
	"carte-consulaire": {
		title: "Consular Card",
		description:
			"Identification document for Gabonese nationals residing in Spain. Mandatory for any Gabonese citizen living in the Kingdom of Spain.",
		requirements: [
			"1 copy of the birth certificate (issued within the last 6 months)",
			"1 copy of a valid passport",
			"1 copy of a valid residence permit",
			"1 recent proof of address",
			"2 identity photos (official format)",
		],
	},
	"tenant-lieu": {
		title: "Passport Replacement Certificate",
		description:
			"Temporary document issued to replace a lost, stolen, or expired passport, allowing temporary travel.",
		requirements: [
			"Loss or theft declaration (police receipt)",
			"1 copy of the previous passport (if available)",
			"1 copy of the birth certificate",
			"1 copy of the residence permit",
			"1 proof of address",
			"2 identity photos",
		],
	},
	"laissez-passer": {
		title: "Laissez-Passer",
		description:
			"Emergency travel document issued for a single one-way journey, especially in case of repatriation or urgent travel without a passport.",
		requirements: [
			"Passport loss or theft declaration",
			"1 copy of the birth certificate",
			"1 copy of the residence permit (if applicable)",
			"1 proof of address",
			"2 identity photos",
			"Proof of travel reason (flight ticket, medical certificate, etc.)",
		],
	},
	"attestation-patronymique": {
		title: "Patronymic Certificate",
		description:
			"Official act allowing parents to assign a surname and first name(s) to an unborn child. It may be issued before birth.",
		requirements: [
			"Copies of both parents' identity documents (passport or national ID)",
			"Copy of parents' marriage certificate (if married)",
			"Pregnancy certificate or medical attestation",
			"Copy of family record book (if available)",
		],
	},
	"transcription-naissance": {
		title: "Birth Certificate Transcription",
		description:
			"Registration in consular records of a birth certificate issued in France. Required for recognition by Gabonese civil status authorities.",
		requirements: [
			"Full copy of the French birth certificate (issued by the town hall of place of birth)",
			"Copies of both parents' identity documents",
			"Copy of parents' marriage certificate (if married)",
			"Copy of family record book",
			"Copies of parents' residence permits",
			"2 identity photos of the child (if applicable)",
		],
	},
	"attestation-filiation": {
		title: "Filiation Certificate",
		description:
			"Officially establishes the filiation link between a child and their parents. Required for family reunification, inheritance, or civil status procedures.",
		requirements: [
			"Copy of the child's birth certificate",
			"Copies of parents' birth certificates",
			"Copy of family record book",
			"Copies of parents' and child's passports",
			"Acknowledgment of paternity/maternity act (if applicable)",
		],
	},
	"certificat-coutume-celibat": {
		title: "Customary Law and Single-Status Certificates",
		description:
			"The customary certificate confirms Gabonese legal provisions related to marriage. The single-status certificate confirms that the applicant is not married in Gabon.",
		requirements: [
			"Copy of birth certificate (less than 6 months old)",
			"Copy of passport",
			"Copy of residence permit",
			"Copy of future spouse's identity document (for customary certificate)",
			"Proof of address",
			"Sworn statement of single status (for single-status certificate)",
		],
	},
	"transcription-mariage": {
		title: "Marriage Certificate Transcription",
		description:
			"Registration in consular records of a marriage celebrated in France. Enables recognition by Gabonese civil status authorities.",
		requirements: [
			"Full copy of the French marriage certificate",
			"Copies of both spouses' birth certificates",
			"Copies of both spouses' passports",
			"Copies of residence permits",
			"Copy of French family record book (if issued)",
			"Customary certificate (if marriage was celebrated with a Gabonese customary certificate)",
		],
	},
	"celebration-mariage": {
		title: "Marriage Celebration at the Consulate",
		description:
			"The General Consulate may celebrate marriages between two Gabonese nationals in accordance with Gabonese law. The ceremony is held exclusively on Consulate premises.",
		requirements: [
			"Birth certificates of both spouses (less than 6 months old)",
			"Copies of both spouses' Gabonese passports",
			"Copies of residence permits",
			"Single-status certificate for each spouse",
			"Customary certificate",
			"Prenuptial medical certificate",
			"Proofs of address",
			"List of witnesses (minimum 2, maximum 4) with copies of their identity documents",
			"Publication of banns (at least 10 days before the ceremony date)",
		],
	},
	"transcription-deces": {
		title: "Death Certificate Transcription",
		description:
			"Registration in consular records of a death occurring in France. Enables recognition by Gabonese civil status authorities and is required for inheritance procedures.",
		requirements: [
			"Full copy of the French death certificate",
			"Copy of the deceased's birth certificate",
			"Copy of the deceased's passport",
			"Copy of the deceased's consular card",
			"Copy of declarant's identity document",
		],
	},
	"rapatriement-corps": {
		title: "Human Remains Repatriation Certificate",
		description:
			"Administrative document required for repatriation of a Gabonese national's remains from France to Gabon.",
		requirements: [
			"Copy of death certificate (issued by French town hall)",
			"Copy of the deceased's passport",
			"Copy of the deceased's consular card",
			"Non-contagion medical certificate",
			"Hermetic sealing certificate for the coffin",
			"Body transport authorization (issued by prefecture)",
			"Copy of identity document of the person handling formalities",
		],
		notes:
			"Complex process involving several French and Gabonese administrations. The Consulate supports families throughout all steps.",
	},
	"attestation-concordance": {
		title: "Identity Consistency Certificate",
		description:
			"Certifies that one person is referred to by different names or first names across different documents. Useful when administrative records are inconsistent.",
		requirements: [
			"Copies of documents showing discrepancies",
			"Copy of birth certificate",
			"Copy of passport",
			"Any document proving it concerns the same person",
		],
	},
	"fiche-familiale": {
		title: "Family Civil Status Record",
		description:
			"Document summarizing the family composition of a Gabonese national (spouse, children). Used for administrative, social, and tax procedures in France.",
		requirements: [
			"Copy of marriage certificate",
			"Copies of birth certificates of all children",
			"Copy of applicant's passport",
			"Copy of residence permit",
			"Copy of family record book",
		],
	},
	"certificat-nationalite": {
		title: "Nationality Certificate",
		description:
			"Official document certifying that the holder has Gabonese nationality. It may be required for certain administrative or legal procedures.",
		requirements: [
			"Copy of birth certificate",
			"Copy of Gabonese passport",
			"Copies of parents' birth certificates (to prove filiation)",
			"Copy of parents' nationality certificate (if available)",
			"2 identity photos",
		],
	},
	"attestation-revenus": {
		title: "Income Certificate",
		description:
			"Certifies income received by a Gabonese national. May be required for procedures in Gabon (inheritance, loan applications, etc.).",
		requirements: [
			"Copy of passport",
			"Copy of residence permit",
			"Income proofs (pay slips, tax notice, employer certificate)",
			"Proof of address",
		],
	},
	"attestation-permis": {
		title: "Driving License Validity Certificate",
		description:
			"Certifies validity of a Gabonese driving license for license exchange procedures in France or any administrative use.",
		requirements: [
			"Copy of Gabonese driving license",
			"Copy of passport",
			"Copy of residence permit",
			"Proof of address",
			"Sworn translation of driving license (if required)",
		],
	},
	"attestation-capacite-juridique": {
		title: "Legal Capacity Certificate",
		description:
			"Certifies that a person has full legal capacity (not under guardianship, curatorship, or legal prohibition). Useful for real-estate transactions, powers of attorney, and notarial acts.",
		requirements: [
			"Copy of birth certificate",
			"Copy of passport",
			"Copy of residence permit",
			"Sworn statement of legal capacity",
			"Proof of address",
		],
	},
	"certificat-vie-entretien": {
		title: "Certificate of Life and Support",
		description:
			"Certifies that a person is alive and, where applicable, supported by a third party. Required by pension funds, social organizations, or inheritance procedures.",
		requirements: [
			"Copy of passport",
			"Copy of residence permit",
			"Proof of address",
			"Form from requesting organization (if applicable)",
		],
		notes:
			"The applicant's physical presence at the Consulate is generally required.",
	},
	legalisation: {
		title: "Document Legalization",
		description:
			"Authentication of the signature affixed on a Gabonese-origin document so it is recognized as valid in France, or vice versa. Legalization confirms that the signatory had authority to sign.",
		requirements: [
			"Original document to legalize",
			"Copy of applicant's passport",
			"Copy of residence permit",
		],
	},
	"demande-audience": {
		title: "Audience Request",
		description:
			"Request for an appointment with the Consul General for any consular or administrative matter.",
		requirements: [
			"Handwritten request or reasoned email",
			"Identity document",
			"Detailed purpose of the request",
		],
	},
};

export function localizeServiceForLanguage<T extends ServiceLike>(
	service: T,
	lang: string,
): T {
	if (!lang.toLowerCase().startsWith("en")) return service;

	const copy = EN_SERVICE_COPY[service.slug];
	const localizedDelay = service.delay
		? EN_DELAY_MAP[service.delay] || service.delay
		: service.delay;
	const localizedValidity = service.validity
		? EN_VALIDITY_MAP[service.validity] || service.validity
		: service.validity;

	return {
		...service,
		title: service.titleEn || copy?.title || service.title,
		description:
			service.descriptionEn || copy?.description || service.description,
		requirements: copy?.requirements || service.requirements,
		notes: copy?.notes || service.notes,
		delay: localizedDelay,
		validity: localizedValidity,
	};
}
