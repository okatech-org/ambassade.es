import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { Link } from "@tanstack/react-router";
import { useConvex, useMutation, useQuery } from "convex/react";
import {
	ChevronDown,
	ChevronRight,
	Clock,
	Edit3,
	ExternalLink,
	Eye,
	EyeOff,
	Image as ImageIcon,
	Layers,
	Loader2,
	type LucideIcon,
	Monitor,
	RotateCcw,
	Save,
	Smartphone,
	Type,
	Upload,
	X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	COLOR_MAP,
	FIELD_ICON,
	type FieldDef,
	LAYOUT_SECTION_IDS,
	type PageDef,
	type SectionDef,
} from "@/config/pages";
import { useAuthenticatedConvexQuery } from "@/integrations/convex/hooks";

export function PageManagementView({
	page,
	previewMode,
	onSwitchPreviewMode,
}: {
	page: PageDef;
	previewMode?: "desktop" | "mobile";
	onSwitchPreviewMode?: (mode: "desktop" | "mobile") => void;
}) {
	const pageContent = useQuery(api.functions.inlineContent.getPageContent, {
		pagePath: page.publicPath,
	});
	const sectionVisData = useQuery(
		api.functions.sectionVisibility.getPageSectionVisibility,
		{ pagePath: page.publicPath },
	);
	const { data: pageViews } = useAuthenticatedConvexQuery(
		api.functions.analytics.getTopPages,
		{ limit: 50 },
	);

	const isAccueil = page.slug === "accueil";

	const contentPending = pageContent === undefined;
	const contentItems = pageContent ?? [];

	const pageStats = (pageViews ?? []).find((p) => p.path === page.publicPath);
	const viewCount = pageStats?.viewCount ?? 0;
	const lastViewed = pageStats?.lastViewedAt;

	// Content lookup
	const contentMap = new Map<string, { value: string; defaultValue: string }>();
	for (const item of contentItems) {
		contentMap.set(item.contentKey, {
			value: item.value,
			defaultValue: item.defaultValue,
		});
	}

	// Dynamic fields by section
	const dynamicFieldsBySection = new Map<string, typeof contentItems>();
	for (const item of contentItems) {
		const arr = dynamicFieldsBySection.get(item.sectionId) ?? [];
		arr.push(item);
		dynamicFieldsBySection.set(item.sectionId, arr);
	}

	const editedCount = contentItems.filter(
		(c) => c.value !== c.defaultValue,
	).length;
	const totalFields = contentItems.length;
	const Icon = page.icon;
	const colors = COLOR_MAP[page.color] ?? COLOR_MAP.blue;

	return (
		<div className="flex flex-1 flex-col gap-5 p-4 md:p-6 pt-5">
			{/* ─── Header ──────────────────────────────────────────── */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}>
						<Icon className="w-5 h-5" />
					</div>
					<div>
						<h1 className="text-xl md:text-2xl font-bold tracking-tight">
							{page.title}
						</h1>
						<p className="text-xs text-muted-foreground">{page.description}</p>
					</div>
				</div>
				<Button asChild size="sm" className="gap-2 shadow-sm">
					<a href={page.publicPath} target="_blank" rel="noopener noreferrer">
						<Eye className="w-3.5 h-3.5" />
						Voir la page
						<ExternalLink className="w-3 h-3 opacity-60" />
					</a>
				</Button>
			</div>

			{/* ─── Compact Stats ───────────────────────────────────── */}
			<div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
				<MiniStat
					icon={Eye}
					label="Vues"
					value={viewCount.toLocaleString("fr-FR")}
					color="blue"
				/>
				<MiniStat
					icon={Layers}
					label="Champs"
					value={contentPending ? "…" : String(totalFields)}
					color="green"
				/>
				<MiniStat
					icon={Edit3}
					label="Modifiés"
					value={contentPending ? "…" : String(editedCount)}
					color="amber"
				/>
				<MiniStat
					icon={Clock}
					label="Dernière vue"
					value={
						lastViewed
							? new Date(lastViewed).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "short",
								})
							: "—"
					}
					color="violet"
				/>
			</div>

			{/* ─── Device Tab Switcher ─────────────────────────────── */}
			<div className="flex items-center gap-1 p-1 bg-muted/60 rounded-lg border border-border/40">
				<button
					type="button"
					onClick={() => onSwitchPreviewMode?.("desktop")}
					className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
						previewMode === "desktop" || !previewMode
							? "bg-background shadow-sm text-foreground"
							: "text-muted-foreground hover:text-foreground hover:bg-background/50"
					}`}
				>
					<Monitor className="w-4 h-4" />
					Ordinateur
				</button>
				<button
					type="button"
					onClick={() => onSwitchPreviewMode?.("mobile")}
					className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
						previewMode === "mobile"
							? "bg-background shadow-sm text-foreground"
							: "text-muted-foreground hover:text-foreground hover:bg-background/50"
					}`}
				>
					<Smartphone className="w-4 h-4" />
					Mobile
				</button>
			</div>

			{/* ─── Sections ────────────────────────────────────────── */}
			<div className="space-y-2">
				{page.sections.map((section) => {
					// Filter out sections that don't match the active preview mode
					if (
						previewMode &&
						section.viewport &&
						section.viewport !== "all" &&
						section.viewport !== previewMode
					) {
						return null;
					}

					const isLayoutSection = LAYOUT_SECTION_IDS.has(section.id);
					const isHidden =
						sectionVisData?.some((s) => {
							if (s.sectionId !== section.id) return false;
							if (previewMode === "desktop" && s.hiddenDesktop !== undefined)
								return s.hiddenDesktop;
							if (previewMode === "mobile" && s.hiddenMobile !== undefined)
								return s.hiddenMobile;
							return s.hidden ?? false;
						}) ?? false;

					const predefinedKeys = new Set(
						section.fields.map((f) => f.contentKey),
					);
					const dynamicItems = (
						dynamicFieldsBySection.get(section.id) ?? []
					).filter((item) => !predefinedKeys.has(item.contentKey));

					return (
						<CompactSection
							key={section.id}
							section={section}
							pagePath={page.publicPath}
							contentMap={contentMap}
							dynamicItems={dynamicItems}
							contentPending={contentPending}
							isAccueil={isAccueil}
							isLayoutSection={isLayoutSection}
							isHidden={isHidden}
							previewMode={previewMode}
						/>
					);
				})}
			</div>
		</div>
	);
}

