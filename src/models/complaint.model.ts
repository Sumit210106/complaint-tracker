import { Schema, model, Document } from "mongoose";

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export const Complaint = model<IComplaint>(
  "Complaint",
  complaintSchema
);
