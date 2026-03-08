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
	titleEs?: string;
	description: string;
	descriptionEn?: string;
	descriptionEs?: string;
	requirements?: string[];
	notes?: string;
	delay?: string;
	validity?: string;
};

// ─── English Maps ────────────────────────────────────────────────────────────

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
	"Immédiat ou sous 5 jours ouvrables": "Immediate or within 5 business days",
	"3 à 5 jours ouvrables": "3 to 5 business days",
	"10 jours (bans)": "10 days (banns)",
};

const EN_VALIDITY_MAP: Record<string, string> = {
	"3 ans": "3 years",
	"1 an": "1 year",
	"30 jours": "30 days",
};

// ─── Spanish Maps ────────────────────────────────────────────────────────────

const ES_DELAY_MAP: Record<string, string> = {
	"Selon disponibilite": "Según disponibilidad",
	"Selon disponibilité": "Según disponibilidad",
	"Immediat (dossier complet)": "Inmediato (expediente completo)",
	"Immédiat (dossier complet)": "Inmediato (expediente completo)",
	Immediat: "Inmediato",
	Immédiat: "Inmediato",
	"24h a 72h": "24 a 72 horas",
	"24h à 72h": "24 a 72 horas",
	"24h a 48h": "24 a 48 horas",
	"24h à 48h": "24 a 48 horas",
	"Variable (procedure complexe)": "Variable (trámite complejo)",
	"Variable (procédure complexe)": "Variable (trámite complejo)",
	"Sur rendez-vous": "Con cita previa",
	"Minimum 10 jours (publication des bans)":
		"Mínimo 10 días (publicación de edictos)",
	"Immédiat ou sous 5 jours ouvrables": "Inmediato o en 5 días hábiles",
	"3 à 5 jours ouvrables": "3 a 5 días hábiles",
	"10 jours (bans)": "10 días (edictos)",
};

const ES_VALIDITY_MAP: Record<string, string> = {
	"3 ans": "3 años",
	"1 an": "1 año",
	"30 jours": "30 días",
};

// ─── English Service Copy ────────────────────────────────────────────────────

