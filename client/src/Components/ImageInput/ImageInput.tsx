import validateImage from "./Utils/validateImage";

// Component for handling image input
const ImageInput = ({ loading }: { loading: boolean }) => {
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
