import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	Image as ImageIcon,
	Loader2,
	RotateCcw,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useInlineEdit } from "./use-inline-edit";

interface EditablePostImageProps {
	postId: Id<"posts">;
	src: string | undefined;
	alt: string;
	className?: string;
	/** CSS object-position value from the database */
	objectPosition?: string;
	/** Fallback element rendered when there's no image */
	fallback?: React.ReactNode;
}

/** Step in percentage for each arrow click */
const STEP = 10;

function clamp(val: number, min: number, max: number) {
	return Math.max(min, Math.min(max, val));
}

/**
 * Wraps a post cover image with inline-edit controls:
 * - Upload a new image from device
 * - Adjust image position (up/down/left/right arrows)
 */
export function EditablePostImage({
	postId,
	src,
	alt,
	className,
	objectPosition,
	fallback,
}: EditablePostImageProps) {
	const { canEditImages, ready } = useInlineEdit();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const generateUploadUrl = useMutation(api.functions.files.generateUploadUrl);
	const updateCoverImage = useMutation(api.functions.posts.updateCoverImage);
	const updatePosition = useMutation(
		api.functions.posts.updateCoverImagePosition,
	);

	const [isUploading, setIsUploading] = useState(false);
	const [localPreview, setLocalPreview] = useState<string | null>(null);
	const [isSavingPos, setIsSavingPos] = useState(false);

	// Parse current position from DB or default to 50% 50%
	const parsePosition = (pos?: string) => {
		if (!pos) return { x: 50, y: 50 };
		const parts = pos.split(/\s+/);
		return {
			x: Number.parseFloat(parts[0]) || 50,
			y: Number.parseFloat(parts[1] ?? parts[0]) || 50,
		};
	};

	const [localPos, setLocalPos] = useState<{ x: number; y: number } | null>(
		null,
	);
	const currentPos = localPos ?? parsePosition(objectPosition);
	const positionStyle = `${currentPos.x}% ${currentPos.y}%`;

	const displaySrc = localPreview ?? src;

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			toast.error("Veuillez sélectionner une image");
			return;
		}
		if (file.size > 10 * 1024 * 1024) {
			toast.error("L'image est trop volumineuse (max 10 Mo)");
			return;
		}

		setLocalPreview(URL.createObjectURL(file));
		setIsUploading(true);

		try {
			const postUrl = await generateUploadUrl();
			const result = await fetch(postUrl, {
				method: "POST",
				headers: { "Content-Type": file.type },
				body: file,
			});
			if (!result.ok) throw new Error(`Upload failed: ${result.statusText}`);

			const { storageId } = (await result.json()) as {
				storageId: Id<"_storage">;
			};
			await updateCoverImage({ id: postId, coverImageStorageId: storageId });
			setLocalPos(null); // reset position on new image
			toast.success("Image mise à jour");
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Échec du téléchargement de l'image");
			setLocalPreview(null);
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};

	const handleEdit = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!canEditImages || !ready || isUploading) return;
		fileInputRef.current?.click();
	};

	const movePosition = async (dx: number, dy: number) => {
		const next = {
			x: clamp(currentPos.x + dx, 0, 100),
			y: clamp(currentPos.y + dy, 0, 100),
		};
		setLocalPos(next);
		setIsSavingPos(true);
		try {
			await updatePosition({
				id: postId,
				position: `${next.x}% ${next.y}%`,
			});
		} catch (error) {
			console.error("Position update error:", error);
			toast.error("Erreur lors du repositionnement");
		} finally {
			setIsSavingPos(false);
		}
	};

	const resetPosition = async () => {
		setLocalPos({ x: 50, y: 50 });
		setIsSavingPos(true);
		try {
			await updatePosition({ id: postId, position: "50% 50%" });
		} catch (error) {
			console.error("Position reset error:", error);
		} finally {
			setIsSavingPos(false);
		}
	};

	// ── Non-edit mode ──
	if (!canEditImages || !ready) {
		if (!displaySrc) return fallback ?? null;
		return (
			<img
				src={displaySrc}
				alt={alt}
				className={className}
				style={{ objectPosition: objectPosition || undefined }}
			/>
		);
	}

	// ── Edit mode ──
	return (
		<div className="relative w-full h-full group/edit-img">
			{displaySrc ? (
				<img
					src={displaySrc}
					alt={alt}
					className={`${className ?? ""} outline outline-2 outline-dashed outline-emerald-500/60`}
					style={{ objectPosition: positionStyle }}
				/>
			) : (
				(fallback ?? (
					<div className="w-full h-full bg-muted/30 outline outline-2 outline-dashed outline-emerald-500/60 flex items-center justify-center">
						<ImageIcon className="w-8 h-8 text-muted-foreground/40" />
					</div>
				))
			)}

			{/* Hidden file input */}
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
				disabled={isUploading}
			/>

			{/* Upload overlay — center */}
			<button
				type="button"
				className="absolute inset-0 z-20 cursor-pointer bg-transparent hover:bg-black/20 transition-colors flex items-center justify-center"
				onClick={handleEdit}
				disabled={isUploading}
			>
				<span className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-2 text-sm font-medium text-emerald-600 shadow-lg opacity-0 group-hover/edit-img:opacity-100 transition-opacity duration-200 border border-emerald-200">
					{isUploading ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Téléchargement…
						</>
					) : (
						<>
							<ImageIcon className="h-4 w-4" />
							Changer l'image
						</>
					)}
				</span>
			</button>

			{/* Position controls — bottom right, visible on hover */}
			{displaySrc && (
				<div className="absolute bottom-3 right-3 z-30 opacity-0 group-hover/edit-img:opacity-100 transition-opacity duration-200">
					<div className="flex flex-col items-center gap-0.5 bg-background/95 backdrop-blur-sm rounded-xl p-1.5 shadow-xl border border-emerald-200">
						{/* Up */}
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								movePosition(0, -STEP);
							}}
							disabled={isSavingPos}
							className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-40"
							title="Déplacer vers le haut"
						>
							<ArrowUp className="h-4 w-4" />
						</button>

						{/* Middle row: Left, Reset, Right */}
						<div className="flex items-center gap-0.5">
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									movePosition(-STEP, 0);
								}}
								disabled={isSavingPos}
								className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-40"
								title="Déplacer vers la gauche"
							>
								<ArrowLeft className="h-4 w-4" />
							</button>

							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									resetPosition();
								}}
								disabled={isSavingPos}
								className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-40"
								title="Recentrer"
							>
								<RotateCcw className="h-3.5 w-3.5" />
							</button>

							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									movePosition(STEP, 0);
								}}
								disabled={isSavingPos}
								className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-40"
								title="Déplacer vers la droite"
							>
								<ArrowRight className="h-4 w-4" />
							</button>
						</div>

						{/* Down */}
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								movePosition(0, STEP);
							}}
							disabled={isSavingPos}
							className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-40"
							title="Déplacer vers le bas"
						>
							<ArrowDown className="h-4 w-4" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
