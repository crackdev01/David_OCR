import validateImage from "./Utils/validateImage";

// Component for handling image input
const ImageInput = ({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <input
        disabled={loading}
        type="file"
        accept="image/*"
        name="Image"
        id="Image"
        style={{ display: "none" }}
        onChange={async (e) => {
          if (validateImage(e.target.files![0]) === 0) return; // Validate the image
          setLoading(true);
        }}
      />
      <label
        htmlFor="Image"
        style={{
          cursor: !loading ? "pointer" : "default",
        }}
      >
        Upload Image
      </label>
    </>
  );
};

export default ImageInput;
