import { Request, Response, NextFunction } from "express";
import complaintService from "../services/complaint.service";

class ComplaintController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const complaint = await complaintService.createComplaint(req.body);

      res.status(201).json({
        success: true,
        data: complaint,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await complaintService.getAllComplaints(
        req.query as any
      );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const complaint = await complaintService.getComplaintById(id);

      res.status(200).json({
        success: true,
        data: complaint,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const complaint = await complaintService.updateComplaint(
        id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: complaint,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      await complaintService.deleteComplaint(id);

      res.status(200).json({
        success: true,
        message: "Complaint deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ComplaintController();
