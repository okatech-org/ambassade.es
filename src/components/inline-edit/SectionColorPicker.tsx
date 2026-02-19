import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";

interface SectionColorPickerProps {
	currentColor: string;
	onColorChange: (color: string) => void;
	onClose: () => void;
}

const PRESET_COLORS = [
	{ label: "Transparent", value: "", swatch: "bg-transparent border-dashed" },
	{ label: "Blanc", value: "#ffffff", swatch: "bg-white" },
	{ label: "Gris clair", value: "#f8fafc", swatch: "bg-slate-50" },
	{ label: "Gris", value: "#f1f5f9", swatch: "bg-slate-100" },
	{ label: "Gris foncé", value: "#e2e8f0", swatch: "bg-slate-200" },
	{ label: "Bleu très clair", value: "#eff6ff", swatch: "bg-blue-50" },
	{ label: "Bleu clair", value: "#dbeafe", swatch: "bg-blue-100" },
	{ label: "Bleu", value: "#3b82f6", swatch: "bg-blue-500" },
	{ label: "Indigo", value: "#6366f1", swatch: "bg-indigo-500" },
	{ label: "Violet", value: "#8b5cf6", swatch: "bg-violet-500" },
	{ label: "Émeraude", value: "#10b981", swatch: "bg-emerald-500" },
	{ label: "Ambre", value: "#f59e0b", swatch: "bg-amber-500" },
	{ label: "Rose", value: "#ec4899", swatch: "bg-pink-500" },
	{ label: "Rouge", value: "#ef4444", swatch: "bg-red-500" },
	{ label: "Sombre", value: "#1e293b", swatch: "bg-slate-800" },
	{ label: "Noir", value: "#0f172a", swatch: "bg-slate-900" },
];

export function SectionColorPicker({
	currentColor,
	onColorChange,
	onClose,
}: SectionColorPickerProps) {
	const [customColor, setCustomColor] = useState(currentColor || "#3b82f6");

	return (
		<div className="absolute top-full right-0 mt-2 z-50 bg-background border border-border rounded-xl shadow-2xl p-3 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
			<div className="flex items-center justify-between mb-2">
				<span className="text-xs font-semibold text-foreground">
					Couleur de fond
				</span>
				<button
					type="button"
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => {
						onColorChange("");
						onClose();
					}}
					className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
					title="Réinitialiser"
				>
					<RotateCcw className="h-3 w-3" />
					Reset
				</button>
			</div>

			{/* Preset grid */}
			<div className="grid grid-cols-8 gap-1.5 mb-3">
				{PRESET_COLORS.map((color) => (
					<button
						key={color.value || "transparent"}
						type="button"
						onMouseDown={(e) => e.preventDefault()}
						title={color.label}
						onClick={() => {
							onColorChange(color.value);
							onClose();
						}}
						className={`w-6 h-6 rounded-md border border-border/60 transition-all hover:scale-110 hover:shadow-md relative ${color.swatch}`}
						style={
							color.value && !color.swatch.startsWith("bg-")
								? { backgroundColor: color.value }
								: undefined
						}
					>
						{currentColor === color.value && (
							<Check className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow-md" />
						)}
					</button>
				))}
			</div>

			{/* Custom color input */}
			<div className="flex items-center gap-2 pt-2 border-t border-border">
				<span className="text-[10px] text-muted-foreground shrink-0">
					Custom:
				</span>
				<input
					type="color"
					value={customColor}
					onChange={(e) => setCustomColor(e.target.value)}
					className="w-6 h-6 rounded cursor-pointer border-0 p-0"
				/>
				<input
					type="text"
					value={customColor}
					onChange={(e) => setCustomColor(e.target.value)}
					className="flex-1 text-xs bg-muted/50 border border-border rounded px-2 py-1 font-mono"
					placeholder="#hex"
				/>
				<button
					type="button"
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => {
						onColorChange(customColor);
						onClose();
					}}
					className="text-xs bg-primary text-primary-foreground rounded px-2 py-1 hover:bg-primary/90"
				>
					OK
				</button>
			</div>
		</div>
	);
}
