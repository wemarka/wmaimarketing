
import { UseSchedulePostState } from "./types";

export const useMediaHandlers = (state: UseSchedulePostState & {
  setMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { setMediaFiles, setPreviewUrls } = state;

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
    URL.revokeObjectURL(state.previewUrls[index]);
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  return {
    handleMediaChange,
    removeMedia
  };
};
