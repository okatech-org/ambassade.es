import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	CheckCircle,
	FileText,
	Handshake,
	ScrollText,
	Shield,
	TrendingUp,
	Zap,
} from "lucide-react";
import { EditableSection } from "@/components/inline-edit/EditableSection";
import { EditableText } from "@/components/inline-edit/EditableText";
import { SortableSectionList } from "@/components/inline-edit/SortableSectionList";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { CitizenCTA } from "@/components/home/CitizenCTA";

export const Route = createFileRoute("/cooperation_/traites-conventions")({
	component: TraitesConventionsPage,
	head: () => ({
		meta: [
			{
				title: "Traités, Conventions & Accords bilatéraux | Ambassade de la République Gabonaise",
			},
			{
				name: "description",
				content: "Le cadre juridique de la coopération entre le Gabon et l'Espagne : traités, conventions et accords bilatéraux depuis 1968.",
			},
		],
	}),
});

const PAGE_PATH = "/cooperation/traites-conventions";

const accords = [
	{
		year: "1968",
		icon: Handshake,
		title: "Établissement des relations diplomatiques",
		type: "Relations diplomatiques",
		status: "En vigueur",
		description: "Le Gabon et l'Espagne établissent officiellement leurs relations diplomatiques, marquant le début d'une coopération bilatérale entre les deux nations.",
		details: [
			"Échange d'ambassadeurs et ouverture des missions diplomatiques",
			"Reconnaissance mutuelle de la souveraineté et de l'intégrité territoriale",
			"Engagement en faveur de la coopération pacifique et du respect du droit international",
			"Base juridique pour tous les accords bilatéraux ultérieurs",
		],
		impact: "Cet acte fondateur a permis de poser les bases d'une relation bilatérale durable qui s'étend aujourd'hui sur plus de 56 ans.",
	},
	{
		year: "1977",
		icon: BookOpen,
		title: "Accord de coopération culturelle et technique",
		type: "Culture & Éducation",
		status: "En vigueur",
		description: "Accord-cadre de coopération culturelle, scientifique et technique entre la République Gabonaise et le Royaume d'Espagne.",
		details: [
			"Échanges éducatifs et programmes de bourses pour les étudiants gabonais",
			"Coopération scientifique et partage de connaissances techniques",
			"Promotion des échanges culturels et artistiques entre les deux pays",
			"Formation professionnelle et transfert de compétences",
		],
		impact: "Cet accord a ouvert la voie aux programmes de bourses AECID et aux partenariats universitaires qui bénéficient à des centaines de Gabonais chaque année.",
	},
	{
		year: "2006",
		icon: TrendingUp,
		title: "Accord de promotion et protection réciproque des investissements",
		type: "Économie",
		status: "En vigueur",
		description: "Accord bilatéral visant à encourager et protéger les investissements mutuels entre le Gabon et l'Espagne.",
		details: [
			"Garantie contre les expropriations et les nationalisations arbitraires",
			"Liberté de transfert des capitaux et des bénéfices",
			"Traitement national et clause de la nation la plus favorisée pour les investisseurs",
			"Mécanismes de règlement des différends entre investisseurs et États",
		],
		impact: "Cet accord a sécurisé le cadre juridique pour les investissements espagnols au Gabon, facilitant l'implantation de plus de 30 entreprises espagnoles.",
	},
	{
		year: "2008",
		icon: Zap,
		title: "Mémorandum d'entente sur la coopération énergétique",
		type: "Énergie",
		status: "En vigueur",
		description: "Mémorandum d'entente pour la coopération dans les domaines de l'énergie, des hydrocarbures et des énergies renouvelables.",
		details: [
			"Coopération dans l'exploration et l'exploitation des hydrocarbures",
			"Développement conjoint de projets d'énergies renouvelables",
			"Transfert de technologies et expertise technique espagnole",
			"Formation de cadres gabonais dans le secteur énergétique",
		],
		impact: "Ce mémorandum a renforcé la coopération dans le secteur stratégique de l'énergie, ouvrant la voie à des partenariats dans les énergies renouvelables.",
	},
	{
		year: "2014",
		icon: Shield,
		title: "Accord de coopération en matière de sécurité et de défense",
		type: "Défense & Sécurité",
		status: "En vigueur",
		description: "Accord-cadre de coopération en matière de défense et de sécurité entre la République Gabonaise et le Royaume d'Espagne.",
		details: [
			"Formation militaire des officiers gabonais dans les académies espagnoles",
			"Échange de renseignements et coopération en matière de sécurité maritime",
			"Sécurité maritime dans le Golfe de Guinée et lutte contre la piraterie",
			"Coopération dans la lutte contre le terrorisme et la criminalité transfrontalière",
		],
		impact: "Cet accord a permis la formation de plus de 100 officiers gabonais et le renforcement de la sécurité maritime dans le Golfe de Guinée.",
	},
	{
		year: "2024",
		icon: FileText,
		title: "Nouvelle ère de coopération — 5e République du Gabon",
		type: "Transition & Renouveau",
		status: "En cours",
		description: "Sous l'impulsion du Président de la Transition, le Gabon et l'Espagne ouvrent un nouveau chapitre de leur coopération bilatérale.",
		details: [
			"Réaffirmation de l'engagement mutuel en faveur de la coopération bilatérale",
			"Nouveaux accords dans les domaines du développement durable et de l'économie verte",
			"Renforcement de la coopération en matière d'État de droit et de gouvernance",
			"Diversification économique et partenariats dans les secteurs innovants",
		],
		impact: "La 5e République marque un tournant historique avec une vision renouvelée de la coopération, axée sur la souveraineté et le développement durable.",
	},
];

