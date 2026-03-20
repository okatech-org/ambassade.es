import { api } from "@convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import {
	Building2,
	Eye,
	FileText,
	Gavel,
	Globe,
	Handshake,
	Heart,
	MapPin,
	Plane,
	Shield,
	Target,
	Users,
} from "lucide-react";
import { ConsulMessage } from "@/components/about/ConsulMessage";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { EditableSection } from "@/components/inline-edit/EditableSection";
import { EditableText } from "@/components/inline-edit/EditableText";
import { SortableSectionList } from "@/components/inline-edit/SortableSectionList";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CitizenCTA } from "../components/home/CitizenCTA";

export const Route = createFileRoute("/ambassade")({
	component: AmbassadePage,
});

function AmbassadePage() {
	const missions = [
		{
			icon: Shield,
			title: "Protection des ressortissants",
			description:
				"Protection des intérêts de l'État gabonais et de ses ressortissants en Espagne, conformément à la Convention de Vienne de 1961. Assistance aux détenus, victimes d'accidents, et accompagnement en cas de décès ou de rapatriement.",
		},
		{
			icon: Globe,
			title: "Relations bilatérales",
			description:
				"Développement et renforcement des relations diplomatiques, économiques, culturelles et scientifiques entre le Gabon et le Royaume d'Espagne. Relations diplomatiques établies depuis 1964 avec plus de 12 accords bilatéraux en vigueur.",
		},
		{
			icon: FileText,
			title: "Documents officiels",
			description:
				"Délivrance de visas (consulaire, touristique, affaires, visite familiale, diplomatique, express), titres de voyage et documents de circulation. Légalisation et certification de documents administratifs officiels.",
		},
		{
			icon: Users,
			title: "État Civil",
			description:
				"Fonctions d'Officier d'État Civil : transcription de naissances, célébration de mariages, déclaration de décès et transcription d'actes. Service de l'état civil pour la communauté gabonaise en Espagne.",
		},
		{
			icon: Gavel,
			title: "Actes notariés & administratifs",
			description:
				"Fonctions notariales pour les actes authentiques, procurations, certificats de vie, légalisations de signatures et de documents. Rédaction et certification d'actes administratifs.",
		},
		{
			icon: Plane,
			title: "Assistance d'urgence",
			description:
				"Secours et assistance aux ressortissants gabonais en difficulté : aide aux détenus, victimes d'accidents ou de catastrophes, organisation de rapatriements et aide d'urgence. Missions consulaires de soutien moral, administratif et humanitaire.",
		},
		{
			icon: Handshake,
			title: "Représentation internationale",
			description:
				"Représentation du Gabon auprès des organisations internationales basées à Madrid, notamment l'Organisation Mondiale du Tourisme (OMT/ONU Tourisme). Promotion du Gabon lors d'événements internationaux comme FITUR.",
		},
	];

	const visionValues = [
		{
			icon: Target,
			title: "Notre Mission",
			description:
				"Représenter la République Gabonaise auprès du Royaume d'Espagne, protéger les intérêts de l'État et assurer le bien-être de la communauté gabonaise résidant sur le territoire espagnol. Renforcer la coopération bilatérale dans les domaines économique, culturel, militaire et touristique.",
		},
		{
			icon: Eye,
			title: "Notre Vision",
			description:
				"Faire de l'Ambassade un pôle d'excellence diplomatique, un pont entre le Gabon et l'Espagne, et un espace de service moderne et accessible. Promouvoir le Gabon comme destination d'investissement et de tourisme auprès du public espagnol et de la communauté internationale.",
		},
		{
			icon: Heart,
			title: "Nos Valeurs",
			description:
				"Union, Travail, Justice — les valeurs fondatrices de la République Gabonaise guident notre action quotidienne au service des citoyens et dans la promotion de notre pays à l'étranger. Intégrité, proximité et efficacité dans chaque interaction.",
		},
	];

	// Fetch team members
	const teamMembers = useQuery(api.functions.teamMembers.list);
	const consulGeneral = useQuery(api.functions.teamMembers.getConsulGeneral);

	// Filter out the consul general from regular team members
	const otherMembers = teamMembers?.filter((m) => !m.isConsulGeneral) || [];

	const DEFAULT_SECTION_ORDER = [
		"hero",
		"consul",
		"vision",
		"missions",
		"team",
		"cta",
	];

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				<SortableSectionList
					pagePath="/ambassade"
					defaultOrder={DEFAULT_SECTION_ORDER}
				>
					{/* Hero Section */}
					<EditableSection sectionId="hero" label="Section Hero">
						<PageHero
							image="/images/ambassade_espagne.png"
							contentKey="consulat.hero"
							pagePath="/ambassade"
						>
							<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
								<Building2 className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="consulat.hero.badge"
									defaultValue="Ambassade de la République Gabonaise"
									pagePath="/ambassade"
									sectionId="hero"
									as="span"
								/>
							</Badge>

							<EditableText
								contentKey="consulat.hero.title"
								defaultValue="L'Ambassade du Gabon au service de ses citoyens en Espagne"
								pagePath="/ambassade"
								sectionId="hero"
								as="h1"
								className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
							/>

							<EditableText
								contentKey="consulat.hero.description"
								defaultValue="L'Ambassade de la République Gabonaise auprès du Royaume d'Espagne et Représentation Permanente auprès d'ONU Tourisme, sous la direction de S.E. Madame Allegra Pamela Bongo, assure la représentation diplomatique du Gabon, la protection des ressortissants gabonais et le renforcement des relations bilatérales. Depuis 1964, le Gabon et l'Espagne entretiennent des relations diplomatiques solides dans les domaines politique, économique, culturel et militaire."
								pagePath="/ambassade"
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
									<a href="/services" title="Découvrir nos services">
										<FileText className="w-4 h-4 mr-2" />
										<EditableText
											contentKey="consulat.hero.cta1"
											defaultValue="Découvrir nos services"
											pagePath="/ambassade"
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
									<a href="/contact" title="Nous rendre visite">
										<MapPin className="w-4 h-4 mr-2" />
										<EditableText
											contentKey="consulat.hero.cta2"
											defaultValue="Nous rendre visite"
											pagePath="/ambassade"
											sectionId="hero"
											as="span"
										/>
									</a>
								</Button>
							</div>
						</PageHero>
					</EditableSection>

					{/* Ambassador Message Section */}
					<EditableSection sectionId="consul" label="Mot de l'Ambassadeur">
						<ConsulMessage
							firstName={consulGeneral?.firstName ?? "Allegra Pamela"}
							lastName={consulGeneral?.lastName ?? "BONGO"}
							role={
								consulGeneral?.role ??
							"Ambassadeur de la République Gabonaise\nPrès le Royaume d'Espagne\nReprésentante Permanente auprès d'ONU Tourisme"
							}
							description={
								consulGeneral?.description ??
								"Diplomate de carrière, S.E. Madame Allegra Pamela Bongo a présenté ses lettres de créance à Sa Majesté le Roi Felipe VI le 8 janvier 2025. Ancienne Première Conseillère à la Délégation permanente du Gabon auprès de l'UNESCO à Paris, puis Représentante adjointe et Conseillère aux Affaires étrangères, elle apporte une riche expérience diplomatique au service du renforcement des relations entre le Gabon et l'Espagne."
							}
							photoUrl="/images/ambassadrice.png"
							email={consulGeneral?.email ?? "ambassadegabon.madrid@gmail.com"}
							linkedIn={consulGeneral?.linkedIn}
							contentKeyPrefix="consulat.consul"
							pagePath="/ambassade"
							sectionId="consul"
							sectionTitle="Mot de l'Ambassadeur"
							honorifique="S.E. Madame"
						/>
					</EditableSection>

					{/* Vision & Values Section */}
					<EditableSection sectionId="vision" label="Mission, Vision & Valeurs">
						<section className="py-12 md:py-24 px-4 md:px-6">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="consulat.vision.badge"
											defaultValue="Notre Identité"
											pagePath="/ambassade"
											sectionId="vision"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="consulat.vision.title"
										defaultValue="Mission, Vision & Valeurs"
										pagePath="/ambassade"
										sectionId="vision"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="consulat.vision.subtitle"
										defaultValue="Les fondements qui guident notre action diplomatique au Royaume d'Espagne"
										pagePath="/ambassade"
										sectionId="vision"
										as="p"
										className="text-muted-foreground max-w-2xl mx-auto"
									/>
								</div>

								<div className="grid md:grid-cols-3 gap-8">
									{visionValues.map((item) => {
										const Icon = item.icon;
										return (
											<div
												key={item.title}
												className="group relative glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 text-center"
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
										);
									})}
								</div>
							</div>
						</section>
					</EditableSection>

					{/* Missions Section */}
					<EditableSection sectionId="missions" label="Section Missions">
						<section className="py-12 md:py-24 px-4 md:px-6 bg-muted/20">
							<div className="max-w-7xl mx-auto">
								<div className="text-center mb-16">
									<Badge
										variant="outline"
										className="mb-4 bg-background/50 backdrop-blur-sm"
									>
										<EditableText
											contentKey="consulat.missions.badge"
											defaultValue="Ce que nous faisons"
											pagePath="/ambassade"
											sectionId="missions"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="consulat.missions.title"
										defaultValue="Nos Missions"
										pagePath="/ambassade"
										sectionId="missions"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="consulat.missions.subtitle"
										defaultValue="Les fonctions diplomatiques et consulaires conformément aux Conventions de Vienne"
										pagePath="/ambassade"
										sectionId="missions"
										as="p"
										className="text-muted-foreground max-w-2xl mx-auto"
									/>
								</div>

								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
									{missions.slice(0, 3).map((mission) => {
										const Icon = mission.icon;
										return (
											<div
												key={mission.title}
												className="group glass-card rounded-2xl p-5 md:p-8 hover:-translate-y-2 transition-all duration-300"
											>
												<div className="flex items-center gap-4 mb-6">
													<div className="p-3.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
														<Icon className="w-6 h-6 text-primary" />
													</div>
													<h3 className="text-xl font-bold text-foreground">
														{mission.title}
													</h3>
												</div>
												<p className="text-muted-foreground leading-relaxed">
													{mission.description}
												</p>
											</div>
										);
									})}
								</div>
								<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
									{missions.slice(3).map((mission) => {
										const Icon = mission.icon;
										return (
											<div
												key={mission.title}
												className="group glass-card rounded-2xl p-5 md:p-8 hover:-translate-y-2 transition-all duration-300"
											>
												<div className="flex items-center gap-4 mb-6">
													<div className="p-3.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
														<Icon className="w-6 h-6 text-primary" />
													</div>
													<h3 className="text-xl font-bold text-foreground">
														{mission.title}
													</h3>
												</div>
												<p className="text-muted-foreground leading-relaxed">
													{mission.description}
												</p>
											</div>
										);
									})}
								</div>
							</div>
						</section>
					</EditableSection>

					{/* Team Section */}
					<EditableSection sectionId="team" label="Section Équipe">
						{otherMembers.length > 0 && (
							<section className="py-12 md:py-16 px-4 md:px-6">
								<div className="max-w-7xl mx-auto">
									<div className="text-center mb-12">
										<Badge variant="outline" className="mb-4">
											<EditableText
												contentKey="consulat.team.badge"
												defaultValue="Notre équipe"
												pagePath="/ambassade"
												sectionId="team"
												as="span"
											/>
										</Badge>
										<EditableText
											contentKey="consulat.team.title"
											defaultValue="L'équipe de l'Ambassade"
											pagePath="/ambassade"
											sectionId="team"
											as="h2"
											className="text-3xl md:text-4xl font-bold text-foreground mb-4"
										/>
										<EditableText
											contentKey="consulat.team.subtitle"
											defaultValue="Des professionnels dévoués au service de la communauté gabonaise en Espagne"
											pagePath="/ambassade"
											sectionId="team"
											as="p"
											className="text-muted-foreground max-w-2xl mx-auto"
										/>
									</div>

									<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
										{otherMembers.map((member) => (
											<TeamMemberCard
												key={member._id}
												firstName={member.firstName}
												lastName={member.lastName}
												role={member.role}
												description={member.description}
												photoUrl={member.photoUrl}
												email={member.email}
												linkedIn={member.linkedIn}
											/>
										))}
									</div>
								</div>
							</section>
						)}
					</EditableSection>

					<EditableSection sectionId="cta" label="Appel à l'action">
						<CitizenCTA
							pagePath="/ambassade"
							sectionId="cta"
							contentKeyPrefix="consulat.cta"
						/>
					</EditableSection>
				</SortableSectionList>
			</div>
		</div>
	);
}
