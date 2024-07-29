import { Request, Response } from "express";
import { logger } from "../config";

// Controller function to handle text recognition requests
async function recognizeText(req: Request, res: Response) {
  try {
  } catch (e) {
    // Log the error message
    logger.error(e.message);

    // Send an error response with status code 500
    res.status(500).json({ error: e.message });
  }
}

export default { recognizeText };
