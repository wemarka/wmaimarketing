
import { UseSchedulePostStateWithSetters } from "./types";

export const useMediaHandlers = (state: UseSchedulePostStateWithSetters) => {
  const { 
    setMediaFiles, 
    setPreviewUrls
  } = state;

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setMediaFiles(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeMedia = (index: number) => {
    setPreviewUrls(prev => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]); // Prevent memory leaks
      newUrls.splice(index, 1);
      return newUrls;
    });

    setMediaFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return {
    handleMediaChange,
    removeMedia
  };
};
