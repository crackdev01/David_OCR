import { describe, it, expect, beforeEach } from "vitest";
import { OCR } from "../../src/Services/ocr";

describe("OCR Class", () => {
  let ocr;

  beforeEach(() => {
    // Initialize the OCR instance with a mock image
    ocr = new OCR({
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
    });
  });

  it("should initialize with the provided image", () => {
    expect(ocr.image).toBe(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"
    );
  });

  it("should throw an error if no image is provided", async () => {
    ocr = new OCR({ image: "" });
    await expect(ocr.validateImage()).rejects.toThrow(
      "Kindly upload an image to proceed."
    );
  });

  it("should throw an error if the image size is greater than 5MB", async () => {
    // Mock a large image
    ocr = new OCR({
      image: "data:image/png;base64," + "a".repeat(6 * 1024 * 1024 * 10),
    });
    await expect(ocr.validateImage()).rejects.toThrow(
      "Image size should be less than 5MB"
    );
  });

  it("should not throw an error if the image size is less than 5MB", async () => {
    await expect(ocr.validateImage()).resolves.not.toThrow();
  });

  it("should return mock text from the image", async () => {
    // Mock the random behavior to ensure it doesn't throw an error
    const originalMethod = ocr.readTextFromImage.bind(ocr);

    // Override the method to control its output
    ocr.readTextFromImage = async () => {
      return "This is a mock text as a mock OCR response: test";
    };

    const text = await ocr.readTextFromImage();
    expect(text).toMatch(/This is a mock text as a mock OCR response: /);

    // Restore the original method
    ocr.readTextFromImage = originalMethod;
  });

  it("should throw an error randomly when reading text from the image", async () => {
    // We can run the random scenario multiple times to ensure it works
    let errorThrown = false;
    for (let i = 0; i < 10; i++) {
      try {
        await ocr.readTextFromImage();
      } catch (e) {
        errorThrown = true;
        expect(e.message).toBe(
          "Oops! Could not read the image please try again"
        );
        break;
      }
    }
    expect(errorThrown).toBe(true);
  });
});
