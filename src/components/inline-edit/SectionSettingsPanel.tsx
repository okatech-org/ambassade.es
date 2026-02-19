import { Eye, EyeOff, RotateCcw } from "lucide-react";
import type { SectionStyle } from "./useDesignSettings";
import { PADDING_LABELS } from "./useDesignSettings";

interface SectionSettingsPanelProps {
	style: SectionStyle;
	onUpdate: (patch: Partial<SectionStyle>) => void;
	onReset: () => void;
	onClose: () => void;
}

const PADDING_OPTIONS: SectionStyle["padding"][] = [
	"compact",
	"normal",
	"spacious",
	"xl",
];

export function SectionSettingsPanel({
	style,
	onUpdate,
	onReset,
	onClose,
}: SectionSettingsPanelProps) {
	return (
		<div className="absolute top-full right-0 mt-2 z-50 bg-background border border-border rounded-xl shadow-2xl p-3 w-56 animate-in fade-in slide-in-from-top-2 duration-200">
			<div className="flex items-center justify-between mb-3">
				<span className="text-xs font-semibold text-foreground">
					Paramètres
				</span>
				<button
					type="button"
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => {
						onReset();
						onClose();
					}}
					className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
					title="Réinitialiser"
				>
					<RotateCcw className="h-3 w-3" />
					Reset
				</button>
			</div>

			{/* Padding selector */}
			<div className="mb-3">
				<span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5 block">
					Espacement
				</span>
				<div className="grid grid-cols-2 gap-1">
					{PADDING_OPTIONS.map((opt) => (
						<button
							key={opt}
							type="button"
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => onUpdate({ padding: opt })}
							className={`text-xs px-2.5 py-1.5 rounded-md border transition-all ${
								style.padding === opt
									? "bg-violet-500 text-white border-violet-500 shadow-sm"
									: "bg-muted/40 border-border text-muted-foreground hover:bg-accent/60 hover:text-foreground"
							}`}
						>
							{PADDING_LABELS[opt]}
						</button>
					))}
				</div>
			</div>

			{/* Visibility toggle */}
			<div className="pt-2 border-t border-border">
				<button
					type="button"
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => onUpdate({ hidden: !style.hidden })}
					className={`w-full flex items-center gap-2 text-xs px-2.5 py-2 rounded-md border transition-all ${
						style.hidden
							? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
							: "bg-muted/40 border-border text-muted-foreground hover:bg-accent/60"
					}`}
				>
					{style.hidden ? (
						<>
							<EyeOff className="h-3.5 w-3.5" />
							Section masquée
						</>
					) : (
						<>
							<Eye className="h-3.5 w-3.5" />
							Section visible
						</>
					)}
				</button>
			</div>
		</div>
	);
}
