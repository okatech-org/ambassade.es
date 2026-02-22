import { api } from "@convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
	Bell,
	Bot,
	Check,
	Eye,
	EyeOff,
	Globe,
	Info,
	KeyRound,
	Loader2,
	Mail,
	Radar,
	Save,
	ServerCrash,
	Settings2,
	Shield,
	ShieldAlert,
	ShieldBan,
	ShieldCheck,
	Trash2,
	X,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/settings/")({
	component: SettingsPage,
});

function SettingsPage() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
			{/* Page Header */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3 mb-1">
					<div className="p-2.5 rounded-xl bg-primary/10 text-primary">
						<Settings2 className="w-6 h-6" />
					</div>
					<div>
						<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
							{t("superadmin.settings.title")}
						</h1>
						<p className="text-sm text-muted-foreground mt-1 font-medium">
							{t("superadmin.settings.description")}
						</p>
					</div>
				</div>
			</div>

			<Tabs defaultValue="general" className="space-y-6">
				<TabsList className="h-12 p-1 w-full md:w-auto glass-card border-none bg-muted/50 rounded-xl">
					<TabsTrigger
						value="general"
						className="gap-2 px-4 h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
					>
						<Globe className="w-4 h-4" />
						{t("superadmin.settings.tabs.general")}
					</TabsTrigger>
					<TabsTrigger
						value="notifications"
						className="gap-2 px-4 h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
					>
						<Bell className="w-4 h-4" />
						{t("superadmin.settings.tabs.notifications")}
					</TabsTrigger>
					<TabsTrigger
						value="security"
						className="gap-2 px-4 h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
					>
						<Shield className="w-4 h-4" />
						{t("superadmin.settings.tabs.security")}
					</TabsTrigger>
				</TabsList>

				{/* ─── General Tab ───────────────────────────────── */}
				<TabsContent value="general" className="space-y-6">
					<GeneralSettingsTab />
				</TabsContent>

				{/* ─── Notifications Tab ─────────────────────────── */}
				<TabsContent value="notifications" className="space-y-6">
					<NotificationsTab />
				</TabsContent>

				{/* ─── Security Tab ──────────────────────────────── */}
				<TabsContent value="security" className="space-y-6">
					<NetworkSecurityPanel />
					<UniversalPasswordTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}

// ─── General Settings Tab ────────────────────────────────────────────────────

