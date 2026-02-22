import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Smartphone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageManagementView } from "@/components/inline-edit/PageEditorPanel";
import { Button } from "@/components/ui/button";
import { PAGE_REGISTRY } from "@/config/pages";

// ── Device Models ────────────────────────────────────────────────────────────

type DeviceModel = {
	id: string;
	name: string;
	brand: "apple" | "samsung";
	w: number;
	h: number;
};

const DEVICES: DeviceModel[] = [
	{ id: "ip15pm", name: "iPhone 15 Pro Max", brand: "apple", w: 430, h: 932 },
	{ id: "ip17", name: "iPhone 17", brand: "apple", w: 393, h: 852 },
	{ id: "ip17p", name: "iPhone 17 Pro", brand: "apple", w: 402, h: 874 },
	{ id: "ip17pm", name: "iPhone 17 Pro Max", brand: "apple", w: 440, h: 956 },
	{ id: "ip17a", name: "iPhone 17 Air", brand: "apple", w: 393, h: 852 },
	{ id: "s25u", name: "Galaxy S25 Ultra", brand: "samsung", w: 412, h: 915 },
	{ id: "s25p", name: "Galaxy S25+", brand: "samsung", w: 412, h: 915 },
	{ id: "s25", name: "Galaxy S25", brand: "samsung", w: 360, h: 780 },
	{ id: "s24u", name: "Galaxy S24 Ultra", brand: "samsung", w: 412, h: 915 },
	{ id: "s24p", name: "Galaxy S24+", brand: "samsung", w: 412, h: 915 },
];

const DEFAULT_DEVICE = DEVICES[0];

// ── Realistic Mobile Frame ───────────────────────────────────────────────────

