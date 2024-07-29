import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgPreview from "./Components/ImgPreview";
import TextDisplay from "./Components/TextDisplay";
import { useState } from "react";
import ImageInput from "./Components/ImageInput/ImageInput";

function App() {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  return (
    <div>
      <ToastContainer position="bottom-right" />

      <ImageInput loading={loading} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "80vh",
        }}
      >
        <ImgPreview previewUrl={previewUrl} />
        <TextDisplay text={text} />
      </div>
    </div>
  );
}

export default App;