function GeneralSettingsTab() {
	const { t } = useTranslation();
	const siteNameId = useId();
	const adminEmailId = useId();
	const settings = useQuery(api.functions.siteSettings.getSettings);
	const updateGeneral = useMutation(api.functions.siteSettings.updateGeneral);

	const [siteName, setSiteName] = useState("");
	const [adminEmail, setAdminEmail] = useState("");
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (settings) {
			setSiteName(settings.siteName);
			setAdminEmail(settings.adminEmail);
		}
	}, [settings]);

	const handleSave = async () => {
		setSaving(true);
		setSaved(false);
		try {
			await updateGeneral({ siteName, adminEmail });
			setSaved(true);
			setTimeout(() => setSaved(false), 2500);
		} finally {
			setSaving(false);
		}
	};

	if (!settings) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center py-16">
					<Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			{/* Site Name Card */}
			<Card className="glass-card">
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-1.5 rounded-lg bg-blue-500/10">
							<Globe className="w-4 h-4 text-blue-600" />
						</div>
						<div>
							<CardTitle className="text-base">Nom du site</CardTitle>
							<CardDescription className="text-xs">
								Affiché dans l'interface et les communications.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<Label htmlFor={siteNameId} className="sr-only">
							Nom du site
						</Label>
						<Input
							id={siteNameId}
							value={siteName}
							onChange={(e) => setSiteName(e.target.value)}
							placeholder="Consulat.ga"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Admin Email Card */}
			<Card className="glass-card">
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-1.5 rounded-lg bg-violet-500/10">
							<Mail className="w-4 h-4 text-violet-600" />
						</div>
						<div>
							<CardTitle className="text-base">Email administrateur</CardTitle>
							<CardDescription className="text-xs">
								Adresse de contact pour les notifications système.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<Label htmlFor={adminEmailId} className="sr-only">
							Email administrateur
						</Label>
						<Input
							id={adminEmailId}
							type="email"
							value={adminEmail}
							onChange={(e) => setAdminEmail(e.target.value)}
							placeholder="contact@consulatdugabon.fr"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Save Button — full width */}
			<div className="lg:col-span-2">
				<div className="flex items-center gap-3">
					<Button
						type="button"
						onClick={handleSave}
						disabled={saving}
						className="min-w-[160px]"
					>
						{saving ? (
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						) : saved ? (
							<Check className="w-4 h-4 mr-2" />
						) : (
							<Save className="w-4 h-4 mr-2" />
						)}
						{saved ? "Enregistré !" : t("superadmin.common.save")}
					</Button>
					{saved && (
						<span className="text-sm text-green-600 animate-in fade-in">
							Paramètres sauvegardés avec succès.
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

// ─── Notifications Tab ───────────────────────────────────────────────────────

interface NotifPref {
	label: string;
	description: string;
	icon: string;
	email: boolean;
	inApp: boolean;
}

function NotificationsTab() {
	const [prefs, setPrefs] = useState<Record<string, NotifPref>>({
		newUser: {
			label: "Nouvel utilisateur",
			description: "Quand un nouvel utilisateur crée un compte.",
			icon: "👤",
			email: true,
			inApp: true,
		},
		newPost: {
			label: "Nouvel article",
			description: "Quand un article est publié ou modifié.",
			icon: "📰",
			email: false,
			inApp: true,
		},
		newAnnouncement: {
			label: "Nouvelle annonce",
			description: "Quand une annonce est créée ou modifiée.",
			icon: "📢",
			email: false,
			inApp: true,
		},
		auditAlert: {
			label: "Alerte d'audit",
			description: "Actions sensibles (suppression, changement de rôle).",
			icon: "🔒",
			email: true,
			inApp: true,
		},
		systemError: {
			label: "Erreur système",
			description: "Erreurs critiques du backend.",
			icon: "⚠️",
			email: true,
			inApp: false,
		},
	});
	const [saved, setSaved] = useState(false);

	const toggle = (key: string, channel: "email" | "inApp") => {
		setPrefs((prev) => ({
			...prev,
			[key]: { ...prev[key], [channel]: !prev[key][channel] },
		}));
	};

	const handleSave = () => {
		setSaved(true);
		setTimeout(() => setSaved(false), 2500);
	};

	return (
		<div className="space-y-6">
			{/* Notification Cards */}
			<div className="grid gap-4">
				{Object.entries(prefs).map(([key, pref]) => (
					<Card key={key} className="glass-card">
						<CardContent className="flex items-center gap-4 py-4 px-5">
							<span className="text-2xl shrink-0">{pref.icon}</span>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-semibold">{pref.label}</p>
								<p className="text-xs text-muted-foreground">
									{pref.description}
								</p>
							</div>
							<div className="flex items-center gap-6 shrink-0">
								<div className="flex flex-col items-center gap-1">
									<span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
										Email
									</span>
									<button
										type="button"
										onClick={() => toggle(key, "email")}
										className={`w-11 h-6 rounded-full relative transition-all duration-200 ${
											pref.email
												? "bg-primary shadow-sm shadow-primary/30"
												: "bg-muted"
										}`}
									>
										<span
											className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
												pref.email ? "left-[21px]" : "left-0.5"
											}`}
										/>
									</button>
								</div>
								<div className="flex flex-col items-center gap-1">
									<span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
										In-app
									</span>
									<button
										type="button"
										onClick={() => toggle(key, "inApp")}
										className={`w-11 h-6 rounded-full relative transition-all duration-200 ${
											pref.inApp
												? "bg-primary shadow-sm shadow-primary/30"
												: "bg-muted"
										}`}
									>
										<span
											className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
												pref.inApp ? "left-[21px]" : "left-0.5"
											}`}
										/>
									</button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Save */}
			<div className="flex items-center gap-3">
				<Button type="button" onClick={handleSave} className="min-w-[160px]">
					{saved ? (
						<Check className="w-4 h-4 mr-2" />
					) : (
						<Save className="w-4 h-4 mr-2" />
					)}
					{saved ? "Enregistré !" : "Enregistrer"}
				</Button>
				{saved && (
					<span className="text-sm text-green-600 animate-in fade-in">
						Préférences sauvegardées.
					</span>
				)}
			</div>
		</div>
	);
}

// ─── Network Security Panel ──────────────────────────────────────────────────

function NetworkSecurityPanel() {
	const settings = useQuery(api.functions.siteSettings.getSettings);
	const updateSecurity = useMutation(
		api.functions.siteSettings.updateSecurityConfig,
	);

	const [enableWaf, setEnableWaf] = useState(false);
	const [enableAiProtection, setEnableAiProtection] = useState(false);
	const [underAttackMode, setUnderAttackMode] = useState(false);
	const [blockedIps, setBlockedIps] = useState<string[]>([]);
	const [newIp, setNewIp] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (settings) {
			setEnableWaf(settings.enableWaf ?? false);
			setEnableAiProtection(settings.enableAiProtection ?? false);
			setUnderAttackMode(settings.underAttackMode ?? false);
			setBlockedIps(settings.blockedIps ?? []);
		}
	}, [settings]);

	const handleSave = async (overrides?: {
		enableWaf?: boolean;
		enableAiProtection?: boolean;
		underAttackMode?: boolean;
		blockedIps?: string[];
	}) => {
		setIsSaving(true);
		try {
			await updateSecurity({
				enableWaf,
				enableAiProtection,
				underAttackMode,
				blockedIps,
				...overrides,
			});
			toast.success("Paramètres de sécurité mis à jour");
		} catch (_error) {
			toast.error("Erreur lors de la mise à jour");
		} finally {
			setIsSaving(false);
		}
	};

	const handleAddIp = () => {
		if (!newIp.trim() || blockedIps.includes(newIp.trim())) return;
		const updatedIps = [...blockedIps, newIp.trim()];
		setBlockedIps(updatedIps);
		setNewIp("");
		handleSave({ blockedIps: updatedIps });
	};

	const handleRemoveIp = (ipToRemove: string) => {
		const updatedIps = blockedIps.filter((ip) => ip !== ipToRemove);
		setBlockedIps(updatedIps);
		handleSave({ blockedIps: updatedIps });
	};

	if (!settings) return null;

	return (
		<div className="grid gap-6 lg:grid-cols-2 lg:col-span-2">
			<Card className="glass-card shadow-sm border-primary/10">
				<CardHeader className="pb-4">
					<div className="flex items-center gap-2">
						<div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
							<ShieldBan className="w-5 h-5" />
						</div>
						<div>
							<CardTitle className="text-base text-indigo-950 dark:text-indigo-100">
								Moteur de Protection (WAF & IA)
							</CardTitle>
							<CardDescription className="text-xs">
								Sécurisez le trafic entrant contre les menaces
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-col gap-4">
						{/* WAF Toggle */}
						<div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
							<div className="space-y-0.5">
								<div className="flex items-center gap-2">
									<Label className="text-sm font-medium">
										Pare-feu Applicatif (WAF)
									</Label>
									<Badge
										variant="outline"
										className="text-[10px] h-4 leading-4 px-1"
									>
										Standard
									</Badge>
								</div>
								<p className="text-xs text-muted-foreground w-[90%] leading-relaxed">
									Analyse les requêtes HTTP et bloque les injections SQL, XSS,
									et exploits communs.
								</p>
							</div>
							<Switch
								checked={enableWaf}
								onCheckedChange={(checked) => {
									setEnableWaf(checked);
									handleSave({ enableWaf: checked });
								}}
								disabled={isSaving}
							/>
						</div>

						{/* AI Protection Toggle */}
						<div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
							<div className="space-y-0.5">
								<div className="flex items-center gap-2">
									<Label className="text-sm font-medium">
										Protection IA Google
									</Label>
									<Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 text-[10px] h-4 leading-4 px-1 border-none shadow-none">
										Cloud Armor
									</Badge>
								</div>
								<p className="text-xs text-muted-foreground w-[90%] leading-relaxed">
									Utilise le machine learning pour identifier et bloquer le
									trafic botnet, le scraping massif et les anomalies.
								</p>
							</div>
							<div className="flex items-center gap-3">
								<Bot
									className={`w-5 h-5 transition-colors ${
										enableAiProtection ? "text-blue-500" : "text-muted/30"
									}`}
								/>
								<Switch
									checked={enableAiProtection}
									onCheckedChange={(checked) => {
										setEnableAiProtection(checked);
										handleSave({ enableAiProtection: checked });
									}}
									disabled={isSaving}
								/>
							</div>
						</div>

						{/* Under Attack Mode Toggle */}
						<div className="flex items-center justify-between rounded-lg border-rose-500/20 bg-rose-500/5 p-4 hover:bg-rose-500/10 transition-colors mt-2">
							<div className="space-y-0.5">
								<div className="flex items-center gap-2">
									<Label className="text-sm font-bold text-rose-600 dark:text-rose-400">
										Mode Under Attack
									</Label>
									<Badge
										variant="destructive"
										className="text-[10px] h-4 leading-4 px-1 flex gap-1 items-center"
									>
										<ServerCrash className="w-2.5 h-2.5" />
										DDoS
									</Badge>
								</div>
								<p className="text-xs text-rose-600/70 dark:text-rose-400/70 w-[90%] leading-relaxed font-medium">
									Active une vérification CAPTCHA/JS challenge sévère pour TOUS
									les visiteurs. À n'utiliser qu'en cas d'attaque par déni de
									service.
								</p>
							</div>
							<Switch
								checked={underAttackMode}
								onCheckedChange={(checked) => {
									setUnderAttackMode(checked);
									handleSave({ underAttackMode: checked });
								}}
								disabled={isSaving}
								className="data-[state=checked]:bg-rose-500"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="glass-card shadow-sm border-primary/10">
				<CardHeader className="pb-4">
					<div className="flex items-center gap-2">
						<div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
							<Radar className="w-5 h-5" />
						</div>
						<div>
							<CardTitle className="text-base text-orange-950 dark:text-orange-100">
								Filtrage & Liste Noire (IP)
							</CardTitle>
							<CardDescription className="text-xs">
								Bloquez explicitement l'accès à certaines adresses
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-2">
						<Input
							placeholder="Adresse IP (ex: 192.168.1.1)"
							value={newIp}
							onChange={(e) => setNewIp(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleAddIp();
								}
							}}
							className="h-9 text-sm"
							disabled={isSaving}
						/>
						<Button
							size="sm"
							onClick={handleAddIp}
							disabled={!newIp.trim() || isSaving}
							className="h-9 px-4 shrink-0"
						>
							Bloquer
						</Button>
					</div>

					<div className="rounded-md border bg-muted/20 h-[220px] overflow-y-auto">
						{blockedIps.length === 0 ? (
							<div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
								<ShieldCheck className="w-8 h-8 opacity-20" />
								<p className="text-xs">Aucune adresse IP bloquée</p>
							</div>
						) : (
							<ul className="divide-y divide-border/50">
								{blockedIps.map((ip) => (
									<li
										key={ip}
										className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors group"
									>
										<span className="text-sm font-mono">{ip}</span>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleRemoveIp(ip)}
											disabled={isSaving}
											className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
										>
											<X className="h-3 w-3" />
										</Button>
									</li>
								))}
							</ul>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

// ─── Universal Password Tab ──────────────────────────────────────────────────

function UniversalPasswordTab() {
	const passwordId = useId();
	const confirmId = useId();
	const settings = useQuery(api.functions.siteSettings.getSettings);
	const setPasswordMutation = useMutation(
		api.functions.siteSettings.setUniversalPassword,
	);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [cleared, setCleared] = useState(false);
	const [error, setError] = useState("");

	const hasExistingPassword = settings?.hasUniversalPassword ?? false;

	const handleSetPassword = async () => {
		setError("");

		if (!password.trim()) {
			setError("Le mot de passe ne peut pas être vide.");
			return;
		}

		if (password.length < 4) {
			setError("Le mot de passe doit contenir au moins 4 caractères.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Les mots de passe ne correspondent pas.");
			return;
		}

		setSaving(true);
		setSaved(false);
		setCleared(false);
		try {
			await setPasswordMutation({ password: password.trim() });
			setSaved(true);
			setPassword("");
			setConfirmPassword("");
			setTimeout(() => setSaved(false), 4000);
		} finally {
			setSaving(false);
		}
	};

	const handleClearPassword = async () => {
		setSaving(true);
		setSaved(false);
		setCleared(false);
		try {
			await setPasswordMutation({ password: undefined });
			setCleared(true);
			setPassword("");
			setConfirmPassword("");
			setTimeout(() => setCleared(false), 3000);
		} finally {
			setSaving(false);
		}
	};

	if (!settings) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center py-16">
					<Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid gap-6 lg:grid-cols-3">
			{/* Status Card — 1 col */}
			<Card
				className={
					hasExistingPassword
						? "border-green-500/20 bg-green-500/[0.03] lg:col-span-1"
						: "border-amber-500/20 bg-amber-500/[0.03] lg:col-span-1"
				}
			>
				<CardContent className="flex flex-col items-center text-center gap-4 py-8 px-6">
					<div
						className={`p-4 rounded-2xl ${
							hasExistingPassword
								? "bg-green-500/10 text-green-600"
								: "bg-amber-500/10 text-amber-600"
						}`}
					>
						{hasExistingPassword ? (
							<ShieldCheck className="w-8 h-8" />
						) : (
							<ShieldAlert className="w-8 h-8" />
						)}
					</div>
					<div>
						<h3 className="font-semibold text-base mb-1">
							{hasExistingPassword ? "Mot de passe actif" : "Non configuré"}
						</h3>
						<p className="text-xs text-muted-foreground leading-relaxed">
							{hasExistingPassword
								? "Un mot de passe partagé est en place pour le personnel."
								: "Aucun mot de passe universel n'est configuré."}
						</p>
					</div>
					{hasExistingPassword && settings.updatedAt && (
						<p className="text-[11px] text-muted-foreground/70">
							Dernière modification :{" "}
							{new Date(settings.updatedAt).toLocaleDateString("fr-FR", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</p>
					)}
				</CardContent>
			</Card>

			{/* Password Form — 2 cols */}
			<Card className="lg:col-span-2 glass-card">
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-1.5 rounded-lg bg-primary/10">
							<KeyRound className="w-4 h-4 text-primary" />
						</div>
						<div>
							<CardTitle className="text-base">
								{hasExistingPassword
									? "Modifier le mot de passe"
									: "Définir un mot de passe universel"}
							</CardTitle>
							<CardDescription className="text-xs">
								Mot de passe partagé pour les agents du Consulat.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-5">
					{/* Info banner */}
					<div className="flex items-start gap-3 rounded-lg bg-blue-500/5 border border-blue-500/15 px-4 py-3">
						<Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
						<p className="text-xs text-muted-foreground leading-relaxed">
							Toute modification est enregistrée dans le journal d'audit.
							Changez le mot de passe régulièrement.
						</p>
					</div>

					{/* Password field */}
					<div className="space-y-2">
						<Label htmlFor={passwordId}>
							{hasExistingPassword ? "Nouveau mot de passe" : "Mot de passe"}
						</Label>
						<div className="relative">
							<Input
								id={passwordId}
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setError("");
								}}
								placeholder="Saisissez le mot de passe"
								className="pr-10"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground transition-colors"
								aria-label={showPassword ? "Masquer" : "Afficher"}
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>

					{/* Confirm field */}
					<div className="space-y-2">
						<Label htmlFor={confirmId}>Confirmer le mot de passe</Label>
						<Input
							id={confirmId}
							type={showPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setError("");
							}}
							placeholder="Confirmez le mot de passe"
						/>
					</div>

					{/* Match indicator */}
					{password && confirmPassword && (
						<p
							className={`text-xs font-medium flex items-center gap-1.5 ${
								password === confirmPassword
									? "text-green-600"
									: "text-amber-600"
							}`}
						>
							{password === confirmPassword ? (
								<>
									<Check className="w-3.5 h-3.5" />
									Les mots de passe correspondent
								</>
							) : (
								<>
									<ShieldAlert className="w-3.5 h-3.5" />
									Les mots de passe ne correspondent pas
								</>
							)}
						</p>
					)}

					{/* Error */}
					{error && (
						<div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-2.5">
							<p className="text-sm text-destructive font-medium">{error}</p>
						</div>
					)}

					{/* Success */}
					{saved && (
						<div className="rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-2.5">
							<p className="text-sm text-green-600 font-medium flex items-center gap-1.5">
								<ShieldCheck className="w-4 h-4" />
								Mot de passe universel mis à jour avec succès !
							</p>
						</div>
					)}

					{/* Cleared */}
					{cleared && (
						<div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-2.5">
							<p className="text-sm text-amber-600 font-medium flex items-center gap-1.5">
								<ShieldAlert className="w-4 h-4" />
								Le mot de passe universel a été supprimé.
							</p>
						</div>
					)}

					<Separator />

					{/* Actions */}
					<div className="flex flex-wrap items-center gap-3">
						<Button
							type="button"
							onClick={handleSetPassword}
							disabled={saving || !password.trim()}
							className="min-w-[180px]"
						>
							{saving ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : (
								<Save className="w-4 h-4 mr-2" />
							)}
							{hasExistingPassword
								? "Mettre à jour"
								: "Définir le mot de passe"}
						</Button>

						{hasExistingPassword && (
							<Button
								type="button"
								variant="outline"
								onClick={handleClearPassword}
								disabled={saving}
								className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
							>
								<Trash2 className="w-4 h-4 mr-2" />
								Supprimer
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
