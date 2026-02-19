import {
	Bold,
	Italic,
	Palette,
	Sparkles,
	Type,
	Underline,
	Undo,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface InlineEditToolbarProps {
	/** The contentEditable element being edited */
	anchorEl: HTMLElement | null;
	/** Called when user clicks "undo all" */
	onReset?: () => void;
}

const FONT_SIZES = [
	"12px",
	"14px",
	"16px",
	"18px",
	"20px",
	"24px",
	"28px",
	"32px",
	"40px",
	"48px",
];

const COLORS = [
	"#000000",
	"#333333",
	"#666666",
	"#999999",
	"#ffffff",
	"#1a5dab",
	"#2563eb",
	"#3b82f6",
	"#60a5fa",
	"#dc2626",
	"#ef4444",
	"#f97316",
	"#eab308",
	"#16a34a",
	"#22c55e",
	"#06b6d4",
	"#8b5cf6",
];

/** Predefined text style presets matching the site's existing design */
const TEXT_STYLE_PRESETS = [
	{
		label: "Gradient Bleu",
		preview: "linear-gradient(135deg, #1a5dab 0%, #4285f4 50%, #1a5dab 100%)",
		style: {
			background:
				"linear-gradient(135deg, #1a5dab 0%, #4285f4 50%, #1a5dab 100%)",
			backgroundSize: "200% auto",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
		} as Record<string, string>,
	},
	{
		label: "Gradient Bleu-Vert",
		preview: "linear-gradient(135deg, #1a5dab 0%, #34a853 100%)",
		style: {
			background: "linear-gradient(135deg, #1a5dab 0%, #34a853 100%)",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
		} as Record<string, string>,
	},
	{
		label: "Gradient Violet",
		preview: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #7c3aed 100%)",
		style: {
			background:
				"linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #7c3aed 100%)",
			backgroundSize: "200% auto",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
		} as Record<string, string>,
	},
	{
		label: "Gradient Or",
		preview: "linear-gradient(135deg, #b45309 0%, #eab308 50%, #b45309 100%)",
		style: {
			background:
				"linear-gradient(135deg, #b45309 0%, #eab308 50%, #b45309 100%)",
			backgroundSize: "200% auto",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
		} as Record<string, string>,
	},
	{
		label: "Gradient Rouge",
		preview: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)",
		style: {
			background: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
		} as Record<string, string>,
	},
	{
		label: "Gradient Gabon",
		preview: "linear-gradient(135deg, #009e60 0%, #fcd116 50%, #3a75c4 100%)",
		style: {
			background:
				"linear-gradient(135deg, #009e60 0%, #fcd116 50%, #3a75c4 100%)",
			backgroundSize: "200% auto",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
		} as Record<string, string>,
	},
	{
		label: "Normal",
		preview: "none",
		style: {
			background: "none",
			WebkitBackgroundClip: "unset",
			backgroundClip: "unset",
			WebkitTextFillColor: "unset",
			backgroundSize: "unset",
			color: "inherit",
		} as Record<string, string>,
	},
];

/** Current formatting state of the selection / block */
interface FormatState {
	isBold: boolean;
	isItalic: boolean;
	isUnderline: boolean;
	color: string;
	fontSize: string;
	fontFamily: string;
}

/** Convert an rgb(r, g, b) string to hex */
function rgbToHex(rgb: string): string {
	const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	if (!match) return rgb;
	const r = Number.parseInt(match[1], 10).toString(16).padStart(2, "0");
	const g = Number.parseInt(match[2], 10).toString(16).padStart(2, "0");
	const b = Number.parseInt(match[3], 10).toString(16).padStart(2, "0");
	return `#${r}${g}${b}`;
}

