import { ChevronDown, ExternalLink, Globe, Info, Monitor } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

/**
 * Compact sidebar version of the DGDI Passeports & Visas info panel.
 * Adapted for Spain: services are handled online via the DGDI platform.
 * Collapses on mobile to show only titles + CTA.
 */
export function DGDIServiceBanner() {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			className="dgdi-banner rounded-2xl border border-amber-400/30 overflow-hidden"
			id="dgdi-service-banner"
		>
			<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-amber-200/20 pointer-events-none" />

				<div className="relative z-10 p-5">
					{/* Header — always visible */}
					<div className="flex items-start gap-2.5 mb-4">
						<div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/15 border border-amber-600/30 shrink-0 mt-1">
							<Info className="w-4 h-4 text-amber-800" />
						</div>
						<div>
							<h3 className="text-sm font-bold text-amber-950 leading-tight">
								{t("dgdi.passportService", "Service Passeport")}{" "}
								<span className="text-amber-700">(DGDI)</span>
							</h3>
							<h3 className="text-sm font-bold text-amber-950 leading-tight mt-0.5">
								{t("dgdi.visaService", "Service Visa")}{" "}
								<span className="text-amber-700">(DGDI)</span>
							</h3>
							<p className="text-xs text-amber-950 font-medium mt-1.5 leading-snug">
								{t(
									"dgdi.subtitle",
									"Service en ligne sous l'autorité de la DGDI",
								)}
							</p>
						</div>
					</div>

					{/* Mobile expand toggle */}
					<button
						onClick={() => setExpanded(!expanded)}
						className="lg:hidden w-full flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 py-1.5 mb-3 rounded-lg hover:bg-amber-100/50 transition-colors"
					>
						{expanded
							? t("dgdi.hideDetails", "Masquer les détails")
							: t("dgdi.showDetails", "Voir les détails")}
						<ChevronDown
							className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
						/>
					</button>

					{/* Collapsible details — hidden on mobile by default, always visible on desktop */}
					<div className={`${expanded ? "block" : "hidden"} lg:block`}>
						{/* Démarches en ligne */}
						<div className="mb-5">
							<h4 className="text-[10px] font-semibold uppercase tracking-wider text-amber-800/70 mb-3 flex items-center gap-1.5">
								<span className="w-0.5 h-3.5 rounded-full inline-block bg-amber-700" />
								{t("dgdi.onlineServices", "Démarches en ligne")}
							</h4>

							<div className="space-y-2.5">
								{/* Online platform */}
								<div className="flex items-start gap-2.5">
									<div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-700/10 border border-amber-600/15 shrink-0">
										<Monitor className="w-3 h-3 text-amber-800" />
									</div>
									<div>
										<p className="text-amber-950 text-xs font-medium leading-relaxed">
											{t(
												"dgdi.onlinePlatformDesc",
												"Toutes les démarches de passeport et visa se font en ligne sur la plateforme DGDI.",
											)}
										</p>
									</div>
								</div>

								{/* Website */}
								<div className="flex items-center gap-2.5">
									<div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-700/10 border border-amber-600/15 shrink-0">
										<Globe className="w-3 h-3 text-amber-800" />
									</div>
									<a
										href="https://www.dgdi.ga/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-amber-800 text-xs font-medium underline underline-offset-2 decoration-amber-600/30 hover:decoration-amber-700/80 transition-all truncate"
									>
										www.dgdi.ga
									</a>
								</div>
							</div>
						</div>

						{/* Separator */}
						<div className="border-t border-amber-600/20 mb-5" />

						{/* Informations */}
						<div className="mb-5">
							<h4 className="text-[10px] font-semibold uppercase tracking-wider text-amber-800/70 mb-3 flex items-center gap-1.5">
								<span className="w-0.5 h-3.5 rounded-full inline-block bg-amber-700" />
								{t("dgdi.importantInfo", "Informations importantes")}
							</h4>

							<div className="space-y-2.5">
								<div className="dgdi-schedule-card flex items-center gap-3 rounded-xl border border-amber-600/20 bg-amber-100/40 px-3 py-2.5">
									<div className="text-sm">💻</div>
									<p className="text-amber-950 text-xs font-medium leading-relaxed">
										{t(
											"dgdi.noPhysicalOffice",
											"Pas de guichet physique en Espagne — démarches 100% en ligne",
										)}
									</p>
								</div>

								<div className="dgdi-schedule-card flex items-center gap-3 rounded-xl border border-amber-600/20 bg-amber-100/40 px-3 py-2.5">
									<div className="text-sm">📄</div>
									<p className="text-amber-950 text-xs font-medium leading-relaxed">
										{t(
											"dgdi.docsRequired",
											"Documents requis : passeport actuel, acte de naissance, photos d'identité",
										)}
									</p>
								</div>

								<div className="dgdi-schedule-card flex items-center gap-3 rounded-xl border border-amber-600/20 bg-amber-100/40 px-3 py-2.5">
									<div className="text-sm">⏱️</div>
									<p className="text-amber-950 text-xs font-medium leading-relaxed">
										{t(
											"dgdi.processingTime",
											"Délai de traitement variable selon le type de demande",
										)}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* CTA Button — always visible */}
					<Button
						size="sm"
						className="w-full h-10 rounded-xl text-xs font-bold gap-1.5 bg-amber-800 hover:bg-amber-900 text-white shadow-md shadow-amber-800/15 hover:shadow-amber-800/25 transition-all duration-300"
						asChild
					>
						<a
							href="https://www.dgdi.ga/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("dgdi.bookAppointment", "Accéder à la plateforme DGDI")}
							<ExternalLink className="w-3.5 h-3.5" />
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
