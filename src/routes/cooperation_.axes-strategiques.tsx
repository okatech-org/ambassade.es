import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	BookOpen,
	Building2,
	Globe,
	GraduationCap,
	Handshake,
	Landmark,
	Leaf,
	Shield,
	TrendingUp,
} from "lucide-react";
import { EditableSection } from "@/components/inline-edit/EditableSection";
import { EditableText } from "@/components/inline-edit/EditableText";
import { SortableSectionList } from "@/components/inline-edit/SortableSectionList";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { CitizenCTA } from "@/components/home/CitizenCTA";

export const Route = createFileRoute("/cooperation_/axes-strategiques")({
	component: AxesStrategiquesPage,
	head: () => ({
		meta: [
			{
				title:
					"Axes stratégiques de la coopération bilatérale | Ambassade de la République Gabonaise",
			},
			{
				name: "description",
				content:
					"Les domaines clés de la coopération entre le Gabon et l'Espagne : économie, éducation, culture, sécurité, environnement et coopération multilatérale.",
			},
		],
	}),
});

const PAGE_PATH = "/cooperation/axes-strategiques";

const axes = [
	{
		icon: TrendingUp,
		color: "from-emerald-500/20 to-emerald-600/5",
		accentColor: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
		iconColor: "text-emerald-600",
		title: "Coopération économique & commerciale",
		description:
			"La coopération économique entre le Gabon et l'Espagne constitue un pilier fondamental de la relation bilatérale. Elle vise à promouvoir les échanges commerciaux, soutenir les investissements mutuels et contribuer à la diversification de l'économie gabonaise.",
		programmes: [
			{ name: "Promotion des investissements", detail: "Facilitation de l'implantation d'entreprises espagnoles au Gabon dans les secteurs des hydrocarbures, mines, infrastructures et tourisme." },
			{ name: "Diversification économique", detail: "Partenariats pour la transformation locale des matières premières et le développement de l'agro-industrie." },
			{ name: "Échanges commerciaux", detail: "Promotion des produits gabonais en Espagne et facilitation de l'accès au marché européen." },
		],
		chiffres: [
			{ label: "Entreprises espagnoles au Gabon", value: "30+" },
			{ label: "Volume commercial bilatéral", value: "€150M+" },
			{ label: "Secteurs de coopération", value: "8" },
		],
	},
	{
		icon: GraduationCap,
		color: "from-blue-500/20 to-blue-600/5",
		accentColor: "bg-blue-500/10 group-hover:bg-blue-500/20",
		iconColor: "text-blue-600",
		title: "Coopération éducative & scientifique",
		description:
			"L'éducation et la science sont au cœur de la coopération bilatérale. L'AECID offre des programmes de bourses et de formation aux étudiants et professionnels gabonais.",
		programmes: [
			{ name: "Bourses d'études AECID", detail: "Programme de bourses pour les étudiants gabonais souhaitant poursuivre des études supérieures en Espagne." },
			{ name: "Partenariats universitaires", detail: "Accords entre universités gabonaises (UOB, USTM) et espagnoles pour échanges académiques et recherche." },
			{ name: "Formation professionnelle", detail: "Programmes de formation technique dans les domaines prioritaires : santé, environnement, technologies." },
		],
		chiffres: [
			{ label: "Boursiers AECID gabonais", value: "200+" },
			{ label: "Universités partenaires", value: "12" },
			{ label: "Programmes de formation", value: "15+" },
		],
	},
	{
		icon: BookOpen,
		color: "from-violet-500/20 to-violet-600/5",
		accentColor: "bg-violet-500/10 group-hover:bg-violet-500/20",
		iconColor: "text-violet-600",
		title: "Coopération culturelle & sportive",
		description:
			"La coopération culturelle et sportive contribue au rapprochement des peuples gabonais et espagnol à travers les échanges artistiques, la promotion des cultures et le sport.",
		programmes: [
			{ name: "Échanges artistiques", detail: "Expositions d'art gabonais en Espagne, résidences d'artistes et promotion de l'artisanat gabonais." },
			{ name: "Enseignement de l'espagnol", detail: "Promotion de la langue espagnole au Gabon et soutien aux Centres Cervantes." },
			{ name: "Coopération sportive", detail: "Échanges sportifs, stages de formation pour entraîneurs et athlètes gabonais en Espagne." },
		],
		chiffres: [
			{ label: "Événements culturels/an", value: "10+" },
			{ label: "Artistes en résidence", value: "25+" },
			{ label: "Sportifs formés", value: "50+" },
		],
	},
	{
		icon: Shield,
		color: "from-red-500/20 to-red-600/5",
		accentColor: "bg-red-500/10 group-hover:bg-red-500/20",
		iconColor: "text-red-600",
		title: "Coopération sécuritaire & défense",
		description:
			"Sécurité maritime dans le Golfe de Guinée, formation des forces de sécurité, lutte contre le terrorisme et la criminalité transfrontalière. Renforcée par l'accord-cadre de 2014.",
		programmes: [
			{ name: "Sécurité maritime", detail: "Patrouilles conjointes, échange d'informations, formation des gardes-côtes et lutte contre la piraterie." },
			{ name: "Formation militaire & policière", detail: "Formation des officiers gabonais dans les académies militaires espagnoles." },
			{ name: "Coopération judiciaire", detail: "Entraide judiciaire, lutte contre le blanchiment d'argent et le trafic de stupéfiants." },
		],
		chiffres: [
			{ label: "Officiers formés", value: "100+" },
			{ label: "Exercices navals", value: "5+" },
			{ label: "Accord-cadre défense", value: "2014" },
		],
	},
	{
		icon: Globe,
		color: "from-sky-500/20 to-sky-600/5",
		accentColor: "bg-sky-500/10 group-hover:bg-sky-500/20",
		iconColor: "text-sky-600",
		title: "Coopération multilatérale",
		description:
			"Coordination des positions diplomatiques au sein des organisations internationales : ONU, partenariat UE-UA, OMT et autres forums multilatéraux.",
		programmes: [
			{ name: "Nations Unies", detail: "Coordination sur paix, sécurité et développement durable. Le Gabon a siégé au Conseil de Sécurité (2022-2023)." },
			{ name: "Partenariat UE-UA", detail: "Travail conjoint sur migration, développement économique, climat et sécurité." },
			{ name: "OMT — Madrid", detail: "Promotion du potentiel touristique gabonais avec le soutien de l'Espagne, pays hôte de l'OMT." },
		],
		chiffres: [
			{ label: "Mandats au CS", value: "4" },
			{ label: "Organisations", value: "10+" },
			{ label: "Résolutions co-soutenues", value: "50+" },
		],
	},
	{
		icon: Leaf,
		color: "from-green-500/20 to-green-600/5",
		accentColor: "bg-green-500/10 group-hover:bg-green-500/20",
		iconColor: "text-green-600",
		title: "Coopération au développement & environnement",
		description:
			"Le Gabon, avec 88% de couverture forestière, est un acteur clé de la lutte contre le changement climatique. L'Espagne soutient les projets de développement durable et de biodiversité.",
		programmes: [
			{ name: "Protection des forêts", detail: "Gestion durable des forêts gabonaises, lutte contre l'exploitation illégale, programme REDD+." },
			{ name: "Économie bleue", detail: "Développement maritime durable, protection des écosystèmes marins et pêche responsable." },
			{ name: "Énergies renouvelables", detail: "Développement solaire, hydroélectrique et biomasse avec l'expertise des entreprises espagnoles." },
		],
		chiffres: [
			{ label: "Couverture forestière", value: "88%" },
			{ label: "Parcs nationaux", value: "13" },
			{ label: "Projets AECID", value: "8+" },
		],
	},
];

