// Component to display the image preview
import { useState, useEffect } from "react";

const ImgPreview = ({
  previewUrl,
}: {
  previewUrl: string | ArrayBuffer | null;
}) => {
  const [isPreviewUrl, setIsPreviewUrl] = useState(false);

  useEffect(() => {
    setIsPreviewUrl(!!previewUrl);
  }, [previewUrl]);

  return (
    <div
      role="img-preview"
      style={{
        display: "flex",
        backgroundColor: "#7B937F",
        backgroundImage: `url(${previewUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          color: "white",
          display: `${isPreviewUrl ? "none" : "block"}`,
        }}
      >
        Image Preview
      </div>
    </div>
  );
};

export default ImgPreview;
