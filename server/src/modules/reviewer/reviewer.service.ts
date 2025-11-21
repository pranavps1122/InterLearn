import reviewerApplication from "./reviewerApplication.model";
import { IReviewerApplication } from "./reviewerApplication.interface";

export default class ReviewerService {
  async BecomeReviewerForm(data: Partial<IReviewerApplication>) {
    const application = await reviewerApplication.create(data);
    return {
      message: "Reviewer application created",
      applicationId: application._id,
    };
  }
}