// ── Compact collapsible section ──────────────────────────────────────────────

type ContentEntry = { value: string; defaultValue: string };

function CompactSection({
	section,
	pagePath,
	contentMap,
	dynamicItems,
	contentPending,
	isAccueil,
	isLayoutSection,
	isHidden,
	previewMode,
}: {
	section: SectionDef;
	pagePath: string;
	contentMap: Map<string, ContentEntry>;
	dynamicItems: Array<{
		_id: string;
		contentKey: string;
		sectionId: string;
		fieldType: string;
		value: string;
		defaultValue: string;
	}>;
	contentPending: boolean;
	isAccueil: boolean;
	isLayoutSection: boolean;
	isHidden: boolean;
	previewMode?: "desktop" | "mobile";
}) {
	const [open, setOpen] = useState(false);
	const toggleVisibility = useMutation(
		api.functions.sectionVisibility.toggleSectionVisibility,
	);
	const allFieldCount = section.fields.length + dynamicItems.length;
	const modifiedCount =
		section.fields.filter((f) => {
			const stored = contentMap.get(f.contentKey);
			return stored && stored.value !== stored.defaultValue;
		}).length + dynamicItems.filter((d) => d.value !== d.defaultValue).length;

	const SectionIcon = section.icon;

	// ── Layout section on a non-accueil page → grayed-out, non-interactive ──
	if (isLayoutSection && !isAccueil) {
		return (
			<div className="w-full flex items-center gap-3 rounded-lg border border-dashed border-border/50 bg-muted/30 px-4 py-3 opacity-50 cursor-default select-none">
				<SectionIcon className="w-4 h-4 text-muted-foreground shrink-0" />
				<div className="flex-1 min-w-0">
					<span className="text-sm font-medium text-muted-foreground">
						{section.label}
					</span>
					<span className="text-xs text-muted-foreground/60 ml-2 hidden sm:inline">
						{section.description}
					</span>
				</div>
				<Badge
					variant="outline"
					className="text-[10px] shrink-0 border-muted-foreground/20 text-muted-foreground/60"
				>
					<Link
						to="/admin/pages/$slug"
						params={{ slug: "accueil" }}
						className="hover:underline"
					>
						Géré dans Accueil
					</Link>
				</Badge>
			</div>
		);
	}

	// ── Handle visibility toggle ──
	const handleToggleVisibility = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			await toggleVisibility({
				pagePath,
				sectionId: section.id,
				hidden: !isHidden,
				device: previewMode,
			});
			toast.success(
				isHidden
					? `Section « ${section.label} » affichée ${previewMode ? `(${previewMode})` : ""}`
					: `Section « ${section.label} » masquée ${previewMode ? `(${previewMode})` : ""}`,
			);
		} catch {
			toast.error("Erreur lors du changement de visibilité");
		}
	};

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger asChild>
				<div
					className={`w-full flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-left hover:bg-accent/50 transition-colors ${isHidden ? "opacity-50" : ""} cursor-pointer`}
				>
					<SectionIcon className="w-4 h-4 text-muted-foreground shrink-0" />
					<div className="flex-1 min-w-0">
						<span className="text-sm font-medium">{section.label}</span>
						<span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
							{section.description}
						</span>
					</div>

					{/* ── Visibility toggle (not for layout sections) ── */}
					{!isLayoutSection && (
						<button
							type="button"
							onClick={handleToggleVisibility}
							className={`p-1 rounded-md transition-colors shrink-0 cursor-pointer relative ${
								isHidden
									? "text-muted-foreground/40 hover:text-orange-500 hover:bg-orange-500/10"
									: "text-muted-foreground hover:text-green-600 hover:bg-green-500/10"
							}`}
							title={
								isHidden
									? "Section masquée — cliquer pour afficher" +
										(previewMode ? ` sur ${previewMode}` : "")
									: "Section visible — cliquer pour masquer" +
										(previewMode ? ` sur ${previewMode}` : "")
							}
						>
							{isHidden ? (
								<>
									<EyeOff className="w-3.5 h-3.5" />
									{previewMode && (
										<span className="absolute -bottom-1 -right-1 text-[8px] opacity-60">
											{previewMode === "desktop" ? "D" : "M"}
										</span>
									)}
								</>
							) : (
								<>
									<Eye className="w-3.5 h-3.5" />
									{previewMode && (
										<span className="absolute -bottom-1 -right-1 text-[8px] opacity-60">
											{previewMode === "desktop" ? "D" : "M"}
										</span>
									)}
								</>
							)}
						</button>
					)}

					{isHidden ? (
						<Badge
							variant="outline"
							className="text-[10px] shrink-0 border-orange-200 text-orange-500 dark:border-orange-800"
						>
							Masquée
						</Badge>
					) : allFieldCount > 0 ? (
						<Badge
							variant="secondary"
							className={`text-[10px] shrink-0 ${
								modifiedCount > 0
									? "bg-amber-500/10 text-amber-600"
									: "bg-green-500/10 text-green-600"
							}`}
						>
							{modifiedCount > 0
								? `${modifiedCount}/${allFieldCount} modifié`
								: `${allFieldCount} champ${allFieldCount > 1 ? "s" : ""}`}
						</Badge>
					) : (
						<Badge variant="outline" className="text-[10px] shrink-0">
							auto
						</Badge>
					)}
					{open ? (
						<ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
					) : (
						<ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
					)}
				</div>
			</CollapsibleTrigger>

			<CollapsibleContent>
				<div className="ml-6 border-l border-border/60 pl-3 py-1 space-y-0.5">
					{contentPending ? (
						<Skeleton className="h-7 w-full rounded" />
					) : (
						<>
							{section.fields.map((field) => {
								const stored = contentMap.get(field.contentKey);
								return (
									<FieldEditor
										key={field.contentKey}
										contentKey={field.contentKey}
										label={field.label}
										fieldType={field.fieldType}
										currentValue={stored?.value ?? field.defaultValue}
										defaultValue={field.defaultValue}
										pagePath={pagePath}
										sectionId={section.id}
										isModified={
											stored ? stored.value !== stored.defaultValue : false
										}
									/>
								);
							})}
							{dynamicItems.map((item) => (
								<FieldEditor
									key={item.contentKey}
									contentKey={item.contentKey}
									label={prettifyKey(item.contentKey)}
									fieldType={item.fieldType as FieldDef["fieldType"]}
									currentValue={item.value}
									defaultValue={item.defaultValue}
									pagePath={pagePath}
									sectionId={section.id}
									isModified={item.value !== item.defaultValue}
								/>
							))}
							{section.fields.length === 0 && dynamicItems.length === 0 && (
								<p className="text-[11px] text-muted-foreground py-1 pl-1">
									Contenu dynamique
								</p>
							)}
						</>
					)}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