const EN_SERVICE_COPY: Record<string, LocalizedFields> = {
	"carte-consulaire": {
		title: "Consular Card",
		description:
			"Official identification document for Gabonese nationals residing in Spain. Free and strongly recommended for all Gabonese citizens living in the Kingdom of Spain.",
		requirements: [
			"1 copy of the birth certificate (issued within the last 6 months)",
			"1 copy of a valid passport",
			"1 copy of a valid residence permit (NIE)",
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
	"tenant-lieu-passeport": {
		title: "Passport Replacement Certificate",
		description:
			"Provisional travel document replacing an expired or unusable passport. Valid for 1 year. Issued while awaiting a new passport.",
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
		title: "Emergency Travel Document (Laissez-Passer)",
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
			"Registration in consular records of a birth certificate issued in Spain. Required for recognition by Gabonese civil status authorities.",
		requirements: [
			"Full copy of the Spanish birth certificate",
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
			"Registration in consular records of a marriage celebrated in Spain. Enables recognition by Gabonese civil status authorities.",
		requirements: [
			"Full copy of the Spanish marriage certificate",
			"Copies of both spouses' birth certificates",
			"Copies of both spouses' passports",
			"Copies of residence permits",
			"Copy of Spanish family record book (if issued)",
		],
	},
	mariage: {
		title: "Marriage",
		description:
			"Formalities for marriages celebrated at the Embassy or at a Spanish civil registry.",
	},
	"celebration-mariage": {
		title: "Marriage Celebration at the Embassy",
		description:
			"The Embassy may celebrate marriages between two Gabonese nationals in accordance with Gabonese law.",
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
			"Registration in consular records of a death occurring in Spain. Enables recognition by Gabonese civil status authorities and is required for inheritance procedures.",
		requirements: [
			"Full copy of the Spanish death certificate",
			"Copy of the deceased's birth certificate",
			"Copy of the deceased's passport",
			"Copy of the deceased's consular card",
			"Copy of declarant's identity document",
		],
	},
	"rapatriement-corps": {
		title: "Human Remains Repatriation Certificate",
		description:
			"Administrative document required for repatriation of a Gabonese national's remains from Spain to Gabon.",
		requirements: [
			"Copy of death certificate",
			"Copy of the deceased's passport",
			"Copy of the deceased's consular card",
			"Non-contagion medical certificate",
			"Hermetic sealing certificate for the coffin",
			"Body transport authorization",
			"Copy of identity document of the person handling formalities",
		],
		notes:
			"Complex process involving several Spanish and Gabonese administrations. The Embassy supports families throughout all steps.",
	},
	"attestation-concordance": {
		title: "Identity Consistency Certificate",
		description:
			"Certifies that one person is referred to by different names or first names across different documents.",
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
			"Document summarizing the family composition of a Gabonese national (spouse, children). Used for administrative, social, and tax procedures in Spain.",
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
			"Official document certifying that the holder has Gabonese nationality.",
		requirements: [
			"Copy of birth certificate",
			"Copy of Gabonese passport",
			"Copies of parents' birth certificates",
			"Copy of parents' nationality certificate (if available)",
			"2 identity photos",
		],
	},
	"attestation-revenus": {
		title: "Income Certificate",
		description:
			"Certifies income received by a Gabonese national. May be required for procedures in Gabon.",
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
			"Certifies validity of a Gabonese driving license for exchange or administrative procedures in Spain.",
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
			"Certifies that a person has full legal capacity (not under guardianship or curatorship).",
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
			"Certifies that a person is alive and, where applicable, supported by a third party.",
		requirements: [
			"Copy of passport",
			"Copy of residence permit",
			"Proof of address",
			"Form from requesting organization (if applicable)",
		],
		notes:
			"The applicant's physical presence at the Embassy is generally required.",
	},
	legalisation: {
		title: "Document Legalization",
		description:
			"Authentication of a signature on a Gabonese-origin document for recognition in Spain, or vice versa.",
		requirements: [
			"Original document to legalize",
			"Copy of applicant's passport",
			"Copy of residence permit",
		],
	},
	"demande-audience": {
		title: "Audience Request",
		description:
			"Request for an appointment with the Ambassador for any consular or administrative matter.",
		requirements: [
			"Handwritten request or reasoned email",
			"Identity document",
			"Detailed purpose of the request",
		],
	},
	divorce: {
		title: "Divorce",
		description: "Information on divorce procedures.",
	},
	pacs: {
		title: "PACS (Civil Partnership)",
		description:
			"Information on the Civil Partnership (PACS) for Gabonese nationals in Spain.",
	},
};

// ─── Spanish Service Copy ────────────────────────────────────────────────────

const ES_SERVICE_COPY: Record<string, LocalizedFields> = {
	"carte-consulaire": {
		title: "Tarjeta Consular",
		description:
			"Documento oficial de identificación consular, gratuito y altamente recomendado para todo ciudadano gabonés residente en el Reino de España.",
		requirements: [
			"1 copia del acta de nacimiento (emitida en los últimos 6 meses)",
			"1 copia del pasaporte vigente",
			"1 copia del permiso de residencia vigente (NIE)",
			"1 justificante de domicilio reciente",
			"2 fotos de identidad (formato oficial)",
		],
	},
	"tenant-lieu": {
		title: "Certificado sustitutivo de pasaporte",
		description:
			"Documento provisional emitido en caso de pérdida, robo o caducidad del pasaporte, que permite viajar temporalmente.",
		requirements: [
			"Denuncia de pérdida o robo (recibo policial)",
			"1 copia del pasaporte anterior (si está disponible)",
			"1 copia del acta de nacimiento",
			"1 copia del permiso de residencia",
			"1 justificante de domicilio",
			"2 fotos de identidad",
		],
	},
	"tenant-lieu-passeport": {
		title: "Certificado sustitutivo de pasaporte",
		description:
			"Documento provisional de viaje que sustituye un pasaporte caducado o inutilizable. Validez: 1 año. Emitido a la espera del nuevo pasaporte.",
		requirements: [
			"Denuncia de pérdida o robo (recibo policial)",
			"1 copia del pasaporte anterior (si está disponible)",
			"1 copia del acta de nacimiento",
			"1 copia del permiso de residencia",
			"1 justificante de domicilio",
			"2 fotos de identidad",
		],
	},
	"laissez-passer": {
		title: "Salvoconducto (Laissez-Passer)",
		description:
			"Documento de viaje de emergencia emitido para un trayecto único, especialmente en caso de repatriación o viaje urgente sin pasaporte.",
		requirements: [
			"Denuncia de pérdida o robo del pasaporte",
			"1 copia del acta de nacimiento",
			"1 copia del permiso de residencia (si procede)",
			"1 justificante de domicilio",
			"2 fotos de identidad",
			"Justificante del motivo del viaje (billete de avión, certificado médico, etc.)",
		],
	},
	"attestation-patronymique": {
		title: "Certificado Patronímico",
		description:
			"Acto oficial que permite a los padres atribuir un nombre y apellido(s) a un hijo por nacer. Puede emitirse antes del nacimiento.",
		requirements: [
			"Copias de los documentos de identidad de ambos padres (pasaporte o DNI)",
			"Copia del certificado de matrimonio de los padres (si están casados)",
			"Certificado de embarazo o atestación médica",
			"Copia del libro de familia (si está disponible)",
		],
	},
	"transcription-naissance": {
		title: "Transcripción de Acta de Nacimiento",
		description:
			"Inscripción en los registros consulares de un acta de nacimiento emitida en España. Necesaria para el reconocimiento por las autoridades de estado civil gabonesas.",
		requirements: [
			"Copia íntegra del acta de nacimiento española",
			"Copias de los documentos de identidad de ambos padres",
			"Copia del certificado de matrimonio de los padres (si están casados)",
			"Copia del libro de familia",
			"Copias de los permisos de residencia de los padres",
			"2 fotos de identidad del niño (si procede)",
		],
	},
	"attestation-filiation": {
		title: "Certificado de Filiación",
		description:
			"Establece oficialmente el vínculo de filiación entre un hijo y sus padres. Necesario para la reagrupación familiar, herencias o trámites de estado civil.",
		requirements: [
			"Copia del acta de nacimiento del hijo",
			"Copias de las actas de nacimiento de los padres",
			"Copia del libro de familia",
			"Copias de los pasaportes de los padres y del hijo",
			"Acto de reconocimiento de paternidad/maternidad (si procede)",
		],
	},
	"certificat-coutume-celibat": {
		title: "Certificados de Costumbre y de Soltería",
		description:
			"El certificado de costumbre confirma las disposiciones legales gabonesas relativas al matrimonio. El certificado de soltería confirma que el solicitante no está casado en Gabón.",
		requirements: [
			"Copia del acta de nacimiento (menos de 6 meses)",
			"Copia del pasaporte",
			"Copia del permiso de residencia",
			"Copia del documento de identidad del futuro cónyuge (para el certificado de costumbre)",
			"Justificante de domicilio",
			"Declaración jurada de soltería (para el certificado de soltería)",
		],
	},
	"transcription-mariage": {
		title: "Transcripción de Acta de Matrimonio",
		description:
			"Inscripción en los registros consulares de un matrimonio celebrado en España. Permite el reconocimiento por las autoridades de estado civil gabonesas.",
		requirements: [
			"Copia íntegra del acta de matrimonio española",
			"Copias de las actas de nacimiento de ambos cónyuges",
			"Copias de los pasaportes de ambos cónyuges",
			"Copias de los permisos de residencia",
			"Copia del libro de familia español (si se ha expedido)",
		],
	},
	mariage: {
		title: "Matrimonio",
		description:
			"Trámites para matrimonios celebrados en la Embajada o en un Registro Civil español.",
	},
	"celebration-mariage": {
		title: "Celebración de Matrimonio en la Embajada",
		description:
			"La Embajada puede celebrar matrimonios entre dos nacionales gaboneses conforme a la legislación gabonesa.",
		requirements: [
			"Actas de nacimiento de ambos cónyuges (menos de 6 meses)",
			"Copias de los pasaportes gaboneses de ambos cónyuges",
			"Copias de los permisos de residencia",
			"Certificado de soltería de cada cónyuge",
			"Certificado de costumbre",
			"Certificado médico prenupcial",
			"Justificantes de domicilio",
			"Lista de testigos (mínimo 2, máximo 4) con copias de sus documentos de identidad",
			"Publicación de edictos (al menos 10 días antes de la ceremonia)",
		],
	},
	"transcription-deces": {
		title: "Transcripción de Acta de Defunción",
		description:
			"Inscripción en los registros consulares de una defunción ocurrida en España. Permite el reconocimiento por las autoridades gabonesas y es necesaria para los trámites de herencia.",
		requirements: [
			"Copia íntegra del acta de defunción española",
			"Copia del acta de nacimiento del difunto",
			"Copia del pasaporte del difunto",
			"Copia de la tarjeta consular del difunto",
			"Copia del documento de identidad del declarante",
		],
	},
	"rapatriement-corps": {
		title: "Certificado de Repatriación de Restos Mortales",
		description:
			"Documento administrativo necesario para la repatriación de los restos de un nacional gabonés desde España a Gabón.",
		requirements: [
			"Copia del acta de defunción",
			"Copia del pasaporte del difunto",
			"Copia de la tarjeta consular del difunto",
			"Certificado médico de no contagio",
			"Certificado de cierre hermético del ataúd",
			"Autorización de transporte del cuerpo",
			"Copia del documento de identidad del encargado de los trámites",
		],
		notes:
			"Proceso complejo que implica varias administraciones españolas y gabonesas. La Embajada acompaña a las familias en todas las etapas.",
	},
	"attestation-concordance": {
		title: "Certificado de Concordancia de Identidad",
		description:
			"Certifica que una misma persona aparece con nombres o apellidos diferentes en distintos documentos.",
		requirements: [
			"Copias de los documentos que muestran las discrepancias",
			"Copia del acta de nacimiento",
			"Copia del pasaporte",
			"Cualquier documento que acredite que se trata de la misma persona",
		],
	},
	"fiche-familiale": {
		title: "Ficha de Estado Civil Familiar",
		description:
			"Documento que resume la composición familiar de un nacional gabonés (cónyuge, hijos). Utilizado para trámites administrativos, sociales y fiscales en España.",
		requirements: [
			"Copia del certificado de matrimonio",
			"Copias de las actas de nacimiento de todos los hijos",
			"Copia del pasaporte del solicitante",
			"Copia del permiso de residencia",
			"Copia del libro de familia",
		],
	},
	"certificat-nationalite": {
		title: "Certificado de Nacionalidad",
		description:
			"Documento oficial que acredita que su titular posee la nacionalidad gabonesa.",
		requirements: [
			"Copia del acta de nacimiento",
			"Copia del pasaporte gabonés",
			"Copias de las actas de nacimiento de los padres",
			"Copia del certificado de nacionalidad de los padres (si está disponible)",
			"2 fotos de identidad",
		],
	},
	"attestation-revenus": {
		title: "Certificado de Ingresos",
		description:
			"Certifica los ingresos percibidos por un nacional gabonés. Puede ser necesario para trámites en Gabón.",
		requirements: [
			"Copia del pasaporte",
			"Copia del permiso de residencia",
			"Justificantes de ingresos (nóminas, declaración de la renta, certificado del empleador)",
			"Justificante de domicilio",
		],
	},
	"attestation-permis": {
		title: "Certificado de Validez del Permiso de Conducir",
		description:
			"Certifica la validez del permiso de conducir gabonés para trámites de canje o procedimientos administrativos en España.",
		requirements: [
			"Copia del permiso de conducir gabonés",
			"Copia del pasaporte",
			"Copia del permiso de residencia",
			"Justificante de domicilio",
			"Traducción jurada del permiso de conducir (si se requiere)",
		],
	},
	"attestation-capacite-juridique": {
		title: "Certificado de Capacidad Jurídica",
		description:
			"Certifica que una persona tiene plena capacidad jurídica (no sujeta a tutela ni curatela).",
		requirements: [
			"Copia del acta de nacimiento",
			"Copia del pasaporte",
			"Copia del permiso de residencia",
			"Declaración jurada de capacidad jurídica",
			"Justificante de domicilio",
		],
	},
	"certificat-vie-entretien": {
		title: "Certificado de Vida y Manutención",
		description:
			"Certifica que una persona está viva y, en su caso, a cargo de un tercero.",
		requirements: [
			"Copia del pasaporte",
			"Copia del permiso de residencia",
			"Justificante de domicilio",
			"Formulario del organismo solicitante (si procede)",
		],
		notes:
			"Generalmente se requiere la presencia física del solicitante en la Embajada.",
	},
	legalisation: {
		title: "Legalización de Documentos",
		description:
			"Autenticación de la firma puesta en un documento de origen gabonés para su reconocimiento en España, o viceversa.",
		requirements: [
			"Documento original a legalizar",
			"Copia del pasaporte del solicitante",
			"Copia del permiso de residencia",
		],
	},
	"demande-audience": {
		title: "Solicitud de Audiencia",
		description:
			"Solicitud de cita con el Embajador para cualquier asunto consular o administrativo.",
		requirements: [
			"Solicitud manuscrita o correo electrónico motivado",
			"Documento de identidad",
			"Motivo detallado de la solicitud",
		],
	},
	divorce: {
		title: "Divorcio",
		description: "Información sobre el procedimiento de divorcio.",
	},
	pacs: {
		title: "PACS (Pacto Civil de Solidaridad)",
		description:
			"Información sobre el Pacto Civil de Solidaridad para los gaboneses en España.",
	},
};

// ─── Localization Function ───────────────────────────────────────────────────

export function localizeServiceForLanguage<T extends ServiceLike>(
	service: T,
	lang: string,
): T {
	const normalizedLang = lang.toLowerCase().split("-")[0];

	if (normalizedLang === "fr") return service;

	if (normalizedLang === "es") {
		const copy = ES_SERVICE_COPY[service.slug];
		const localizedDelay = service.delay
			? ES_DELAY_MAP[service.delay] || service.delay
			: service.delay;
		const localizedValidity = service.validity
			? ES_VALIDITY_MAP[service.validity] || service.validity
			: service.validity;

		return {
			...service,
			title: service.titleEs || copy?.title || service.title,
			description:
				service.descriptionEs || copy?.description || service.description,
			requirements: copy?.requirements || service.requirements,
			notes: copy?.notes || service.notes,
			delay: localizedDelay,
			validity: localizedValidity,
		};
	}

	// English (default non-FR/ES)
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
