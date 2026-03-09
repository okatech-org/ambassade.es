import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BookOpen,
	Building2,
	FileText,
	Globe,
	GraduationCap,
	Handshake,
	Landmark,
	Scale,
	ScrollText,
	Shield,
	TrendingUp,
	Users,
} from "lucide-react";
import { EditableSection } from "@/components/inline-edit/EditableSection";
import { EditableText } from "@/components/inline-edit/EditableText";
import { SortableSectionList } from "@/components/inline-edit/SortableSectionList";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CitizenCTA } from "../components/home/CitizenCTA";

export const Route = createFileRoute("/cooperation")({
	component: CooperationPage,
	head: () => ({
		meta: [
			{
				title:
					"Coopération Gabon-Espagne | Ambassade de la République Gabonaise",
			},
			{
				name: "description",
				content:
					"Coopération bilatérale entre le Gabon et l'Espagne : cadre juridique, traités, conventions, vision de la 5e République, échanges économiques, culturels et éducatifs.",
			},
		],
	}),
});

function CooperationPage() {
	const accords = [
		{
			year: "1968",
			title: "Établissement des relations diplomatiques",
			description:
				"Le Gabon et l'Espagne établissent officiellement leurs relations diplomatiques, marquant le début d'une coopération bilatérale entre les deux nations.",
			type: "Relations diplomatiques",
		},
		{
			year: "1977",
			title: "Accord de coopération culturelle et technique",
			description:
				"Accord-cadre de coopération culturelle, scientifique et technique entre la République Gabonaise et le Royaume d'Espagne, couvrant les échanges éducatifs et la formation professionnelle.",
			type: "Culture & Éducation",
		},
		{
			year: "2006",
			title: "Accord de promotion et protection réciproque des investissements",
			description:
				"Accord bilatéral visant à encourager et protéger les investissements mutuels entre le Gabon et l'Espagne, avec garantie contre les expropriations et liberté de transfert des capitaux.",
			type: "Économie",
		},
		{
			year: "2008",
			title: "Mémorandum d'entente sur la coopération énergétique",
			description:
				"Mémorandum d'entente pour la coopération dans les domaines de l'énergie, des hydrocarbures et des énergies renouvelables.",
			type: "Énergie",
		},
		{
			year: "2014",
			title: "Accord de coopération en matière de sécurité et de défense",
			description:
				"Accord-cadre de coopération en matière de défense et de sécurité, incluant la formation militaire, l'échange de renseignements et la sécurité maritime dans le Golfe de Guinée.",
			type: "Défense & Sécurité",
		},
		{
			year: "2024",
			title: "Nouvelle ère de coopération — 5e République du Gabon",
			description:
				"Sous l'impulsion du Président de la Transition, le Général Brice Clotaire Oligui Nguema, le Gabon et l'Espagne ouvrent un nouveau chapitre de leur coopération bilatérale, axé sur le développement durable, la diversification économique et le renforcement de l'État de droit.",
			type: "Transition & Renouveau",
		},
	]

	const axesCooperation = [
		{
			icon: TrendingUp,
			title: "Coopération économique & commerciale",
			description:
				"Promotion des échanges commerciaux, soutien aux investissements espagnols au Gabon (hydrocarbures, mines, infrastructures) et gabonais en Espagne. Diversification de l'économie gabonaise à travers des partenariats stratégiques avec des entreprises espagnoles.",
			highlights: [
				"Échanges commerciaux bilatéraux",
				"Investissements directs étrangers",
				"Partenariats public-privé",
				"Secteurs : pétrole, bois, mines, tourisme",
			],
		},
		{
			icon: GraduationCap,
			title: "Coopération éducative & scientifique",
			description:
				"Programmes de bourses d'études pour les étudiants gabonais en Espagne, partenariats entre universités gabonaises et espagnoles, coopération en recherche scientifique et technologique.",
			highlights: [
				"Bourses d'études AECID",
				"Partenariats universitaires",
				"Recherche scientifique conjointe",
				"Formation professionnelle",
			],
		},
		{
			icon: BookOpen,
			title: "Coopération culturelle & sportive",
			description:
				"Promotion de la culture gabonaise en Espagne et de la culture espagnole au Gabon. Échanges artistiques, programmes de résidences d'artistes, coopération sportive et événements culturels conjoints.",
			highlights: [
				"Échanges artistiques et culturels",
				"Enseignement de l'espagnol au Gabon",
				"Coopération sportive",
				"Promotion touristique mutuelle",
			],
		},
		{
			icon: Shield,
			title: "Coopération sécuritaire & défense",
			description:
				"Coopération en matière de sécurité maritime dans le Golfe de Guinée, lutte contre la piraterie, formation des forces de sécurité gabonaises, échange de renseignements et coopération judiciaire.",
			highlights: [
				"Sécurité maritime — Golfe de Guinée",
				"Formation militaire et policière",
				"Lutte contre la criminalité transfrontalière",
				"Coopération judiciaire",
			],
		},
		{
			icon: Globe,
			title: "Coopération multilatérale",
			description:
				"Coordination des positions diplomatiques au sein des organisations internationales : Nations Unies, Union Européenne-Union Africaine, Organisation Mondiale du Tourisme (OMT, dont le siège est à Madrid), et autres forums internationaux.",
			highlights: [
				"Nations Unies",
				"UE-UA : partenariat stratégique",
				"OMT — Organisation Mondiale du Tourisme",
				"Objectifs de Développement Durable",
			],
		},
		{
			icon: Landmark,
			title: "Coopération au développement & environnement",
			description:
				"Projets de développement durable, protection des forêts tropicales gabonaises, biodiversité, économie bleue et lutte contre le changement climatique. L'Espagne, à travers l'AECID, soutient des projets de développement au Gabon.",
			highlights: [
				"Protection des forêts tropicales",
				"Économie bleue",
				"Énergies renouvelables",
				"AECID — Agence Espagnole de Coopération",
			],
		},
	]

	const DEFAULT_SECTION_ORDER = [
		"hero",
		"vision",
		"cadre-juridique",
		"axes",
		"chiffres",
		"multilateral",
		"cta",
	]

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				<SortableSectionList
					pagePath="/cooperation"
					defaultOrder={DEFAULT_SECTION_ORDER}
				>
					{/* Hero Section */}
					<EditableSection sectionId="hero" label="Section Hero">
						<PageHero
							image="/images/ambassade_espagne.png"
							contentKey="cooperation.hero"
							pagePath="/cooperation"
						>
							<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
								<Handshake className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="cooperation.hero.badge"
									defaultValue="Coopération bilatérale"
									pagePath="/cooperation"
									sectionId="hero"
									as="span"
								/>
							</Badge>

							<EditableText
								contentKey="cooperation.hero.title"
								defaultValue="Coopération entre la République Gabonaise et le Royaume d'Espagne"
								pagePath="/cooperation"
								sectionId="hero"
								as="h1"
								className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
							/>

							<EditableText
								contentKey="cooperation.hero.description"
								defaultValue="Le Gabon et l'Espagne entretiennent des relations diplomatiques depuis 1968. Cette coopération bilatérale, renforcée sous la 5e République, s'étend aux domaines économique, culturel, éducatif, sécuritaire et environnemental, dans le respect mutuel et la poursuite d'intérêts communs."
								pagePath="/cooperation"
								sectionId="hero"
								as="p"
								className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed"
							/>

							<div className="flex flex-wrap gap-3">
								<Button
									asChild
									size="lg"
									className="rounded-xl h-12 px-8 shadow-lg shadow-primary/20"
								>
									<a href="#cadre-juridique">
										<ScrollText className="w-4 h-4 mr-2" />
										<EditableText
											contentKey="cooperation.hero.cta1"
											defaultValue="Cadre juridique"
											pagePath="/cooperation"
											sectionId="hero"
											as="span"
										/>
									</a>
								</Button>
								<Button
									asChild
									size="lg"
									variant="outline"
									className="rounded-xl h-12 px-8 bg-background/50 hover:bg-accent/10"
								>
									<a href="#axes">
										<Globe className="w-4 h-4 mr-2" />
										<EditableText
											contentKey="cooperation.hero.cta2"
											defaultValue="Axes de coopération"
											pagePath="/cooperation"
											sectionId="hero"
											as="span"
										/>
									</a>
								</Button>
							</div>
						</PageHero>
					</EditableSection>

					{/* Vision 5e République Section */}
					<EditableSection
						sectionId="vision"
						label="Vision de la 5e République"
					>
						<section className="py-12 md:py-24 px-4 md:px-6">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="cooperation.vision.badge"
											defaultValue="La 5e République du Gabon"
											pagePath="/cooperation"
											sectionId="vision"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="cooperation.vision.title"
										defaultValue="Vision diplomatique de la 5e République"
										pagePath="/cooperation"
										sectionId="vision"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="cooperation.vision.subtitle"
										defaultValue="Les orientations de la politique extérieure gabonaise selon les directives du Comité pour la Transition et la Restauration des Institutions (CTRI)"
										pagePath="/cooperation"
										sectionId="vision"
										as="p"
										className="text-muted-foreground max-w-3xl mx-auto"
									/>
								</div>

								<div className="grid md:grid-cols-2 gap-8 mb-12">
									{/* Message de l'Ambassadeur */}
									<div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
										<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
										<div className="flex items-center gap-4 mb-6">
											<div className="p-3.5 rounded-xl bg-primary/10">
												<Building2 className="w-6 h-6 text-primary" />
											</div>
											<EditableText
												contentKey="cooperation.vision.ambassadeur.title"
												defaultValue="Mot de l'Ambassadeur"
												pagePath="/cooperation"
												sectionId="vision"
												as="h3"
												className="text-xl font-bold text-foreground"
											/>
										</div>
										<EditableText
											contentKey="cooperation.vision.ambassadeur.message"
											defaultValue="La 5e République du Gabon marque un tournant historique dans la politique extérieure de notre pays. Sous l'impulsion du Président de la Transition, le Général Brice Clotaire Oligui Nguema, notre diplomatie s'inscrit désormais dans une orientation résolument tournée vers la souveraineté nationale, la diversification économique et le renforcement des partenariats stratégiques. L'Espagne est un partenaire précieux avec lequel nous entendons approfondir notre coopération dans tous les domaines d'intérêt commun."
											pagePath="/cooperation"
											sectionId="vision"
											as="p"
											className="text-muted-foreground leading-relaxed"
										/>
										<div className="mt-6 pt-6 border-t border-border/50">
											<EditableText
												contentKey="cooperation.vision.ambassadeur.signature"
												defaultValue="S.E. Madame Allegra Pamela Bongo — Ambassadeur de la République Gabonaise près le Royaume d'Espagne"
												pagePath="/cooperation"
												sectionId="vision"
												as="p"
												className="text-sm text-primary font-semibold italic"
											/>
										</div>
									</div>

									{/* Piliers de la 5e République */}
									<div className="space-y-6">
										{[
											{
												icon: Scale,
												title: "Restauration de l'État de droit",
												description:
													"Le CTRI s'est engagé à restaurer les institutions républicaines, garantir l'indépendance de la justice et lutter contre la corruption. Ces réformes renforcent la crédibilité internationale du Gabon.",
											},
											{
												icon: TrendingUp,
												title: "Diversification économique",
												description:
													"La 5e République promeut la transformation locale des matières premières, le développement du tourisme, de l'agriculture et de l'économie numérique, ouvrant de nouvelles perspectives de coopération avec l'Espagne.",
											},
											{
												icon: Users,
												title: "Diplomatie au service du citoyen",
												description:
													"Le Gabon place ses citoyens au cœur de l'action diplomatique : protection des Gabonais à l'étranger, facilitation des démarches consulaires et promotion de la diaspora comme acteur du développement national.",
											},
										].map((pilier) => {
											const Icon = pilier.icon
											return (
												<div
													key={pilier.title}
													className="group glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
												>
													<div className="flex items-center gap-4 mb-3">
														<div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
															<Icon className="w-5 h-5 text-primary" />
														</div>
														<h4 className="text-lg font-bold text-foreground">
															{pilier.title}
														</h4>
													</div>
													<p className="text-muted-foreground leading-relaxed pl-[3.75rem]">
														{pilier.description}
													</p>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</section>
					</EditableSection>

					{/* Cadre juridique — Timeline */}
					<EditableSection
						sectionId="cadre-juridique"
						label="Cadre juridique et accords"
					>
						<section
							id="cadre-juridique"
							className="py-12 md:py-24 px-4 md:px-6 bg-muted/20"
						>
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="cooperation.cadre.badge"
											defaultValue="Cadre juridique"
											pagePath="/cooperation"
											sectionId="cadre-juridique"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="cooperation.cadre.title"
										defaultValue="Traités, Conventions & Accords bilatéraux"
										pagePath="/cooperation"
										sectionId="cadre-juridique"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="cooperation.cadre.subtitle"
										defaultValue="Le cadre juridique qui régit la coopération entre la République Gabonaise et le Royaume d'Espagne"
										pagePath="/cooperation"
										sectionId="cadre-juridique"
										as="p"
										className="text-muted-foreground max-w-2xl mx-auto"
									/>
								</div>

								{/* Timeline */}
								<div className="relative">
									{/* Vertical line */}
									<div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

									<div className="space-y-8 md:space-y-12">
										{accords.map((accord, index) => (
											<div
												key={accord.year}
												className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
													index % 2 === 0
														? "md:flex-row"
														: "md:flex-row-reverse"
												}`}
											>
												{/* Timeline dot */}
												<div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20 z-10" />

												{/* Content card */}
												<div
													className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
														index % 2 === 0 ? "md:pr-4" : "md:pl-4"
													}`}
												>
													<div className="group glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300">
														<div className="flex items-center gap-3 mb-3">
															<Badge className="bg-primary/10 text-primary border-primary/20 text-sm font-bold px-3 py-1">
																{accord.year}
															</Badge>
															<Badge variant="outline" className="text-xs">
																{accord.type}
															</Badge>
														</div>
														<h3 className="text-lg font-bold text-foreground mb-2">
															{accord.title}
														</h3>
														<p className="text-muted-foreground leading-relaxed text-sm">
															{accord.description}
														</p>
													</div>
												</div>

												{/* Spacer for the other side */}
												<div className="hidden md:block md:w-[calc(50%-2rem)]" />
											</div>
										))}
									</div>

									{/* En savoir plus button */}
									<div className="text-center mt-12">
										<Link to="/cooperation/traites-conventions">
											<Button
												size="lg"
												className="rounded-xl h-12 px-8 shadow-lg shadow-primary/20"
											>
												<ScrollText className="w-4 h-4 mr-2" />
												Voir tous les accords en détail
												<ArrowRight className="w-4 h-4 ml-2" />
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</section>
					</EditableSection>

					{/* Axes de coopération */}
					<EditableSection sectionId="axes" label="Axes de coopération">
						<section id="axes" className="py-12 md:py-24 px-4 md:px-6">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="cooperation.axes.badge"
											defaultValue="Domaines de coopération"
											pagePath="/cooperation"
											sectionId="axes"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="cooperation.axes.title"
										defaultValue="Axes stratégiques de la coopération bilatérale"
										pagePath="/cooperation"
										sectionId="axes"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="cooperation.axes.subtitle"
										defaultValue="Les domaines clés de la coopération entre le Gabon et l'Espagne, au service du développement mutuel"
										pagePath="/cooperation"
										sectionId="axes"
										as="p"
										className="text-muted-foreground max-w-2xl mx-auto"
									/>
								</div>

								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
									{axesCooperation.map((axe) => {
										const Icon = axe.icon
										return (
											<Link
												to="/cooperation/axes-strategiques"
												key={axe.title}
												className="group glass-card rounded-2xl p-6 md:p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer"
											>
												<div className="flex items-center gap-4 mb-4">
													<div className="p-3.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
														<Icon className="w-6 h-6 text-primary" />
													</div>
													<h3 className="text-xl font-bold text-foreground">
														{axe.title}
													</h3>
												</div>
												<p className="text-muted-foreground leading-relaxed mb-6 flex-1">
													{axe.description}
												</p>
												<div className="space-y-2 pt-4 border-t border-border/50">
													{axe.highlights.map((h) => (
														<div
															key={h}
															className="flex items-center gap-2 text-sm"
														>
															<div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
															<span className="text-muted-foreground">{h}</span>
														</div>
													))}
												</div>
												<div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-sm text-primary font-medium">
													En savoir plus
													<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
												</div>
											</Link>
										)
									})}
								</div>
							</div>
						</section>
					</EditableSection>

					{/* Chiffres clés */}
					<EditableSection sectionId="chiffres" label="Chiffres clés">
						<section className="py-12 md:py-24 px-4 md:px-6 bg-muted/20">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="cooperation.chiffres.badge"
											defaultValue="En chiffres"
											pagePath="/cooperation"
											sectionId="chiffres"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="cooperation.chiffres.title"
										defaultValue="La coopération en chiffres"
										pagePath="/cooperation"
										sectionId="chiffres"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
								</div>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
									{[
										{
											value: "56+",
											label: "Années de relations diplomatiques",
											icon: Handshake,
										},
										{
											value: "6",
											label: "Accords bilatéraux majeurs",
											icon: FileText,
										},
										{
											value: "500+",
											label: "Gabonais en Espagne",
											icon: Users,
										},
										{
											value: "30+",
											label: "Entreprises espagnoles au Gabon",
											icon: Building2,
										},
									].map((stat) => {
										const Icon = stat.icon
										return (
											<div
												key={stat.label}
												className="group glass-card rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300"
											>
												<div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center mb-4">
													<Icon className="w-6 h-6 text-primary" />
												</div>
												<div className="text-3xl md:text-4xl font-bold text-primary mb-2">
													{stat.value}
												</div>
												<p className="text-sm text-muted-foreground">
													{stat.label}
												</p>
											</div>
										)
									})}
								</div>
							</div>
						</section>
					</EditableSection>

					{/* Organisations internationales */}
					<EditableSection
						sectionId="multilateral"
						label="Coopération multilatérale"
					>
						<section className="py-12 md:py-24 px-4 md:px-6">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="cooperation.multilateral.badge"
											defaultValue="Sur la scène internationale"
											pagePath="/cooperation"
											sectionId="multilateral"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="cooperation.multilateral.title"
										defaultValue="Coopération au sein des organisations internationales"
										pagePath="/cooperation"
										sectionId="multilateral"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="cooperation.multilateral.subtitle"
										defaultValue="Le Gabon et l'Espagne collaborent activement au sein des grandes instances multilatérales"
										pagePath="/cooperation"
										sectionId="multilateral"
										as="p"
										className="text-muted-foreground max-w-2xl mx-auto"
									/>
								</div>

								<div className="grid md:grid-cols-3 gap-8">
									{[
										{
											icon: Globe,
											title: "Nations Unies",
											description:
												"Coordination des positions sur les questions de paix, de sécurité et de développement durable. Le Gabon a siégé au Conseil de Sécurité de l'ONU (2022-2023), renforçant sa visibilité diplomatique avec le soutien de partenaires comme l'Espagne.",
										},
										{
											icon: Handshake,
											title: "Partenariat UE-UA",
											description:
												"Dans le cadre du partenariat Union Européenne-Union Africaine, le Gabon et l'Espagne travaillent ensemble sur les enjeux de migration, de développement économique, de changement climatique et de sécurité.",
										},
										{
											icon: Landmark,
											title: "OMT — Madrid",
											description:
												"L'Organisation Mondiale du Tourisme (OMT), dont le siège est à Madrid, est un point focal de la coopération. Le Gabon y promeut son potentiel touristique exceptionnel (parcs nationaux, écotourisme) avec le soutien de l'Espagne.",
										},
									].map((org) => {
										const Icon = org.icon
										return (
											<Link
												to="/cooperation/organisations-internationales"
												key={org.title}
												className="group glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer"
											>
												<div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center mb-6">
													<Icon className="w-8 h-8 text-primary" />
												</div>
												<h3 className="text-xl font-bold text-foreground mb-4">
													{org.title}
												</h3>
												<p className="text-muted-foreground leading-relaxed mb-4">
													{org.description}
												</p>
												<div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
													En savoir plus
													<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
												</div>
											</Link>
										)
									})}
								</div>
							</div>
						</section>
					</EditableSection>

					{/* CTA */}
					<EditableSection sectionId="cta" label="Appel à l'action">
						<CitizenCTA
							pagePath="/cooperation"
							sectionId="cta"
							contentKeyPrefix="cooperation.cta"
						/>
					</EditableSection>
				</SortableSectionList>
			</div>
		</div>
	)
}