/** Read the current formatting from the selection/element */
function readFormatState(el: HTMLElement | null): FormatState {
	const defaults: FormatState = {
		isBold: false,
		isItalic: false,
		isUnderline: false,
		color: "#000000",
		fontSize: "16px",
		fontFamily: "Inter Variable",
	};
	if (!el) return defaults;

	// Read command states (selection-aware)
	try {
		defaults.isBold = document.queryCommandState("bold");
		defaults.isItalic = document.queryCommandState("italic");
		defaults.isUnderline = document.queryCommandState("underline");
	} catch {
		/* ignore */
	}

	// Read from computed style of the element (block defaults)
	const computed = window.getComputedStyle(el);
	defaults.color = rgbToHex(computed.color);
	defaults.fontSize = computed.fontSize;
	defaults.fontFamily = computed.fontFamily
		.split(",")[0]
		.replace(/['"]/g, "")
		.trim();

	// Check bold from computed if queryCommandState didn't detect it
	const fw = Number.parseInt(computed.fontWeight, 10);
	if (fw >= 700 || computed.fontWeight === "bold") {
		defaults.isBold = true;
	}
	if (computed.fontStyle === "italic") {
		defaults.isItalic = true;
	}
	if (computed.textDecorationLine.includes("underline")) {
		defaults.isUnderline = true;
	}

	// Override with selection-specific computed style
	const sel = window.getSelection();
	if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
		const range = sel.getRangeAt(0);
		let node: Node | null = range.startContainer;
		if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
		if (node && node instanceof HTMLElement) {
			const nodeComputed = window.getComputedStyle(node);
			defaults.color = rgbToHex(nodeComputed.color);
			defaults.fontSize = nodeComputed.fontSize;
			defaults.fontFamily = nodeComputed.fontFamily
				.split(",")[0]
				.replace(/['"]/g, "")
				.trim();
			const nfw = Number.parseInt(nodeComputed.fontWeight, 10);
			defaults.isBold = nfw >= 700 || nodeComputed.fontWeight === "bold";
			defaults.isItalic = nodeComputed.fontStyle === "italic";
			defaults.isUnderline =
				nodeComputed.textDecorationLine.includes("underline");
		}
	}

	return defaults;
}

export function InlineEditToolbar({
	anchorEl,
	onReset,
}: InlineEditToolbarProps) {
	const toolbarRef = useRef<HTMLDivElement>(null);
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [showSizePicker, setShowSizePicker] = useState(false);
	const [showStylePicker, setShowStylePicker] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const [fmt, setFmt] = useState<FormatState>(() => readFormatState(anchorEl));

	// Position toolbar above the anchor element
	useEffect(() => {
		if (!anchorEl || !toolbarRef.current) return;
		const rect = anchorEl.getBoundingClientRect();
		const toolbarHeight = toolbarRef.current.offsetHeight;
		setPosition({
			top: rect.top - toolbarHeight - 8 + window.scrollY,
			left: Math.max(8, rect.left + window.scrollX),
		});
	}, [anchorEl]);

	// Read initial format state from the block
	useEffect(() => {
		if (anchorEl) setFmt(readFormatState(anchorEl));
	}, [anchorEl]);

	// Listen for selection changes to update format state in real-time
	useEffect(() => {
		if (!anchorEl) return;
		const update = () => setFmt(readFormatState(anchorEl));

		// Selection change (user selects text or moves cursor)
		document.addEventListener("selectionchange", update);
		// Also listen for key events (typing changes cursor position)
		anchorEl.addEventListener("keyup", update);
		anchorEl.addEventListener("mouseup", update);

		return () => {
			document.removeEventListener("selectionchange", update);
			anchorEl.removeEventListener("keyup", update);
			anchorEl.removeEventListener("mouseup", update);
		};
	}, [anchorEl]);

	const closeAll = () => {
		setShowColorPicker(false);
		setShowSizePicker(false);
		setShowStylePicker(false);
	};

	const exec = useCallback(
		(command: string, value?: string) => {
			anchorEl?.focus();
			document.execCommand(command, false, value);
			// Update format state after command
			setTimeout(() => setFmt(readFormatState(anchorEl)), 10);
		},
		[anchorEl],
	);

	const handleBold = () => {
		closeAll();
		exec("bold");
	};
	const handleItalic = () => {
		closeAll();
		exec("italic");
	};
	const handleUnderline = () => {
		closeAll();
		exec("underline");
	};

	const handleColor = (color: string) => {
		exec("foreColor", color);
		setShowColorPicker(false);
	};

	const handleSize = (size: string) => {
		const sel = window.getSelection();
		if (!sel || sel.rangeCount === 0) {
			setShowSizePicker(false);
			return;
		}
		const range = sel.getRangeAt(0);
		if (range.collapsed) {
			setShowSizePicker(false);
			return;
		}
		const span = document.createElement("span");
		span.style.fontSize = size;
		try {
			range.surroundContents(span);
		} catch {
			const fragment = range.extractContents();
			span.appendChild(fragment);
			range.insertNode(span);
		}
		sel.removeAllRanges();
		setShowSizePicker(false);
		setTimeout(() => setFmt(readFormatState(anchorEl)), 10);
	};

	const handleStyle = (preset: (typeof TEXT_STYLE_PRESETS)[number]) => {
		const sel = window.getSelection();
		if (!sel || sel.rangeCount === 0) {
			setShowStylePicker(false);
			return;
		}
		const range = sel.getRangeAt(0);
		if (range.collapsed) {
			setShowStylePicker(false);
			return;
		}
		const span = document.createElement("span");
		for (const [key, val] of Object.entries(preset.style)) {
			const cssProperty = key.replace(
				/[A-Z]/g,
				(match) => `-${match.toLowerCase()}`,
			);
			span.style.setProperty(cssProperty, val);
		}
		span.style.display = "inline";
		try {
			range.surroundContents(span);
		} catch {
			const fragment = range.extractContents();
			span.appendChild(fragment);
			range.insertNode(span);
		}
		sel.removeAllRanges();
		setShowStylePicker(false);
	};

	if (!anchorEl) return null;

	return (
		<div
			ref={toolbarRef}
			data-inline-toolbar
			className="fixed z-[100] bg-background border border-border rounded-lg shadow-xl px-1 py-1 flex items-center gap-0.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
			style={{ top: position.top, left: position.left }}
		>
			{/* ── Current info badge ── */}
			<span className="px-2 py-0.5 text-[10px] text-muted-foreground font-mono select-none border-r border-border mr-0.5 flex items-center gap-1.5 shrink-0">
				<span
					className="inline-block w-3 h-3 rounded-sm border border-border/60 shrink-0"
					style={{ backgroundColor: fmt.color }}
					title={`Couleur: ${fmt.color}`}
				/>
				<span title={`Police: ${fmt.fontFamily}`}>
					{fmt.fontFamily.length > 10
						? `${fmt.fontFamily.slice(0, 10)}…`
						: fmt.fontFamily}
				</span>
				<span title={`Taille: ${fmt.fontSize}`}>{fmt.fontSize}</span>
			</span>

			{/* Bold */}
			<ToolbarButton
				onClick={handleBold}
				title="Gras (Ctrl+B)"
				active={fmt.isBold}
			>
				<Bold className="w-4 h-4" />
			</ToolbarButton>

			{/* Italic */}
			<ToolbarButton
				onClick={handleItalic}
				title="Italique (Ctrl+I)"
				active={fmt.isItalic}
			>
				<Italic className="w-4 h-4" />
			</ToolbarButton>

			{/* Underline */}
			<ToolbarButton
				onClick={handleUnderline}
				title="Souligné (Ctrl+U)"
				active={fmt.isUnderline}
			>
				<Underline className="w-4 h-4" />
			</ToolbarButton>

			<div className="w-px h-5 bg-border mx-0.5" />

			{/* Color Picker — shows current color as indicator */}
			<div className="relative">
				<ToolbarButton
					onClick={() => {
						closeAll();
						setShowColorPicker(!showColorPicker);
					}}
					title={`Couleur du texte (${fmt.color})`}
					active={showColorPicker}
				>
					<div className="flex flex-col items-center gap-0">
						<Palette className="w-4 h-4" />
						<span
							className="block w-4 h-1 rounded-full"
							style={{ backgroundColor: fmt.color }}
						/>
					</div>
				</ToolbarButton>
				{showColorPicker && (
					<div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-xl p-2 grid grid-cols-5 gap-1 min-w-[140px]">
						{COLORS.map((color) => (
							<button
								key={color}
								type="button"
								onMouseDown={(e) => e.preventDefault()}
								className={`w-6 h-6 rounded border hover:scale-110 transition-transform ${
									color.toLowerCase() === fmt.color.toLowerCase()
										? "border-primary ring-2 ring-primary/40 scale-110"
										: "border-border/50"
								}`}
								style={{ backgroundColor: color }}
								onClick={() => handleColor(color)}
								title={color}
							/>
						))}
					</div>
				)}
			</div>

			{/* Font Size — shows current size */}
			<div className="relative">
				<ToolbarButton
					onClick={() => {
						closeAll();
						setShowSizePicker(!showSizePicker);
					}}
					title={`Taille du texte (${fmt.fontSize})`}
					active={showSizePicker}
				>
					<Type className="w-4 h-4" />
				</ToolbarButton>
				{showSizePicker && (
					<div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-xl py-1 min-w-[80px]">
						{FONT_SIZES.map((size) => (
							<button
								key={size}
								type="button"
								onMouseDown={(e) => e.preventDefault()}
								className={`w-full px-3 py-1 text-left text-sm transition-colors ${
									size === fmt.fontSize
										? "bg-primary/10 text-primary font-semibold"
										: "hover:bg-accent/50"
								}`}
								style={{ fontSize: size }}
								onClick={() => handleSize(size)}
							>
								{size} {size === fmt.fontSize && "✓"}
							</button>
						))}
					</div>
				)}
			</div>

			<div className="w-px h-5 bg-border mx-0.5" />

			{/* ✨ Style Presets (Gradients) */}
			<div className="relative">
				<ToolbarButton
					onClick={() => {
						closeAll();
						setShowStylePicker(!showStylePicker);
					}}
					title="Styles de texte (gradients)"
					active={showStylePicker}
				>
					<Sparkles className="w-4 h-4" />
				</ToolbarButton>
				{showStylePicker && (
					<div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-lg shadow-xl py-1.5 min-w-[200px]">
						<div className="px-3 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
							Styles de texte
						</div>
						{TEXT_STYLE_PRESETS.map((preset) => (
							<button
								key={preset.label}
								type="button"
								onMouseDown={(e) => e.preventDefault()}
								className="w-full px-3 py-2 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-2.5"
								onClick={() => handleStyle(preset)}
							>
								<span
									className="inline-block w-5 h-5 rounded-md border border-border/50 shrink-0"
									style={{
										background:
											preset.preview === "none"
												? "var(--foreground)"
												: preset.preview,
									}}
								/>
								<span
									className="font-semibold text-sm"
									style={
										preset.preview !== "none"
											? {
													background: preset.preview,
													WebkitBackgroundClip: "text",
													backgroundClip: "text",
													WebkitTextFillColor: "transparent",
												}
											: undefined
									}
								>
									{preset.label}
								</span>
							</button>
						))}
					</div>
				)}
			</div>

			{onReset && (
				<>
					<div className="w-px h-5 bg-border mx-0.5" />
					<ToolbarButton
						onClick={() => {
							closeAll();
							onReset();
						}}
						title="Annuler les modifications"
					>
						<Undo className="w-4 h-4" />
					</ToolbarButton>
				</>
			)}
		</div>
	);
}

function ToolbarButton({
	children,
	onClick,
	title,
	active,
}: {
	children: React.ReactNode;
	onClick: () => void;
	title: string;
	active?: boolean;
}) {
	return (
		<button
			type="button"
			onMouseDown={(e) => e.preventDefault()}
			onClick={onClick}
			title={title}
			className={`p-1.5 rounded hover:bg-accent/60 transition-colors ${active ? "bg-accent text-accent-foreground" : "text-foreground/80"}`}
		>
			{children}
		</button>
	);
}
