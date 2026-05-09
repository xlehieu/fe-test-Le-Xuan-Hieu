import { Task } from "@/types/task.type";

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Thiết lập cấu trúc thư mục dự án",
    description: "Cài đặt Boilerplate, cấu hình Tailwind CSS và Folder Structure chuẩn.",
    status: "done",
    priority: "high",
    assignee: "Hieu Le",
    dueDate: "2026-05-10T17:00:00Z",
    createdAt: "2026-05-01T08:30:00Z",
    tags: ["setup", "frontend"]
  },
  {
    id: "2",
    title: "Thiết kế UI cho màn hình Dashboard",
    description: "Sử dụng phong cách Modern Brutalism cho các biểu đồ thống kê.",
    status: "in_progress",
    priority: "high",
    assignee: "Hieu Le",
    dueDate: "2026-05-15T09:00:00Z",
    createdAt: "2026-05-02T10:00:00Z",
    tags: ["ui/ux", "figma"]
  },
  {
    id: "3",
    title: "Fix bug hiển thị sai định dạng ngày tháng",
    description: "Lỗi hiển thị ngày trên Safari do sai định dạng ISO.",
    status: "todo",
    priority: "medium",
    assignee: "Tech Lead",
    dueDate: "2026-05-12T12:00:00Z",
    createdAt: "2026-05-03T14:20:00Z",
    tags: ["bug", "critical"]
  },
  {
    id: "4",
    title: "Tích hợp API Authentication",
    description: "Xử lý login, logout và refresh token bằng JWT.",
    status: "in_progress",
    priority: "high",
    assignee: "Hieu Le",
    createdAt: "2026-05-04T09:00:00Z",
    tags: ["auth", "api"]
  },
  {
    id: "5",
    title: "Viết Unit Test cho Helper Functions",
    description: "Đảm bảo độ bao phủ test đạt trên 80%.",
    status: "todo",
    priority: "low",
    createdAt: "2026-05-05T11:00:00Z",
    tags: ["testing"]
  },
  {
    id: "6",
    title: "Tối ưu hóa Lighthouse Score",
    description: "Cải thiện chỉ số LCP và CLS cho trang chủ.",
    status: "todo",
    priority: "medium",
    dueDate: "2026-05-20T23:59:59Z",
    createdAt: "2026-05-06T15:45:00Z",
    tags: ["performance"]
  },
  {
    id: "7",
    title: "Nghiên cứu về Bun và ElysiaJS",
    description: "Đánh giá khả năng thay thế cho Node.js hiện tại.",
    status: "done",
    priority: "low",
    assignee: "Hieu Le",
    createdAt: "2026-04-20T08:00:00Z",
    tags: ["research"]
  },
  {
    id: "8",
    title: "Cập nhật tài liệu API (Swagger)",
    description: "Bổ sung các endpoint mới của module User.",
    status: "in_progress",
    priority: "medium",
    assignee: "Backend Dev",
    createdAt: "2026-05-07T10:30:00Z",
    tags: ["documentation"]
  },
  {
    id: "9",
    title: "Xây dựng Component Modal dùng chung",
    description: "Hỗ trợ animation và phím tắt ESC để đóng.",
    status: "done",
    priority: "medium",
    assignee: "Hieu Le",
    createdAt: "2026-05-01T13:00:00Z",
    tags: ["component-library"]
  },
  {
    id: "10",
    title: "Refactor code phần xử lý Giỏ hàng",
    description: "Sử dụng Redux Toolkit thay cho Context API để quản lý state.",
    status: "todo",
    priority: "high",
    createdAt: "2026-05-08T08:15:00Z",
    tags: ["refactor", "state-mgmt"]
  },
  {
    id: "11",
    title: "Thiết kế Logo cho dự án mới",
    status: "todo",
    priority: "low",
    createdAt: "2026-05-08T14:00:00Z",
    tags: ["design"]
  },
  {
    id: "12",
    title: "Kiểm tra bảo mật đầu vào Form",
    description: "Chống XSS và SQL Injection cho các input.",
    status: "in_progress",
    priority: "high",
    assignee: "Security Expert",
    dueDate: "2026-05-18T10:00:00Z",
    createdAt: "2026-05-07T09:00:00Z",
    tags: ["security"]
  },
  {
    id: "13",
    title: "Viết kịch bản video TikTok cho Dev",
    description: "Series 'Một ngày làm việc remote' tại quán cà phê.",
    status: "done",
    priority: "low",
    assignee: "Content Creator",
    createdAt: "2026-05-05T20:00:00Z",
    tags: ["marketing", "personal"]
  },
  {
    id: "14",
    title: "Tích hợp Google Maps API",
    description: "Hiển thị vị trí các trạm sạc xe điện.",
    status: "todo",
    priority: "medium",
    dueDate: "2026-05-25T17:00:00Z",
    createdAt: "2026-05-08T11:00:00Z",
    tags: ["map", "external-api"]
  },
  {
    id: "15",
    title: "Cấu hình CI/CD trên GitHub Actions",
    description: "Tự động deploy lên Vercel khi merge vào nhánh main.",
    status: "done",
    priority: "high",
    assignee: "DevOps",
    createdAt: "2026-05-02T16:00:00Z",
    tags: ["devops", "automation"]
  },
  {
    id: "16",
    title: "Sửa lỗi tràn layout trên Mobile",
    description: "Fix lỗi horizontal scroll trên màn hình dưới 375px.",
    status: "in_progress",
    priority: "high",
    assignee: "Hieu Le",
    dueDate: "2026-05-09T18:00:00Z",
    createdAt: "2026-05-08T15:30:00Z",
    tags: ["responsive", "bug"]
  },
  {
    id: "17",
    title: "Họp Team hàng tuần",
    description: "Báo cáo tiến độ và thảo luận các vấn đề tồn đọng.",
    status: "todo",
    priority: "medium",
    dueDate: "2026-05-11T09:00:00Z",
    createdAt: "2026-05-08T16:00:00Z",
    tags: ["meeting"]
  },
  {
    id: "18",
    title: "Nghiên cứu React Native Reanimated",
    description: "Học cách tạo animation mượt mà cho app di động.",
    status: "in_progress",
    priority: "medium",
    assignee: "Hieu Le",
    createdAt: "2026-05-06T21:00:00Z",
    tags: ["mobile", "animation"]
  },
  {
    id: "19",
    title: "Mua dụng cụ tập Gym mới",
    description: "Order tạ tay và thảm tập để duy trì sức khỏe.",
    status: "done",
    priority: "low",
    createdAt: "2026-04-28T10:00:00Z",
    tags: ["personal", "health"]
  },
  {
    id: "20",
    title: "Backup Database định kỳ",
    description: "Đảm bảo dữ liệu người dùng được sao lưu an toàn.",
    status: "todo",
    priority: "high",
    dueDate: "2026-05-15T00:00:00Z",
    createdAt: "2026-05-08T17:00:00Z",
    tags: ["database", "maintenance"]
  }
];