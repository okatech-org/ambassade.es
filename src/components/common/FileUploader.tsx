import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onUploadComplete: (storageId: string) => void;
  onRemove?: () => void;
  currentUrl?: string;
  defaultPreviewUrl?: string; // e.g. from existing data
  label?: string;
  accept?: string;
  className?: string;
}

export function FileUploader({
  onUploadComplete,
  onRemove,
  currentUrl,
  defaultPreviewUrl,
  label = "Upload File",
  accept = "image/*",
  className,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.functions.files.generateUploadUrl);

  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    currentUrl || defaultPreviewUrl
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File is too large (max 10MB)");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Get upload URL
      const postUrl = await generateUploadUrl();

      // 2. Upload file
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.statusText}`);
      }

      const { storageId } = await result.json();

      // 3. Update parent
      onUploadComplete(storageId);

      // 4. Update local preview
      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(undefined); // No preview for non-images unless we want a generic icon
      }
      
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    if (onRemove) onRemove();
  };

  const isImage = accept.startsWith("image/") || (previewUrl && !previewUrl.endsWith(".pdf")); // Heuristic

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        {previewUrl && isImage && (
          <div className="relative w-32 h-32 rounded-lg border overflow-hidden bg-muted">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {previewUrl && !isImage && (
           <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50 text-sm">
             <FileText className="w-4 h-4" />
             <span className="truncate max-w-[200px]">File uploaded</span>
           </div>
        )}

        <div className="flex flex-col gap-2">
           <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {label}
            </Button>
            
            {previewUrl && onRemove && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                title="Remove file"
              >
                <X className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Max 10MB. {accept === "image/*" ? "Images only." : "PDF or Images."}
          </p>
        </div>
      </div>
    </div>
  );
}
