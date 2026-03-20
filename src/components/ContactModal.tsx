import { Clock, Info, Mail, MapPin, Phone, Train } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

interface ContactModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3 text-xl">
						<span className="p-2 rounded-xl bg-primary/10">
							<Phone className="w-5 h-5 text-primary" />
						</span>
						{t("contactModal.title", "Contactez l'Ambassade")}
					</DialogTitle>
					<DialogDescription>
						{t(
							"contactModal.description",
							"Ambassade du Gabon près le Royaume d'Espagne — Toutes les coordonnées",
						)}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-5">
					{/* Address */}
					<div className="flex items-start gap-3 group">
						<div className="p-2 rounded-lg bg-muted/50 shrink-0">
							<MapPin className="w-4 h-4 text-primary" />
						</div>
						<div>
							<p className="font-medium text-foreground">
								Calle de Orense, Nº 68, 2º Dcha
							</p>
							<p className="text-sm text-muted-foreground">
								28020 Madrid, España
							</p>
						</div>
					</div>

					{/* Phone numbers */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 mb-2">
							<Phone className="w-4 h-4 text-primary" />
							<span className="text-sm font-semibold text-foreground">
								{t("contactModal.phones", "Téléphones")}
							</span>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							<div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
								<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-0.5">
									{t("contactModal.mainLine", "Ligne principale")}
								</span>
								<a
									href="tel:+34914238911"
									className="text-sm font-medium text-foreground hover:text-primary transition-colors block"
								>
									+34 914 238 911
								</a>
							</div>
							<div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
								<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-0.5">
									{t("contactModal.chancellery", "Chancellerie")}
								</span>
								<a
									href="tel:+34633293914"
									className="text-sm font-medium text-foreground hover:text-primary transition-colors block"
								>
									+34 633 293 914
								</a>
								<span className="text-[10px] text-muted-foreground">
									{t("contactModal.chancelleryContact", "Mme EKIBA")}
								</span>
							</div>
							<div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
								<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-0.5">
									{t("contactModal.firstCounselor", "Premier Conseiller")}
								</span>
								<a
									href="tel:+34614539402"
									className="text-sm font-medium text-foreground hover:text-primary transition-colors block"
								>
									+34 614 539 402
								</a>
								<span className="text-[10px] text-muted-foreground">
									{t("contactModal.firstCounselorContact", "M. OGNAGNA OCKOGHO")}
								</span>
							</div>
							<div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
								<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-0.5">
									{t("contactModal.economicAffairs", "Affaires Économiques")}
								</span>
								<a
									href="tel:+34602621384"
									className="text-sm font-medium text-foreground hover:text-primary transition-colors block"
								>
									+34 602 621 384
								</a>
								<span className="text-[10px] text-muted-foreground">
									{t("contactModal.economicAffairsContact", "Mme MOUYAPOU NGOUBOU")}
								</span>
							</div>
						</div>
						<div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
							<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-0.5">
								Fax
							</span>
							<span className="text-sm font-medium text-foreground block">
								+34 914 131 153
							</span>
						</div>
					</div>

					{/* Emails */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 mb-1">
							<Mail className="w-4 h-4 text-primary" />
							<span className="text-sm font-semibold text-foreground">
								{t("contactModal.emailLabel", "Email")}
							</span>
						</div>
						<div className="flex flex-col gap-1.5">
							<a
								href="mailto:ambassadegabon.madrid@gmail.com"
								className="text-sm font-medium text-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary underline-offset-4"
							>
								ambassadegabon.madrid@gmail.com
							</a>
							<a
								href="mailto:chancellerie.es@gmail.com"
								className="text-sm font-medium text-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary underline-offset-4"
							>
								chancellerie.es@gmail.com
							</a>
						</div>
					</div>

					{/* Hours */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 mb-1">
							<Clock className="w-4 h-4 text-primary" />
							<span className="text-sm font-semibold text-foreground">
								{t("contactModal.openingHours", "Horaires d'ouverture")}
							</span>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
								<div className="flex items-center justify-between mb-0.5">
									<span className="text-[10px] text-muted-foreground">
										{t("contactModal.monFri", "Lun - Ven")}
									</span>
									<Badge
										variant="outline"
										className="text-[9px] h-4 bg-primary/5 text-primary border-primary/20"
									>
										{t("contactModal.reception", "Accueil")}
									</Badge>
								</div>
								<p className="font-bold text-foreground">
									{t("contactModal.receptionHours", "9h00 - 16h00")}
								</p>
							</div>
							<div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
								<div className="flex items-center justify-between mb-0.5">
									<span className="text-[10px] text-muted-foreground">
										{t("contactModal.monFri", "Lun - Ven")}
									</span>
									<Badge
										variant="outline"
										className="text-[9px] h-4 bg-primary/5 text-primary border-primary/20"
									>
										{t("contactModal.consular", "Consulaire")}
									</Badge>
								</div>
								<p className="font-bold text-foreground">
									{t("contactModal.consularHours", "9h30 - 13h30")}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-accent/5 p-2 rounded-lg border border-accent/10">
							<Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
							<span>
								{t(
									"contactModal.closedHolidays",
									"Fermé les jours fériés chômés au Gabon et en Espagne. Cita previa recommandée.",
								)}
							</span>
						</div>
					</div>

					{/* Transport */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 mb-1">
							<Train className="w-4 h-4 text-primary" />
							<span className="text-sm font-semibold text-foreground">
								{t("contactModal.access", "Accès")}
							</span>
						</div>
						<div className="flex gap-2">
							<div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/40 flex-1">
								<div className="w-7 h-7 rounded-md bg-[#0078C1] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
									M
								</div>
								<div className="text-xs">
									<p className="font-medium text-foreground">
										Santiago Bernabéu
									</p>
									<p className="text-muted-foreground">
										{t("contactModal.metroLine", "Línea 10")}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/40 flex-1">
								<div className="w-7 h-7 rounded-md bg-[#0078C1] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
									M
								</div>
								<div className="text-xs">
									<p className="font-medium text-foreground">
										Nuevos Ministerios
									</p>
									<p className="text-muted-foreground">
										{t("contactModal.metroLines", "L6 / L8 / L10")}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Map */}
					<div className="rounded-xl overflow-hidden border border-border/40 aspect-video">
						<iframe
							title="Ambassade du Gabon — Calle de Orense 68, Madrid"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.!2d-3.6919!3d40.4528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle%20de%20Orense%2068%2C%2028020%20Madrid!5e0!3m2!1ses!2ses!4v1706100000000!5m2!1ses!2ses"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className="grayscale hover:grayscale-0 transition-all duration-700"
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
