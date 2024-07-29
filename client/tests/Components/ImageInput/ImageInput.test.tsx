import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import validateImage from "../../../src/Components/ImageInput/Utils/validateImage";
import ImageInput from "../../../src/Components/ImageInput/ImageInput";
import compressImage from "../../../src/Components/ImageInput/Utils/compressImage";
import imgToBase64 from "../../../src/Components/ImageInput/Utils/imgToBase64";
import sendImgToBackend from "../../../src/Components/ImageInput/Utils/sendImgToBackend";

// Mock the dependencies
vi.mock("../../../src/Components/ImageInput/Utils/validateImage");
vi.mock("../../../src/Components/ImageInput/Utils/imgToBase64");
vi.mock("../../../src/Components/ImageInput/Utils/sendImgToBackend");
vi.mock("../../../src/Components/ImageInput/Utils/compressImage");

describe("ImageInput", () => {
  const setLoading = vi.fn();
  const setPreviewUrl = vi.fn();
  const setText = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call validateImage and show error if validation fails", async () => {
    (validateImage as Mock).mockReturnValue(0); // Simulate validation failure

    render(
      <ImageInput
        loading={false}
        setLoading={setLoading}
        setPreviewUrl={setPreviewUrl}
        setText={setText}
      />
    );

    const fileInput = screen.getByLabelText("Upload Image");
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(validateImage).toHaveBeenCalledWith(file);
      expect(setLoading).not.toHaveBeenCalled(); // Should NOT be called on validation failure
    });
  });

  it("should compress image and send to backend if validation passes", async () => {
    (validateImage as Mock).mockReturnValue(1);
    (compressImage as Mock).mockImplementation(
      (file: File, callback: (file: File) => void) => callback(file)
    );
    (imgToBase64 as Mock).mockReturnValue("base64string");
    (sendImgToBackend as Mock).mockResolvedValue({});

    render(
      <ImageInput
        loading={false}
        setLoading={setLoading}
        setPreviewUrl={setPreviewUrl}
        setText={setText}
      />
    );

    const fileInput = screen.getByLabelText("Upload Image");
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(validateImage).toHaveBeenCalledWith(file);
      expect(setLoading).toHaveBeenCalledWith(true); // Should be called on validation success
      expect(compressImage).toHaveBeenCalledWith(file, expect.any(Function));
    });
  });
});
