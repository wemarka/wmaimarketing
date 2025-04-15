
import { UseSchedulePostStateWithSetters } from "./types";

export const useMediaHandlers = (state: UseSchedulePostStateWithSetters) => {
  const { setMediaFiles, setPreviewUrls, previewUrls } = state;

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    setMediaFiles(prevFiles => [...prevFiles, ...files]);
    
    // Create preview URLs for the new files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    // Revoke the URL to prevent memory leaks
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  return {
    handleMediaChange,
    removeMedia
  };
};
