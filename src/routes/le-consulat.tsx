import { api } from "@convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import {
	Building2,
	FileText,
	Gavel,
	Globe,
	MapPin,
	Plane,
	Shield,
	Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ConsulMessage } from "@/components/about/ConsulMessage";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { EditableSection } from "@/components/inline-edit/EditableSection";
import { EditableText } from "@/components/inline-edit/EditableText";
import { SortableSectionList } from "@/components/inline-edit/SortableSectionList";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CitizenCTA } from "../components/home/CitizenCTA";

export const Route = createFileRoute("/le-consulat")({
	component: LeConsulatPage,
});

function LeConsulatPage() {
	const { t } = useTranslation();

	const missions = [
		{
			icon: Shield,
			title: t("leConsulat.missions.0.title", "Protection des ressortissants"),
			description: t(
				"leConsulat.missions.0.description",
				"Protection des intérêts de l'État gabonais et de ses ressortissants en France, conformément à la Convention de Vienne de 1963 (art. 5). Assistance aux détenus, victimes d'accidents, et accompagnement en cas de décès ou de rapatriement.",
			),
		},
		{
			icon: Globe,
			title: t("leConsulat.missions.1.title", "Relations internationales"),
			description: t(
				"leConsulat.missions.1.description",
				"Développement des relations commerciales, économiques, culturelles et scientifiques entre le Gabon et la France. Promotion de la coopération bilatérale et de la diplomatie économique.",
			),
		},
		{
			icon: FileText,
			title: t("leConsulat.missions.2.title", "Documents officiels"),
			description: t(
				"leConsulat.missions.2.description",
				"Délivrance de passeports, visas, titres de voyage et documents de circulation. Légalisation et certification de documents administratifs officiels pour les ressortissants et visiteurs.",
			),
		},
		{
			icon: Users,
			title: t("leConsulat.missions.3.title", "État Civil"),
			description: t(
				"leConsulat.missions.3.description",
				"Fonctions d'Officier d'État Civil : enregistrement des naissances, célébration de mariages, déclaration de décès et transcription d'actes. Service de l'état civil pour la communauté gabonaise.",
			),
		},
		{
			icon: Gavel,
			title: t(
				"leConsulat.missions.4.title",
				"Actes notariés & administratifs",
			),
			description: t(
				"leConsulat.missions.4.description",
				"Fonctions notariales pour les actes authentiques, procurations, certificats de vie, légalisations de signatures et de documents. Rédaction et certification d'actes administratifs.",
			),
		},
		{
			icon: Plane,
			title: t("leConsulat.missions.5.title", "Assistance d'urgence"),
			description: t(
				"leConsulat.missions.5.description",
				"Secours et assistance aux ressortissants gabonais en difficulté : aide aux détenus, victimes d'accidents ou de catastrophes, organisation de rapatriements et aide d'urgence.",
			),
		},
		{
			icon: Gavel,
			title: t("leConsulat.missions.6.title", "Fonctions judiciaires"),
			description: t(
				"leConsulat.missions.6.description",
				"Transmission d'actes judiciaires et extrajudiciaires, exécution de commissions rogatoires selon les conventions internationales. Facilitation des démarches juridiques entre la France et le Gabon.",
			),
		},
	];

	// Fetch team members
	const teamMembers = useQuery(api.functions.teamMembers.list);
	const consulGeneral = useQuery(api.functions.teamMembers.getConsulGeneral);

	// Filter out the consul general from regular team members
	const otherMembers = teamMembers?.filter((m) => !m.isConsulGeneral) || [];

	const DEFAULT_SECTION_ORDER = ["hero", "consul", "missions", "team", "cta"];

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				<SortableSectionList
					pagePath="/le-consulat"
					defaultOrder={DEFAULT_SECTION_ORDER}
				>
					{/* Hero Section */}
					<EditableSection sectionId="hero" label="Section Hero">
						<PageHero
							image="/images/Consult_general.jpeg"
							contentKey="consulat.hero"
							pagePath="/le-consulat"
						>
							<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
								<Building2 className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="consulat.hero.badge"
									defaultValue={t("leConsulat.badge", "Institution Officielle")}
									pagePath="/le-consulat"
									sectionId="hero"
									as="span"
								/>
							</Badge>

							<EditableText
								contentKey="consulat.hero.title"
								defaultValue={t(
									"leConsulat.heroTitle",
									"Notre mission est de vous accompagner",
								)}
								pagePath="/le-consulat"
								sectionId="hero"
								as="h1"
								className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
							/>

							<EditableText
								contentKey="consulat.hero.description"
								defaultValue={t(
									"leConsulat.heroDescription",
									"Conformément à la Convention de Vienne sur les relations consulaires, le Consulat Général du Gabon en France assure la protection et l'assistance des ressortissants gabonais, délivre les documents officiels et favorise le développement des relations entre les deux pays.",
								)}
								pagePath="/le-consulat"
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
									<a href="/services">
										<FileText className="w-4 h-4 mr-2" />
										<EditableText
											contentKey="consulat.hero.cta1"
											defaultValue={t(
												"leConsulat.discoverServices",
												"Découvrir nos services",
											)}
											pagePath="/le-consulat"
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
									<a href="/contact">
										<MapPin className="w-4 h-4 mr-2" />
										<EditableText
											contentKey="consulat.hero.cta2"
											defaultValue={t(
												"leConsulat.contactUs",
												"Nous rendre visite",
											)}
											pagePath="/le-consulat"
											sectionId="hero"
											as="span"
										/>
									</a>
								</Button>
							</div>
						</PageHero>
					</EditableSection>

					{/* Consul General Message Section */}
					<EditableSection sectionId="consul" label="Mot du Consul">
						<ConsulMessage
							firstName={consulGeneral?.firstName ?? "Jean-Rémy"}
							lastName={consulGeneral?.lastName ?? "MAGANGA-NZAMBA"}
							role={
								consulGeneral?.role ??
								t("leConsulat.consulRole", "Consul Général du Gabon en France")
							}
							description={
								consulGeneral?.description ??
								t(
									"leConsulat.consulDescription",
									"Diplomate de carrière, le Consul Général assure la protection et l'assistance des ressortissants gabonais en France. Il veille au renforcement des relations bilatérales entre le Gabon et la France et à la modernisation des services consulaires.",
								)
							}
							photoUrl={"/images/consul_general.jpg"}
							email={consulGeneral?.email ?? "contact@consulatdugabon.fr"}
							linkedIn={consulGeneral?.linkedIn}
							contentKeyPrefix="consulat.consul"
							pagePath="/le-consulat"
							sectionId="consul"
						/>
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
											defaultValue={t(
												"leConsulat.missionsBadge",
												"Ce que nous faisons",
											)}
											pagePath="/le-consulat"
											sectionId="missions"
											as="span"
										/>
									</Badge>
									<EditableText
										contentKey="consulat.missions.title"
										defaultValue={t("leConsulat.missionsTitle", "Nos Missions")}
										pagePath="/le-consulat"
										sectionId="missions"
										as="h2"
										className="text-3xl md:text-4xl font-bold text-foreground mb-4"
									/>
									<EditableText
										contentKey="consulat.missions.subtitle"
										defaultValue={t(
											"leConsulat.missionsSubtitle",
											"Les fonctions consulaires telles que définies par la Convention de Vienne de 1963",
										)}
										pagePath="/le-consulat"
										sectionId="missions"
										as="p"
										className="text-muted-foreground max-w-2xl mx-auto"
									/>
								</div>

								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
									{missions.map((mission) => {
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
								<div className="max-w-6xl mx-auto">
									<div className="text-center mb-12">
										<Badge variant="outline" className="mb-4">
											<EditableText
												contentKey="consulat.team.badge"
												defaultValue={t("leConsulat.teamBadge", "Notre équipe")}
												pagePath="/le-consulat"
												sectionId="team"
												as="span"
											/>
										</Badge>
										<EditableText
											contentKey="consulat.team.title"
											defaultValue={t(
												"leConsulat.teamTitle",
												"Les membres de notre équipe",
											)}
											pagePath="/le-consulat"
											sectionId="team"
											as="h2"
											className="text-3xl md:text-4xl font-bold text-foreground mb-4"
										/>
										<EditableText
											contentKey="consulat.team.subtitle"
											defaultValue={t(
												"leConsulat.teamSubtitle",
												"Des professionnels dévoués à votre service",
											)}
											pagePath="/le-consulat"
											sectionId="team"
											as="p"
											className="text-muted-foreground max-w-2xl mx-auto"
										/>
									</div>

									<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
							pagePath="/le-consulat"
							sectionId="cta"
							contentKeyPrefix="consulat.cta"
						/>
					</EditableSection>
				</SortableSectionList>
			</div>
		</div>
	);
}
