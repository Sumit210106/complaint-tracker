import { Complaint, IComplaint } from "../models/complaint.model";
interface GetComplaintsQuery {
  search?: string;
  status?: string;
  category?: string;
  priority?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

class ComplaintService {
  async createComplaint(data: Partial<IComplaint>) {
    if (!data.title || !data.description || !data.category) {
      throw new Error("Title, description and category are required");
    }

    const complaint = await Complaint.create(data);
    return complaint;
  }

  async getAllComplaints(query: GetComplaintsQuery) {
    const {
      search,
      status,
      category,
      priority,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const filter: Record<string, any> = {};

    // 🔍 Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 🎯 Filters
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    const skip = (page - 1) * limit;

    const complaints = await Complaint.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await Complaint.countDocuments(filter);

    return {
      data: complaints,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getComplaintById(id: string) {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      throw new Error("Complaint not found");
    }
    return complaint;
  }

  async updateComplaint(id: string, data: Partial<IComplaint>) {
    const complaint = await Complaint.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!complaint) {
      throw new Error("Complaint not found");
    }

    return complaint;
  }

  async deleteComplaint(id: string) {
    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      throw new Error("Complaint not found");
    }

    return complaint;
  }
}

export default new ComplaintService();
