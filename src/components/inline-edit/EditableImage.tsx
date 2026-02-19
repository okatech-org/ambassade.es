import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useConvex, useMutation } from "convex/react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useConvexQuery } from "@/integrations/convex/hooks";
import { useInlineEdit } from "./use-inline-edit";

interface EditableImageProps {
	contentKey: string;
	defaultValue: string;
	pagePath: string;
	sectionId: string;
	alt: string;
	className?: string;
}

export function EditableImage({
	contentKey,
	defaultValue,
	pagePath,
	sectionId,
	alt,
	className,
}: EditableImageProps) {
	const { data } = useConvexQuery(api.functions.inlineContent.getContent, {
		contentKey,
	});
	const { canEditImages, pendingChanges, setPendingChange, ready } =
		useInlineEdit();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const convex = useConvex();
	const generateUploadUrl = useMutation(api.functions.files.generateUploadUrl);
	const [isUploading, setIsUploading] = useState(false);

	const value = useMemo(() => {
		return pendingChanges[contentKey]?.value ?? data?.value ?? defaultValue;
	}, [pendingChanges, contentKey, data?.value, defaultValue]);

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

		setIsUploading(true);
		try {
			// 1. Get upload URL from Convex
			const postUrl = await generateUploadUrl();

			// 2. Upload file to Convex storage
			const result = await fetch(postUrl, {
				method: "POST",
				headers: { "Content-Type": file.type },
				body: file,
			});

			if (!result.ok) {
				throw new Error(`Upload failed: ${result.statusText}`);
			}

			const { storageId } = (await result.json()) as {
				storageId: Id<"_storage">;
			};

			// 3. Get the public URL for this storage ID via Convex query
			const fileUrl = await convex.query(api.functions.files.getFileUrl, {
				storageId,
			});

			if (!fileUrl) {
				throw new Error("Could not resolve storage URL");
			}

			// 4. Set the URL as a pending change
			setPendingChange({
				contentKey,
				pagePath,
				sectionId,
				fieldType: "image",
				value: fileUrl,
				defaultValue,
			});

			toast.success("Image téléchargée avec succès");
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Échec du téléchargement de l'image");
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	const handleEdit = () => {
		if (!canEditImages || !ready || isUploading) return;
		fileInputRef.current?.click();
	};

	if (!canEditImages || !ready) {
		return (
			<img
				src={value}
				alt={alt}
				className={className}
				suppressHydrationWarning
			/>
		);
	}

	return (
		<div className="relative w-full h-full group">
			<img
				src={value}
				alt={alt}
				className={`${className ?? ""} outline outline-2 outline-dashed outline-emerald-500/60`}
				suppressHydrationWarning
			/>
			{/* Hidden file input for native file picker */}
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
				disabled={isUploading}
			/>
			{/* Edit overlay — fully clickable over the image */}
			<button
				type="button"
				className="absolute inset-0 z-20 cursor-pointer bg-transparent hover:bg-black/20 transition-colors flex items-center justify-center"
				onClick={handleEdit}
				title={`Éditer image: ${contentKey}`}
				disabled={isUploading}
			>
				<span className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-2 text-sm font-medium text-emerald-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-emerald-200">
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
			{/* Always-visible small badge */}
			<span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-emerald-500/90 px-2 py-1 text-xs font-medium text-white shadow z-20">
				{isUploading ? (
					<Loader2 className="h-3 w-3 animate-spin" />
				) : (
					<ImageIcon className="h-3 w-3" />
				)}
				Image
			</span>
		</div>
	);
}