// ── Field Editor — ultra-compact single-row ──────────────────────────────────

function FieldEditor({
	contentKey,
	label,
	fieldType,
	currentValue,
	defaultValue,
	pagePath,
	sectionId,
	isModified,
}: {
	contentKey: string;
	label: string;
	fieldType: FieldDef["fieldType"];
	currentValue: string;
	defaultValue: string;
	pagePath: string;
	sectionId: string;
	isModified: boolean;
}) {
	const [editing, setEditing] = useState(false);
	const [localValue, setLocalValue] = useState(currentValue);
	const [saving, setSaving] = useState(false);
	const updateContent = useMutation(api.functions.inlineContent.updateContent);
	const resetContent = useMutation(api.functions.inlineContent.resetContent);
	const FieldIcon = FIELD_ICON[fieldType] ?? Type;

	const handleSave = useCallback(async () => {
		if (localValue === currentValue) {
			setEditing(false);
			return;
		}
		setSaving(true);
		try {
			await updateContent({
				contentKey,
				pagePath,
				sectionId,
				fieldType,
				value: localValue,
				defaultValue,
			});
			toast.success("Enregistré");
			setEditing(false);
		} catch {
			toast.error("Erreur");
		} finally {
			setSaving(false);
		}
	}, [
		localValue,
		currentValue,
		updateContent,
		contentKey,
		pagePath,
		sectionId,
		fieldType,
		defaultValue,
	]);

	const handleReset = useCallback(async () => {
		setSaving(true);
		try {
			await resetContent({ contentKey });
			setLocalValue(defaultValue);
			toast.success("Réinitialisé");
			setEditing(false);
		} catch {
			toast.error("Erreur");
		} finally {
			setSaving(false);
		}
	}, [resetContent, contentKey, defaultValue]);

	const handleCancel = useCallback(() => {
		setLocalValue(currentValue);
		setEditing(false);
	}, [currentValue]);

	if (fieldType === "image") {
		return (
			<ImageFieldEditor
				contentKey={contentKey}
				label={label}
				currentValue={currentValue}
				defaultValue={defaultValue}
				pagePath={pagePath}
				sectionId={sectionId}
				isModified={isModified}
			/>
		);
	}

	// ── Editing mode: input replaces the value ──
	if (editing) {
		return (
			<div className="flex items-center gap-2 py-1 group">
				<FieldIcon className="w-3 h-3 text-muted-foreground shrink-0" />
				<span className="text-[11px] font-medium text-muted-foreground w-24 shrink-0 truncate">
					{label}
				</span>
				{fieldType === "richtext" || currentValue.length > 80 ? (
					<Textarea
						value={localValue}
						onChange={(e) => setLocalValue(e.target.value)}
						className="text-xs min-h-[48px] flex-1"
						disabled={saving}
						autoFocus
					/>
				) : (
					<Input
						value={localValue}
						onChange={(e) => setLocalValue(e.target.value)}
						className="text-xs h-7 flex-1"
						disabled={saving}
						autoFocus
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSave();
							if (e.key === "Escape") handleCancel();
						}}
					/>
				)}
				<div className="flex items-center gap-0.5 shrink-0">
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0"
						onClick={handleCancel}
						disabled={saving}
					>
						<X className="w-3 h-3" />
					</Button>
					{isModified && (
						<Button
							variant="ghost"
							size="sm"
							className="h-6 w-6 p-0"
							onClick={handleReset}
							disabled={saving}
						>
							<RotateCcw className="w-3 h-3" />
						</Button>
					)}
					<Button
						size="sm"
						className="h-6 text-[11px] px-2 gap-1"
						onClick={handleSave}
						disabled={saving}
					>
						{saving ? (
							<Loader2 className="w-2.5 h-2.5 animate-spin" />
						) : (
							<Save className="w-2.5 h-2.5" />
						)}{" "}
						OK
					</Button>
				</div>
			</div>
		);
	}

	// ── Display mode: single compact row ──
	return (
		<button
			type="button"
			className={`w-full flex items-center gap-2 py-1.5 px-1 rounded-sm cursor-pointer hover:bg-accent/40 transition-colors group text-left ${
				isModified ? "bg-amber-50/40 dark:bg-amber-950/10" : ""
			}`}
			onClick={() => setEditing(true)}
			title="Cliquer pour modifier"
		>
			<FieldIcon className="w-3 h-3 text-muted-foreground shrink-0" />
			<span className="text-[11px] font-medium text-muted-foreground w-24 shrink-0 truncate">
				{label}
			</span>
			<span
				className={`text-xs flex-1 truncate ${isModified ? "text-amber-700 dark:text-amber-400" : "text-foreground/80"}`}
			>
				{currentValue || (
					<span className="italic text-muted-foreground">Vide</span>
				)}
			</span>
			{isModified && (
				<span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
			)}
			<Edit3 className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
		</button>
	);
}

