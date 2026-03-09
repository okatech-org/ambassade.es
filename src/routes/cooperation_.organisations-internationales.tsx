import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Building2,
	Globe,
	Handshake,
	Landmark,
	Scale,
	Shield,
	Target,
	TreePalm,
	Users,
} from "lucide-react";
import { CitizenCTA } from "@/components/home/CitizenCTA";
import { EditableSection } from "@/components/inline-edit/EditableSection";
import { EditableText } from "@/components/inline-edit/EditableText";
import { SortableSectionList } from "@/components/inline-edit/SortableSectionList";
import { PageHero } from "@/components/PageHero";

import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute(
	"/cooperation_/organisations-internationales",
)({
	component: OrganisationsInternationalesPage,
	head: () => ({
		meta: [
			{
				title:
					"Coopération multilatérale | Ambassade de la République Gabonaise",
			},
			{
				name: "description",
				content:
					"Le Gabon et l'Espagne au sein des organisations internationales : Nations Unies, Union Européenne-Union Africaine, OMT, CEEAC et autres forums multilatéraux.",
			},
		],
	}),
});

const PAGE_PATH = "/cooperation/organisations-internationales";

const organisations = [
	{
		icon: Globe,
		title: "Nations Unies (ONU)",
		description:
			"Le Gabon et l'Espagne coordonnent leurs positions au sein du système des Nations Unies sur les questions de paix, de sécurité internationale et de développement durable. Le Gabon a siégé comme membre non permanent au Conseil de Sécurité de l'ONU (2022-2023), renforçant considérablement sa visibilité diplomatique et ses interactions avec l'Espagne.",
		objectifs: [
			"Maintien de la paix et la sécurité internationale",
			"Promotion des Objectifs de Développement Durable (ODD)",
			"Lutte contre le changement climatique (Accord de Paris)",
			"Protection des droits de l'Homme",
			"Réforme du Conseil de Sécurité pour une meilleure représentation africaine",
		],
		faits:
			"Le Gabon a siégé 4 fois au Conseil de Sécurité de l'ONU, démontrant son engagement dans la gouvernance mondiale.",
	},
	{
		icon: Handshake,
		title: "Partenariat UE — UA",
		description:
			"Dans le cadre du partenariat stratégique entre l'Union Européenne et l'Union Africaine, le Gabon et l'Espagne travaillent ensemble sur des enjeux transversaux majeurs. L'Espagne, membre influent de l'UE, et le Gabon, acteur clé de l'UA, constituent un binôme naturel pour renforcer les relations entre les deux continents.",
		objectifs: [
			"Coopération en matière de migration et mobilité",
			"Développement économique durable et industrialisation",
			"Lutte contre le changement climatique et transition énergétique",
			"Paix, sécurité et gouvernance démocratique",
			"Investissements dans l'éducation et la formation professionnelle",
		],
		faits:
			"Le partenariat UE-UA est le cadre principal de dialogue politique entre l'Europe et l'Afrique, couvrant 55 pays africains et 27 européens.",
	},
	{
		icon: Landmark,
		title: "Organisation Mondiale du Tourisme (OMT)",
		description:
			"L'Organisation Mondiale du Tourisme, dont le siège est à Madrid, constitue un point focal naturel de la coopération Gabon-Espagne. Le Gabon y promeut son potentiel touristique exceptionnel — 13 parcs nationaux couvrant 11% du territoire national, une biodiversité unique, et des opportunités d'écotourisme de classe mondiale.",
		objectifs: [
			"Promotion du tourisme durable et de l'écotourisme au Gabon",
			"Développement des capacités touristiques locales",
			"Formation des professionnels du tourisme gabonais en Espagne",
			"Protection de la biodiversité à travers le tourisme responsable",
			"Accès aux programmes de développement touristique de l'OMT",
		],
		faits:
			"Le Gabon possède 13 parcs nationaux et l'une des plus grandes forêts tropicales intactes au monde, un atout touristique majeur.",
	},
	{
		icon: Shield,
		title: "Communauté Économique des États de l'Afrique Centrale (CEEAC)",
		description:
			"Le Gabon joue un rôle de premier plan au sein de la CEEAC, dont le siège est à Libreville. L'Espagne, à travers ses programmes de coopération, soutient les initiatives de la CEEAC en matière de sécurité maritime dans le Golfe de Guinée, d'intégration régionale et de développement économique en Afrique Centrale.",
		objectifs: [
			"Sécurité maritime dans le Golfe de Guinée",
			"Intégration économique régionale",
			"Lutte contre la piraterie et la pêche illégale",
			"Développement des infrastructures de transport",
			"Harmonisation des politiques commerciales régionales",
		],
		faits:
			"La CEEAC regroupe 11 pays d'Afrique Centrale et son siège se trouve à Libreville, la capitale du Gabon.",
	},
	{
		icon: TreePalm,
		title: "Commission des Forêts d'Afrique Centrale (COMIFAC)",
		description:
			"Le bassin du Congo, deuxième massif forestier tropical au monde, est un enjeu environnemental mondial. Le Gabon, qui possède 88% de couverture forestière, est un acteur central de la COMIFAC. L'Espagne soutient les initiatives de conservation des forêts tropicales et de lutte contre le changement climatique dans le cadre de cette coopération.",
		objectifs: [
			"Conservation des forêts tropicales du bassin du Congo",
			"Lutte contre la déforestation et l'exploitation illégale",
			"Développement de l'économie verte et du marché carbone",
			"Gestion durable des ressources forestières",
			"Préservation de la biodiversité unique de la sous-région",
		],
		faits:
			"Le Gabon a été le premier pays africain à recevoir un paiement pour la réduction de ses émissions de carbone forestier (résultats REDD+).",
	},
	{
		icon: Scale,
		title: "Commission du Golfe de Guinée (CGG)",
		description:
			"La Commission du Golfe de Guinée est essentielle pour la sécurité maritime et la gestion des ressources marines. Le Gabon et l'Espagne coopèrent étroitement sur les questions de sécurité maritime, de lutte contre la piraterie et de protection des ressources halieutiques dans cette zone stratégique.",
		objectifs: [
			"Sécurisation des routes maritimes",
			"Lutte contre la piraterie et le trafic maritime",
			"Protection des zones de pêche et des ressources marines",
			"Coopération navale et formation des gardes-côtes",
			"Prévention de la pollution maritime",
		],
		faits:
			"Le Golfe de Guinée représente une zone stratégique majeure pour le commerce mondial et les ressources énergétiques.",
	},
];

