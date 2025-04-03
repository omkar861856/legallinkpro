import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Case inquiry form submission
  app.post("/api/inquiries", async (req: Request, res: Response) => {
    try {
      // Validate the request body against the schema
      const validatedData = insertInquirySchema.parse(req.body);
      
      // Store the inquiry in the database
      const inquiry = await storage.createInquiry(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Inquiry submitted successfully",
        inquiry,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // If validation fails, return detailed error messages
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation failed",
          errors: validationError.details,
        });
      } else {
        // For other errors
        console.error("Error creating inquiry:", error);
        res.status(500).json({
          message: "Failed to process your inquiry",
        });
      }
    }
  });

  // Get all inquiries (could be used for an admin dashboard)
  app.get("/api/inquiries", async (_req: Request, res: Response) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error retrieving inquiries:", error);
      res.status(500).json({
        message: "Failed to retrieve inquiries",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