// ── Image field — compact inline thumbnail ───────────────────────────────────

function ImageFieldEditor({
	contentKey,
	label,
	currentValue,
	defaultValue,
	pagePath,
	sectionId,
	isModified,
}: {
	contentKey: string;
	label: string;
	currentValue: string;
	defaultValue: string;
	pagePath: string;
	sectionId: string;
	isModified: boolean;
}) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const convex = useConvex();
	const generateUploadUrl = useMutation(api.functions.files.generateUploadUrl);
	const updateContent = useMutation(api.functions.inlineContent.updateContent);
	const resetContent = useMutation(api.functions.inlineContent.resetContent);
	const [isUploading, setIsUploading] = useState(false);

	const handleUpload = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;
			if (!file.type.startsWith("image/")) {
				toast.error("Format image requis");
				return;
			}
			if (file.size > 10 * 1024 * 1024) {
				toast.error("Max 10 Mo");
				return;
			}
			setIsUploading(true);
			try {
				const postUrl = await generateUploadUrl();
				const res = await fetch(postUrl, {
					method: "POST",
					headers: { "Content-Type": file.type },
					body: file,
				});
				if (!res.ok) throw new Error("Upload failed");
				const { storageId } = (await res.json()) as {
					storageId: Id<"_storage">;
				};
				const fileUrl = await convex.query(api.functions.files.getFileUrl, {
					storageId,
				});
				if (!fileUrl) throw new Error("URL resolution failed");
				await updateContent({
					contentKey,
					pagePath,
					sectionId,
					fieldType: "image",
					value: fileUrl,
					defaultValue,
				});
				toast.success("Image mise à jour");
			} catch {
				toast.error("Échec");
			} finally {
				setIsUploading(false);
				if (fileInputRef.current) fileInputRef.current.value = "";
			}
		},
		[
			generateUploadUrl,
			convex,
			updateContent,
			contentKey,
			pagePath,
			sectionId,
			defaultValue,
		],
	);

	const handleReset = useCallback(async () => {
		try {
			await resetContent({ contentKey });
			toast.success("Réinitialisé");
		} catch {
			toast.error("Erreur");
		}
	}, [resetContent, contentKey]);

	return (
		<div
			className={`flex items-center gap-2 py-1.5 px-1 rounded-sm ${isModified ? "bg-amber-50/40 dark:bg-amber-950/10" : ""}`}
		>
			<ImageIcon className="w-3 h-3 text-muted-foreground shrink-0" />
			<span className="text-[11px] font-medium text-muted-foreground w-24 shrink-0 truncate">
				{label}
			</span>
			<div className="rounded overflow-hidden border bg-muted/30 h-10 w-20 shrink-0">
				<img
					src={currentValue}
					alt={label}
					className="w-full h-full object-cover"
				/>
			</div>
			{isModified && (
				<span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
			)}
			<div className="flex-1" />
			<div className="flex items-center gap-0.5 shrink-0">
				{isModified && (
					<Button
						variant="ghost"
						size="sm"
						className="h-6 text-[11px] px-1.5"
						onClick={handleReset}
					>
						<RotateCcw className="w-2.5 h-2.5" />
					</Button>
				)}
				<Button
					variant="outline"
					size="sm"
					className="h-6 text-[11px] px-2 gap-1"
					onClick={() => fileInputRef.current?.click()}
					disabled={isUploading}
				>
					{isUploading ? (
						<Loader2 className="w-2.5 h-2.5 animate-spin" />
					) : (
						<Upload className="w-2.5 h-2.5" />
					)}
					{isUploading ? "…" : "Changer"}
				</Button>
			</div>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleUpload}
				className="hidden"
				disabled={isUploading}
			/>
		</div>
	);
}

// ── Mini stat card ───────────────────────────────────────────────────────────

function MiniStat({
	icon: Icon,
	label,
	value,
	color,
}: {
	icon: LucideIcon;
	label: string;
	value: string;
	color: string;
}) {
	const c = COLOR_MAP[color] ?? COLOR_MAP.blue;
	return (
		<div className="flex items-center gap-2.5 rounded-lg border bg-card p-3">
			<div className={`p-1.5 rounded-md ${c.bg} ${c.text}`}>
				<Icon className="w-3.5 h-3.5" />
			</div>
			<div>
				<p className="text-[11px] text-muted-foreground leading-none mb-0.5">
					{label}
				</p>
				<p className="text-base font-bold leading-none">{value}</p>
			</div>
		</div>
	);
}

function prettifyKey(key: string): string {
	const last = key.split(".").pop() ?? key;
	return last
		.replace(/([A-Z])/g, " $1")
		.replace(/[_-]/g, " ")
		.trim()
		.replace(/^\w/, (c) => c.toUpperCase());
}
