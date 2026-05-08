export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: "application" | "opportunity" | "report";
  isRead: boolean;
};

export const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Application Submitted",
    message:
      "Application for Software Engineering Internship at Tech Innovators Inc. has been submitted.",
    timeAgo: "2 days ago",
    type: "application",
    isRead: false,
  },
  {
    id: "2",
    title: "New Opportunity",
    message:
      "New internship opportunity at Global Solutions Corp. for a Marketing Assistant.",
    timeAgo: "3 days ago",
    type: "opportunity",
    isRead: false,
  },
  {
    id: "3",
    title: "Report Approved",
    message: "Your report for the week of July 10th has been approved by your supervisor.",
    timeAgo: "5 days ago",
    type: "report",
    isRead: true,
  },
  {
    id: "4",
    title: "Application Submitted",
    message:
      "Application for Data Analysis Internship at Data Insights LLC has been submitted.",
    timeAgo: "1 week ago",
    type: "application",
    isRead: true,
  },
  {
    id: "5",
    title: "New Opportunity",
    message:
      "New internship opportunity at Creative Designs Agency for a Graphic Design Intern.",
    timeAgo: "2 weeks ago",
    type: "opportunity",
    isRead: true,
  },
  {
    id: "6",
    title: "Report Approved",
    message: "Your report for the week of July 3rd has been approved by your supervisor.",
    timeAgo: "3 weeks ago",
    type: "report",
    isRead: true,
  },
];