const strategieMultilaterale = [
	{
		icon: Target,
		title: "Diplomatie proactive",
		description:
			"Sous la 5e République, le Gabon renforce son engagement dans les organisations internationales avec une participation active aux processus de décision et une présence renforcée dans les instances dirigeantes.",
	},
	{
		icon: Users,
		title: "Partenariats diversifiés",
		description:
			"Le Gabon élargit son réseau de partenaires au sein des instances multilatérales, avec l'Espagne comme partenaire privilégié en Europe, pour défendre les intérêts communs et porter la voix de l'Afrique Centrale.",
	},
	{
		icon: Building2,
		title: "Candidatures stratégiques",
		description:
			"Le Gabon se positionne stratégiquement pour occuper des postes clés au sein des organisations internationales, renforçant ainsi sa capacité d'influence et sa visibilité sur la scène mondiale.",
	},
];

function OrganisationsInternationalesPage() {
	const DEFAULT_SECTION_ORDER = ["hero", "organisations", "strategie", "cta"];

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				<SortableSectionList
					pagePath={PAGE_PATH}
					defaultOrder={DEFAULT_SECTION_ORDER}
				>
					{/* Breadcrumb + Hero */}
					<EditableSection sectionId="hero" label="Section Hero">
						<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
							<Link
								to="/cooperation"
								className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
							>
								<ArrowLeft className="w-4 h-4" />
								Retour à la coopération
							</Link>
						</div>
						<PageHero
							image="/images/ambassade_espagne.png"
							contentKey="cooperation.orgs.hero"
							pagePath={PAGE_PATH}
						>
							<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
								<Globe className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="cooperation.orgs.hero.badge"
									defaultValue="Organisations internationales"
									pagePath={PAGE_PATH}
									sectionId="hero"
									as="span"
								/>
							</Badge>

							<EditableText
								contentKey="cooperation.orgs.hero.title"
								defaultValue="Coopération au sein des organisations internationales"
								pagePath={PAGE_PATH}
								sectionId="hero"
								as="h1"
								className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
							/>

							<EditableText
								contentKey="cooperation.orgs.hero.description"
								defaultValue="Le Gabon et l'Espagne collaborent activement au sein des grandes instances multilatérales pour promouvoir la paix, le développement durable et la coopération internationale. Découvrez les organisations dans lesquelles les deux pays travaillent ensemble."
								pagePath={PAGE_PATH}
								sectionId="hero"
								as="p"
								className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed"
							/>
						</PageHero>
					</EditableSection>

					{/* Organisations détaillées */}
					<EditableSection
						sectionId="organisations"
						label="Organisations internationales"
					>
						<section className="py-12 md:py-24 px-4 md:px-6">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="cooperation.orgs.list.badge"
											defaultValue="Forums multilatéraux"
											pagePath={PAGE_PATH}
											sectionId="organisations"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="cooperation.orgs.list.title"
										defaultValue="Les organisations où le Gabon et l'Espagne coopèrent"
										pagePath={PAGE_PATH}
										sectionId="organisations"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="cooperation.orgs.list.subtitle"
										defaultValue="Une présence active et coordonnée sur la scène internationale"
										pagePath={PAGE_PATH}
										sectionId="organisations"
										as="p"
										className="text-muted-foreground max-w-2xl mx-auto"
									/>
								</div>

								<div className="space-y-8">
									{organisations.map((org) => {
										const Icon = org.icon
										return (
											<div
												key={org.title}
												className="group glass-card rounded-2xl p-8 md:p-10 hover:-translate-y-1 transition-all duration-300"
											>
												<div className="flex flex-col md:flex-row gap-6 md:gap-10">
													{/* Icon + Title */}
													<div className="flex-shrink-0">
														<div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
															<Icon className="w-8 h-8 text-primary" />
														</div>
													</div>

													{/* Content */}
													<div className="flex-1">
														<h3 className="text-2xl font-bold text-foreground mb-3">
															{org.title}
														</h3>
														<p className="text-muted-foreground leading-relaxed mb-6">
															{org.description}
														</p>

														{/* Objectifs */}
														<div className="mb-6">
															<h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
																Axes de coopération
															</h4>
															<div className="grid sm:grid-cols-2 gap-2">
																{org.objectifs.map((obj) => (
																	<div
																		key={obj}
																		className="flex items-start gap-2 text-sm"
																	>
																		<div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
																		<span className="text-muted-foreground">
																			{obj}
																		</span>
																	</div>
																))}
															</div>
														</div>

														{/* Fait marquant */}
														<div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
															<p className="text-sm text-primary font-medium">
																📌 {org.faits}
															</p>
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

					{/* Stratégie multilatérale */}
					<EditableSection
						sectionId="strategie"
						label="Stratégie multilatérale"
					>
						<section className="py-12 md:py-24 px-4 md:px-6 bg-muted/20">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="cooperation.orgs.strategie.badge"
											defaultValue="Vision stratégique"
											pagePath={PAGE_PATH}
											sectionId="strategie"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="cooperation.orgs.strategie.title"
										defaultValue="La stratégie multilatérale de la 5e République"
										pagePath={PAGE_PATH}
										sectionId="strategie"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="cooperation.orgs.strategie.subtitle"
										defaultValue="Les orientations du Gabon sur la scène internationale sous l'impulsion du Président de la Transition"
										pagePath={PAGE_PATH}
										sectionId="strategie"
										as="p"
										className="text-muted-foreground max-w-3xl mx-auto"
									/>
								</div>

								<div className="grid md:grid-cols-3 gap-8">
									{strategieMultilaterale.map((item) => {
										const Icon = item.icon
										return (
											<div
												key={item.title}
												className="group glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 text-center"
											>
												<div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center mb-6">
													<Icon className="w-8 h-8 text-primary" />
												</div>
												<h3 className="text-xl font-bold text-foreground mb-4">
													{item.title}
												</h3>
												<p className="text-muted-foreground leading-relaxed">
													{item.description}
												</p>
											</div>
										)
									})}
								</div>

								{/* Quote block */}
								<div className="mt-16 glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
									<EditableText
										contentKey="cooperation.orgs.strategie.quote"
										defaultValue="Le Gabon, sous la 5e République, entend jouer un rôle de premier plan sur la scène internationale. Notre coopération avec l'Espagne au sein des organisations multilatérales est un levier essentiel pour promouvoir nos intérêts communs et contribuer à un ordre mondial plus juste et plus équitable."
										pagePath={PAGE_PATH}
										sectionId="strategie"
										as="p"
										className="text-lg text-muted-foreground leading-relaxed italic"
									/>
									<div className="mt-6 pt-6 border-t border-border/50">
										<EditableText
											contentKey="cooperation.orgs.strategie.quote.author"
											defaultValue="— Vision diplomatique de la 5e République du Gabon"
											pagePath={PAGE_PATH}
											sectionId="strategie"
											as="p"
											className="text-sm text-primary font-semibold"
										/>
									</div>
								</div>
							</div>
						</section>
					</EditableSection>

					{/* CTA */}
					<EditableSection sectionId="cta" label="Appel à l'action">
						<CitizenCTA
							pagePath={PAGE_PATH}
							sectionId="cta"
							contentKeyPrefix="cooperation.orgs.cta"
						/>
					</EditableSection>
				</SortableSectionList>
			</div>
		</div>
	)
}