function TraitesConventionsPage() {
	const DEFAULT_SECTION_ORDER = ["hero", "timeline", "cadre", "cta"];

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				<SortableSectionList pagePath={PAGE_PATH} defaultOrder={DEFAULT_SECTION_ORDER}>
					{/* Breadcrumb + Hero */}
					<EditableSection sectionId="hero" label="Section Hero">
						<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
							<Link to="/cooperation" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2">
								<ArrowLeft className="w-4 h-4" />
								Retour à la coopération
							</Link>
						</div>
						<PageHero image="/images/ambassade_espagne.png" contentKey="cooperation.traites.hero" pagePath={PAGE_PATH}>
							<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
								<ScrollText className="w-3.5 h-3.5 mr-1.5" />
								<EditableText contentKey="cooperation.traites.hero.badge" defaultValue="Cadre juridique" pagePath={PAGE_PATH} sectionId="hero" as="span" />
							</Badge>
							<EditableText contentKey="cooperation.traites.hero.title" defaultValue="Traités, Conventions & Accords bilatéraux" pagePath={PAGE_PATH} sectionId="hero" as="h1" className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4" />
							<EditableText contentKey="cooperation.traites.hero.description" defaultValue="Le cadre juridique qui régit la coopération entre la République Gabonaise et le Royaume d'Espagne depuis 1968. Découvrez l'ensemble des traités, conventions et accords qui structurent cette relation bilatérale." pagePath={PAGE_PATH} sectionId="hero" as="p" className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed" />
						</PageHero>
					</EditableSection>

					{/* Timeline détaillée */}
					<EditableSection sectionId="timeline" label="Chronologie des accords">
						<section className="py-12 md:py-24 px-4 md:px-6">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
										<EditableText contentKey="cooperation.traites.timeline.badge" defaultValue="Chronologie" pagePath={PAGE_PATH} sectionId="timeline" as="span" />
									</Badge>
									<EditableText contentKey="cooperation.traites.timeline.title" defaultValue="L'histoire des accords bilatéraux" pagePath={PAGE_PATH} sectionId="timeline" as="h2" className="text-3xl md:text-4xl font-bold text-foreground mb-4" />
									<EditableText contentKey="cooperation.traites.timeline.subtitle" defaultValue="De 1968 à aujourd'hui, les textes fondateurs de la coopération Gabon-Espagne" pagePath={PAGE_PATH} sectionId="timeline" as="p" className="text-muted-foreground max-w-2xl mx-auto" />
								</div>

								{/* Detailed Accords */}
								<div className="space-y-8">
									{accords.map((accord) => {
										const Icon = accord.icon
										return (
											<div key={accord.year} className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
												<div className="h-1 bg-gradient-to-r from-primary to-primary/30" />
												<div className="p-8 md:p-10">
													<div className="flex flex-col md:flex-row gap-6">
														{/* Year + Icon */}
														<div className="flex-shrink-0 flex flex-row md:flex-col items-center gap-4">
															<div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
																<Icon className="w-8 h-8 text-primary" />
															</div>
															<div className="text-center">
																<div className="text-3xl font-bold text-primary">{accord.year}</div>
																<Badge variant="outline" className="mt-1 text-xs">{accord.type}</Badge>
															</div>
														</div>

														{/* Content */}
														<div className="flex-1">
															<div className="flex items-center gap-3 mb-3">
																<h3 className="text-2xl font-bold text-foreground">{accord.title}</h3>
																<Badge className={`text-xs ${accord.status === "En vigueur" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`}>
																	<CheckCircle className="w-3 h-3 mr-1" />
																	{accord.status}
																</Badge>
															</div>
															<p className="text-muted-foreground leading-relaxed mb-6">{accord.description}</p>

															{/* Dispositions clés */}
															<div className="mb-6">
																<h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Dispositions clés</h4>
																<div className="grid sm:grid-cols-2 gap-2">
																	{accord.details.map((detail) => (
																		<div key={detail} className="flex items-start gap-2 text-sm">
																			<div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
																			<span className="text-muted-foreground">{detail}</span>
																		</div>
																	))}
																</div>
															</div>

															{/* Impact */}
															<div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
																<p className="text-sm text-primary font-medium">📌 {accord.impact}</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						</section>
					</EditableSection>

					{/* Cadre juridique overview */}
					<EditableSection sectionId="cadre" label="Vue d'ensemble juridique">
						<section className="py-12 md:py-24 px-4 md:px-6 bg-muted/20">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
										<EditableText contentKey="cooperation.traites.cadre.badge" defaultValue="Vue d'ensemble" pagePath={PAGE_PATH} sectionId="cadre" as="span" />
									</Badge>
									<EditableText contentKey="cooperation.traites.cadre.title" defaultValue="Le cadre juridique bilatéral" pagePath={PAGE_PATH} sectionId="cadre" as="h2" className="text-3xl md:text-4xl font-bold text-foreground mb-4" />
								</div>

								<div className="grid md:grid-cols-2 gap-8">
									<div className="glass-card rounded-2xl p-8 relative overflow-hidden">
										<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
										<h3 className="text-xl font-bold text-foreground mb-4">Principes directeurs</h3>
										<div className="space-y-3">
											{[
												"Respect mutuel de la souveraineté et de l'intégrité territoriale",
												"Non-ingérence dans les affaires intérieures",
												"Égalité et bénéfice mutuel dans les relations bilatérales",
												"Règlement pacifique des différends",
												"Respect du droit international et de la Charte des Nations Unies",
											].map((p) => (
												<div key={p} className="flex items-start gap-2 text-sm">
													<CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
													<span className="text-muted-foreground">{p}</span>
												</div>
											))}
										</div>
									</div>

									<div className="glass-card rounded-2xl p-8 relative overflow-hidden">
										<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />
										<h3 className="text-xl font-bold text-foreground mb-4">Perspectives sous la 5e République</h3>
										<EditableText
											contentKey="cooperation.traites.cadre.perspectives"
											defaultValue="La 5e République du Gabon, sous la direction du Général Brice Clotaire Oligui Nguema, entend renforcer et moderniser le cadre juridique bilatéral avec l'Espagne. De nouveaux accords sont en préparation dans les domaines du développement durable, de l'économie numérique, de la formation professionnelle et de la coopération judiciaire, reflétant les priorités du Plan National de Développement de la Transition (PNDT)."
											pagePath={PAGE_PATH} sectionId="cadre" as="p"
											className="text-muted-foreground leading-relaxed"
										/>
									</div>
								</div>

								{/* Stats */}
								<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
									{[
										{ value: "56+", label: "Années de relations", icon: Calendar },
										{ value: "6", label: "Accords majeurs", icon: FileText },
										{ value: "5", label: "Domaines couverts", icon: ScrollText },
										{ value: "100%", label: "Accords en vigueur", icon: CheckCircle },
									].map((stat) => {
										const StatIcon = stat.icon
										return (
											<div key={stat.label} className="group glass-card rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300">
												<div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center mb-4">
													<StatIcon className="w-6 h-6 text-primary" />
												</div>
												<div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
												<p className="text-sm text-muted-foreground">{stat.label}</p>
											</div>
										)
									})}
								</div>
							</div>
						</section>
					</EditableSection>

					{/* CTA */}
					<EditableSection sectionId="cta" label="Appel à l'action">
						<CitizenCTA pagePath={PAGE_PATH} sectionId="cta" contentKeyPrefix="cooperation.traites.cta" />
					</EditableSection>
				</SortableSectionList>
			</div>
		</div>
	)
}
