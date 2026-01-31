import { useUserStore } from "@/stores/useUserStore";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";

const AvatarUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateAvatarUrl } = useUserStore();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    await updateAvatarUrl(formData);
  };

  return (
    <>
      <Button
        size="icon"
        variant="secondary"
        onClick={handleClick}
        className="absolute -bottom-2 -right-2 size-9 rounded-full shadow-md hover:scale-115 transition duration-300 hover:bg-background"
      >
        <Camera className="size-4" />
      </Button>

      <input type="file" hidden ref={fileInputRef} onChange={handleUpload} />
    </>
  );
};

export default AvatarUploader;