function AxesStrategiquesPage() {
	const DEFAULT_SECTION_ORDER = ["hero", "axes-detail", "vision", "cta"];

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
							contentKey="cooperation.axes.hero"
							pagePath={PAGE_PATH}
						>
							<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
								<Handshake className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="cooperation.axes.hero.badge"
									defaultValue="Coopération bilatérale"
									pagePath={PAGE_PATH}
									sectionId="hero"
									as="span"
								/>
							</Badge>
							<EditableText
								contentKey="cooperation.axes.hero.title"
								defaultValue="Axes stratégiques de la coopération bilatérale"
								pagePath={PAGE_PATH}
								sectionId="hero"
								as="h1"
								className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
							/>
							<EditableText
								contentKey="cooperation.axes.hero.description"
								defaultValue="Découvrez en détail les six domaines clés de la coopération entre la République Gabonaise et le Royaume d'Espagne, au service du développement mutuel et de la prospérité commune."
								pagePath={PAGE_PATH}
								sectionId="hero"
								as="p"
								className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed"
							/>
						</PageHero>
					</EditableSection>

					{/* Axes détaillés */}
					<EditableSection sectionId="axes-detail" label="Axes de coopération détaillés">
						<section className="py-12 md:py-24 px-4 md:px-6">
							<div className="max-w-7xl mx-auto space-y-12">
								{axes.map((axe, index) => {
									const Icon = axe.icon
									return (
										<div key={axe.title} className={`group glass-card rounded-2xl overflow-hidden ${index % 2 === 0 ? "" : "bg-muted/10"}`}>
											<div className={`h-1 bg-gradient-to-r ${axe.color}`} />
											<div className="p-8 md:p-10">
												<div className="flex items-center gap-4 mb-6">
													<div className={`p-4 rounded-2xl ${axe.accentColor} transition-colors`}>
														<Icon className={`w-8 h-8 ${axe.iconColor}`} />
													</div>
													<h2 className="text-2xl md:text-3xl font-bold text-foreground">{axe.title}</h2>
												</div>
												<p className="text-muted-foreground leading-relaxed mb-8 text-lg">{axe.description}</p>
												<div className="grid lg:grid-cols-3 gap-8">
													<div className="lg:col-span-2 space-y-4">
														<h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Programmes & initiatives</h3>
														{axe.programmes.map((prog) => (
															<div key={prog.name} className="p-4 rounded-xl bg-background/50 border border-border/30">
																<h4 className="font-semibold text-foreground mb-1">{prog.name}</h4>
																<p className="text-sm text-muted-foreground leading-relaxed">{prog.detail}</p>
															</div>
														))}
													</div>
													<div>
														<h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Chiffres clés</h3>
														<div className="space-y-4">
															{axe.chiffres.map((ch) => (
																<div key={ch.label} className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
																	<div className="text-3xl font-bold text-primary mb-1">{ch.value}</div>
																	<p className="text-xs text-muted-foreground">{ch.label}</p>
																</div>
															))}
														</div>
													</div>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</section>
					</EditableSection>

					{/* Vision 5e République */}
					<EditableSection sectionId="vision" label="Vision de la 5e République">
						<section className="py-12 md:py-24 px-4 md:px-6 bg-muted/20">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
										<EditableText contentKey="cooperation.axes.vision.badge" defaultValue="5e République" pagePath={PAGE_PATH} sectionId="vision" as="span" />
									</Badge>
									<EditableText contentKey="cooperation.axes.vision.title" defaultValue="La vision de la 5e République pour la coopération bilatérale" pagePath={PAGE_PATH} sectionId="vision" as="h2" className="text-3xl md:text-4xl font-bold text-foreground mb-4" />
								</div>
								<div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
									<EditableText
										contentKey="cooperation.axes.vision.content"
										defaultValue="La 5e République du Gabon place la coopération internationale au cœur de sa stratégie de développement. La relation bilatérale avec l'Espagne s'inscrit dans cette vision d'une diplomatie rénovée, axée sur la souveraineté économique, la diversification des partenariats et le développement humain."
										pagePath={PAGE_PATH} sectionId="vision" as="p"
										className="text-lg text-muted-foreground leading-relaxed"
									/>
									<div className="mt-8 grid md:grid-cols-3 gap-6">
										{[
											{ icon: TrendingUp, label: "Souveraineté économique", desc: "Transformation locale des ressources et montée en gamme industrielle." },
											{ icon: Landmark, label: "Bonne gouvernance", desc: "Restauration de l'État de droit et modernisation des institutions." },
											{ icon: Building2, label: "Développement humain", desc: "Investissement dans l'éducation, la santé et l'emploi des jeunes." },
										].map((item) => {
											const ItemIcon = item.icon
											return (
												<div key={item.label} className="p-4 rounded-xl bg-background/50 border border-border/30 text-center">
													<div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
														<ItemIcon className="w-6 h-6 text-primary" />
													</div>
													<h4 className="font-semibold text-foreground mb-1">{item.label}</h4>
													<p className="text-sm text-muted-foreground">{item.desc}</p>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</section>
					</EditableSection>

					{/* CTA */}
					<EditableSection sectionId="cta" label="Appel à l'action">
						<CitizenCTA pagePath={PAGE_PATH} sectionId="cta" contentKeyPrefix="cooperation.axes.cta" />
					</EditableSection>
				</SortableSectionList>
			</div>
		</div>
	)
}