function MobileFrame({
	src,
	title,
	device,
}: {
	src: string;
	title: string;
	device: DeviceModel;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [time, setTime] = useState("");

	const W = device.w;
	const H = device.h;
	const BEZEL = 12;

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const update = () => {
			const ch = el.clientHeight;
			const cw = el.clientWidth;
			const s = Math.min(ch / (H + BEZEL * 2), cw / (W + BEZEL * 2), 1);
			setScale(s);
		};
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, [W, H]);

	useEffect(() => {
		const tick = () => {
			setTime(
				new Date().toLocaleTimeString("fr-FR", {
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
		};
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	}, []);

	const isApple = device.brand === "apple";

	return (
		<div
			ref={containerRef}
			className="relative w-full h-full flex items-center justify-center"
		>
			<div
				style={{
					transform: `scale(${scale})`,
					transformOrigin: "center center",
				}}
			>
				{/* Outer body */}
				<div
					className="relative rounded-[3.5rem] p-[12px] shadow-[0_0_0_2px_rgba(120,120,128,0.3),0_20px_60px_rgba(0,0,0,0.35)]"
					style={{
						width: W + BEZEL * 2,
						height: H + BEZEL * 2,
						backgroundColor: isApple ? "#2a2a2e" : "#1a1a1a",
					}}
				>
					{/* Side buttons */}
					<div className="absolute -right-[3px] top-[180px] w-[3px] h-[80px] bg-[#3a3a3e] rounded-r-sm" />
					<div className="absolute -left-[3px] top-[160px] w-[3px] h-[55px] bg-[#3a3a3e] rounded-l-sm" />
					<div className="absolute -left-[3px] top-[230px] w-[3px] h-[55px] bg-[#3a3a3e] rounded-l-sm" />
					{isApple && (
						<div className="absolute -left-[3px] top-[100px] w-[3px] h-[30px] bg-[#3a3a3e] rounded-l-sm" />
					)}

					{/* ── Screen ──────────────────────────────────────── */}
					<div
						className="relative rounded-[2.8rem] overflow-hidden"
						style={{ width: W, height: H, backgroundColor: "#1a73e8" }}
					>
						{/* Status Bar — transparent overlay like real iOS */}
						<div className="absolute top-0 inset-x-0 z-20 h-[54px] flex items-center justify-between px-8 pointer-events-none">
							<span className="text-white text-[15px] font-semibold tracking-tight">
								{time}
							</span>
							{isApple ? (
								<div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-30" />
							) : (
								<div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-black rounded-full z-30 ring-[2px] ring-gray-800" />
							)}
							<div className="flex items-center gap-[5px]">
								<svg width="18" height="12" viewBox="0 0 18 12" fill="none">
									<title>Signal</title>
									<rect
										x="0"
										y="9"
										width="3"
										height="3"
										rx="0.5"
										fill="white"
									/>
									<rect
										x="5"
										y="6"
										width="3"
										height="6"
										rx="0.5"
										fill="white"
									/>
									<rect
										x="10"
										y="3"
										width="3"
										height="9"
										rx="0.5"
										fill="white"
									/>
									<rect
										x="15"
										y="0"
										width="3"
										height="12"
										rx="0.5"
										fill="white"
									/>
								</svg>
								<svg width="16" height="12" viewBox="0 0 16 12" fill="none">
									<title>WiFi</title>
									<path
										d="M8 10.5l2.5-3C9.5 6.5 6.5 6.5 5.5 7.5L8 10.5z"
										fill="white"
									/>
									<path
										d="M8 7l4-4.5C10 0.5 6 0.5 4 2.5L8 7z"
										fill="white"
										opacity="0.5"
									/>
								</svg>
								<div className="flex items-center gap-[2px]">
									<div className="w-[25px] h-[12px] rounded-[3px] border-[1.5px] border-white/80 flex items-center p-[2px]">
										<div className="h-full w-[75%] bg-white rounded-[1.5px]" />
									</div>
									<div className="w-[1.5px] h-[5px] bg-white/50 rounded-r-sm" />
								</div>
							</div>
						</div>

						{/* ── Iframe ────────────────────────────────── */}
						<iframe
							src={src}
							className="border-none absolute left-0"
							style={{
								top: 54,
								width: W,
								height: H - 54,
								borderRadius: "0 0 2.8rem 2.8rem",
							}}
							title={`Aperçu ${title}`}
						/>

						{/* Home Indicator */}
						<div className="absolute bottom-[8px] inset-x-0 z-20 flex justify-center pointer-events-none">
							<div className="w-[140px] h-[5px] bg-white/60 rounded-full" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// ── Device Picker ────────────────────────────────────────────────────────────

function DevicePicker({
	selected,
	onChange,
}: {
	selected: DeviceModel;
	onChange: (d: DeviceModel) => void;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node))
				setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const appleDevices = DEVICES.filter((d) => d.brand === "apple");
	const samsungDevices = DEVICES.filter((d) => d.brand === "samsung");

	return (
		<div
			ref={ref}
			className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5"
		>
			{/* Compact trigger */}
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-border/30 hover:shadow-lg transition-all cursor-pointer text-xs font-medium text-foreground"
			>
				<Smartphone className="w-3.5 h-3.5 text-muted-foreground" />
				<ChevronDown
					className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>

			{/* Device info — 2-3 lines */}
			<div className="text-right leading-tight px-1">
				<p className="text-[11px] font-semibold text-foreground/70">
					{selected.name}
				</p>
				<p className="text-[10px] text-muted-foreground">
					{selected.w} × {selected.h}px
				</p>
				<p className="text-[10px] text-muted-foreground/60">
					{selected.brand === "apple" ? "Apple" : "Samsung"}
				</p>
			</div>

			{open && (
				<div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border/40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
					<div className="px-3 pt-3 pb-1">
						<p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
							<span>🍎</span> Apple
						</p>
					</div>
					{appleDevices.map((d) => (
						<button
							key={d.id}
							type="button"
							onClick={() => {
								onChange(d);
								setOpen(false);
							}}
							className={`w-full text-left px-4 py-2 text-sm hover:bg-accent/50 transition-colors cursor-pointer flex items-center justify-between ${
								selected.id === d.id
									? "bg-accent text-accent-foreground font-medium"
									: "text-foreground"
							}`}
						>
							<span>{d.name}</span>
							<span className="text-[11px] text-muted-foreground">
								{d.w}×{d.h}
							</span>
						</button>
					))}
					<div className="mx-3 my-1 border-t border-border/30" />
					<div className="px-3 pt-2 pb-1">
						<p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
							<span>📱</span> Samsung
						</p>
					</div>
					{samsungDevices.map((d) => (
						<button
							key={d.id}
							type="button"
							onClick={() => {
								onChange(d);
								setOpen(false);
							}}
							className={`w-full text-left px-4 py-2 text-sm hover:bg-accent/50 transition-colors cursor-pointer flex items-center justify-between ${
								selected.id === d.id
									? "bg-accent text-accent-foreground font-medium"
									: "text-foreground"
							}`}
						>
							<span>{d.name}</span>
							<span className="text-[11px] text-muted-foreground">
								{d.w}×{d.h}
							</span>
						</button>
					))}
					<div className="h-1" />
				</div>
			)}
		</div>
	);
}

// ── Main Component ───────────────────────────────────────────────────────────

function AdminPageManager() {
	const { slug } = Route.useParams();
	const page = PAGE_REGISTRY[slug];
	const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
		"desktop",
	);
	const [panelOpen, setPanelOpen] = useState(true);
	const [device, setDevice] = useState<DeviceModel>(DEFAULT_DEVICE);

	if (!page) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
				<h1 className="text-2xl font-bold">Page introuvable</h1>
				<p className="text-muted-foreground">
					La page « {slug} » n'existe pas.
				</p>
				<Button asChild variant="outline">
					<Link to="/admin">Retour au tableau de bord</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="relative h-[calc(100vh-var(--header-height,4rem))] w-full overflow-hidden">
			{/* ─── Full-width Live Preview ───────────────────────────── */}
			<div
				className={`absolute inset-0 flex flex-col overflow-hidden ${previewMode === "mobile" ? "bg-muted/40" : ""}`}
			>
				<div
					className={`flex-1 overflow-hidden flex transition-[padding] duration-300 ease-in-out ${
						previewMode === "mobile"
							? "items-center justify-center p-4 pr-16"
							: ""
					}`}
					style={{
						paddingLeft:
							previewMode === "mobile" && panelOpen ? 630 : undefined,
					}}
				>
					{previewMode === "mobile" ? (
						<MobileFrame
							src={page.publicPath}
							title={page.title}
							device={device}
						/>
					) : (
						<div className="w-full h-full relative">
							<iframe
								src={page.publicPath}
								className="w-full h-full border-none"
								title={`Aperçu ${page.title}`}
							/>
						</div>
					)}
				</div>

				{/* Device Picker — mobile mode only */}
				{previewMode === "mobile" && (
					<DevicePicker selected={device} onChange={setDevice} />
				)}
			</div>

			{/* ─── Floating Editor Panel ─────────────────────────────── */}
			<div
				className={`absolute top-0 left-0 bottom-0 z-30 transition-transform duration-300 ease-in-out ${
					panelOpen ? "translate-x-0" : "-translate-x-full"
				}`}
				style={{ width: 630 }}
			>
				<div className="h-full bg-background/95 backdrop-blur-xl border-r border-border/50 shadow-2xl overflow-y-auto custom-scrollbar">
					<PageManagementView
						page={page}
						previewMode={previewMode}
						onSwitchPreviewMode={setPreviewMode}
					/>
				</div>

				<button
					type="button"
					onClick={() => setPanelOpen(!panelOpen)}
					className="absolute top-1/2 -right-7 -translate-y-1/2 z-30 flex items-center justify-center w-7 h-24 bg-white rounded-r-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_16px_rgba(0,0,0,0.12)] transition-shadow cursor-pointer"
					title={panelOpen ? "Masquer le panneau" : "Afficher le panneau"}
				>
					{panelOpen ? (
						<ChevronLeft className="w-4 h-4 text-gray-500" />
					) : (
						<ChevronRight className="w-4 h-4 text-gray-500" />
					)}
				</button>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/admin/pages/$slug")({
	component: AdminPageManager,
});
