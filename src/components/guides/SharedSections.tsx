import { AlertTriangle, Mail, MapPin, Phone } from "lucide-react";
import type { ErreurItem, NumeroUtile, SavoirVivreItem } from "./guide.types";

// ─── Savoir-vivre Grid ──────────────────────────────────────────────────────

export function SavoirVivreGrid({ items }: { items: SavoirVivreItem[] }) {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{items.map((item, idx) => {
				const Icon = item.icon;
				return (
					<div
						key={idx}
						className="group glass-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300"
					>
						<div className="flex items-center gap-4 mb-4">
							<div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
								<Icon className="w-6 h-6 text-primary" />
							</div>
							<h3 className="font-bold text-lg text-foreground">
								{item.title}
							</h3>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{item.description}
						</p>
					</div>
				);
			})}
		</div>
	);
}

// ─── Erreurs courantes Grid ─────────────────────────────────────────────────

export function ErreursCourantesGrid({ items }: { items: ErreurItem[] }) {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{items.map((item, idx) => (
				<div
					key={idx}
					className="glass-card border-orange-200/50 dark:border-orange-900/30 bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl p-6 hover:-translate-y-1 transition-transform"
				>
					<div className="flex gap-5">
						<div className="p-2.5 rounded-xl bg-orange-500/10 h-fit shrink-0">
							<AlertTriangle className="w-6 h-6 text-orange-500" />
						</div>
						<div>
							<h4 className="font-bold text-foreground text-lg mb-2">
								{item.erreur}
							</h4>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{item.conseil}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

// ─── Numéros utiles Grid ────────────────────────────────────────────────────

export function NumerosUtilesGrid({ items }: { items: NumeroUtile[] }) {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
			{items.map((n, idx) => {
				const isEmail = n.number.includes("@");
				return (
					<div
						key={idx}
						className="glass-card rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
					>
						<div
							className={`w-14 h-14 rounded-full ${n.color} flex items-center justify-center mx-auto mb-4`}
						>
							{isEmail ? (
								<Mail className="w-6 h-6" />
							) : n.number.includes("av.") ? (
								<MapPin className="w-6 h-6" />
							) : (
								<Phone className="w-6 h-6" />
							)}
						</div>
						<p className="text-xl font-bold text-foreground mb-1 tracking-tight">
							{isEmail ? (
								<a
									href={`mailto:${n.number}`}
									className="hover:text-primary transition-colors text-sm"
								>
									{n.number}
								</a>
							) : (
								n.number
							)}
						</p>
						<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
							{n.label}
						</p>
					</div>
				);
			})}
		</div>
	);
}
