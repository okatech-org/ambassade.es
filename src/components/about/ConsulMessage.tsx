import { CalendarCheck, Linkedin, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface ConsulMessageProps {
	firstName: string;
	lastName: string;
	role: string;
	description?: string | null;
	photoUrl?: string | null;
	email?: string | null;
	linkedIn?: string | null;
	message?: string;
}

export function ConsulMessage({
	firstName,
	lastName,
	role,
	description,
	photoUrl,
	email,
	linkedIn,
	message,
}: ConsulMessageProps) {
	const { t } = useTranslation();
	const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
	const fullName = `${firstName} ${lastName}`;

	const defaultMessage = t(
		"leConsulat.consulMessage",
		"Au nom de l'ensemble de l'équipe consulaire, je vous souhaite la bienvenue sur le site officiel du Consulat Général du Gabon en France. Notre mission est de vous accompagner dans toutes vos démarches administratives et de renforcer les liens entre notre communauté et notre pays. Nous sommes à votre écoute et à votre service.",
	);

	return (
		<section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 via-background to-accent/5 blur-3xl -z-20" />

			<div className="max-w-6xl mx-auto">
				<div className="glass-panel p-6 md:p-8 lg:p-12 rounded-3xl border-primary/10 shadow-xl relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

					<div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
						{/* Image side (left) */}
						<div className="relative group order-1">
							<div className="relative h-full min-h-[320px] md:min-h-[420px] rounded-2xl overflow-hidden shadow-2xl">
								{photoUrl ? (
									<img
										src={photoUrl}
										alt={fullName}
										className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
										<span className="text-7xl font-bold text-primary/40">
											{initials}
										</span>
									</div>
								)}
								{/* Gradient overlay at bottom for name */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
									<h3 className="text-2xl font-bold text-white mb-1">
										{fullName}
									</h3>
									<p className="text-white/80 font-medium uppercase tracking-wider text-sm">
										{role}
									</p>
								</div>
							</div>
							{/* Decorative accents */}
							<div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full -z-10 blur-xl group-hover:bg-accent/30 transition-colors" />
							<div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/20 rounded-full -z-10 blur-xl group-hover:bg-primary/30 transition-colors" />
						</div>

						{/* Message side (right) */}
						<div className="relative order-2 flex flex-col justify-center">
							{/* Quote icon */}
							<Quote className="absolute -top-6 -left-2 w-14 h-14 text-primary/10 rotate-180" />

							<div className="relative z-10 space-y-6">
								<h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
									{t("leConsulat.consulMessageTitle", "Mot du Consul Général")}
								</h2>

								<blockquote className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed italic font-light">
									"{message || defaultMessage}"
									<footer className="mt-4 not-italic text-sm md:text-base font-semibold text-foreground">
										— {t("leConsulat.honorific", "S.E. Monsieur")} {fullName}
										<br />
										{role}
									</footer>
								</blockquote>

								{description && (
									<p className="text-sm text-muted-foreground/80 pt-6 border-t border-border/40 leading-relaxed">
										{description}
									</p>
								)}

								{/* Social links */}
								<div className="flex gap-3 pt-4">
									{email && (
										<Button
											size="sm"
											variant="outline"
											className="gap-2 rounded-full border-primary/20 hover:bg-primary hover:text-white transition-all hover:border-primary"
											asChild
										>
											<a
												href={`mailto:${email}?subject=${t("leConsulat.audienceSubject", "Demande d'audience auprès de S.E. Monsieur")} ${encodeURIComponent(fullName)}`}
											>
												<CalendarCheck className="h-3.5 w-3.5" />
												{t("leConsulat.audienceRequest", "Demande d'audience")}
											</a>
										</Button>
									)}
									{linkedIn && (
										<Button
											size="sm"
											variant="outline"
											className="gap-2 rounded-full border-primary/20 hover:bg-[#0077B5] hover:text-white transition-all hover:border-[#0077B5]"
											asChild
										>
											<a
												href={linkedIn}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Linkedin className="h-3.5 w-3.5" />
												LinkedIn
											</a>
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
