import { Feature, featureBlock } from "@/types/interfaces";

export const features: Feature[] = [
  {
    imageUrl: "/features/bar-chart.png",
    title: "Thống kê",
    content:
      "Trực quan hóa số liệu của tòa nhà, căn hộ, nhân viên, cư dân, và các thông tin khác. Hỗ trợ quản lý tài chính, dịch vụ, tiện ích, và các thông tin khác.",
  },
  {
    imageUrl: "/features/calendar.png",
    title: "Quản lý các dịch vụ, các tòa nhà, căn hộ",
    content:
      "Hỗ trợ hiệu quả các dịch vụ, tiện ích gắn liền với quản lý tòa nhà, căn hộ, nhân viên, cư dân, và các thông tin khác.",
  },
  {
    imageUrl: "/features/protect.png",
    title: "Hỗ trợ tiếp nhận và phản hồi khiếu nại",
    content:
      "Hỗ trợ ban quản lý tiếp nhận và xử lý khiếu nại của cư dân, hỗ trợ điều phối cho các bộ phận liên quan giải quyết khiếu nại một cách nhanh chóng và hiệu quả.",
  },
];

export const featuresBlock: featureBlock[] = [
  {
    imageUrl: "/features/messaing.svg",
    title: "Hỗ trợ chatbot",
    content:
      "Tùy chỉnh chatbot để hỗ trợ khách hàng 24/7, giúp giải đáp thắc mắc và cung cấp thông tin chi tiết về sản phẩm và dịch vụ của bạn.",
  },
  {
    imageUrl: "/features/task-management.svg",
    title: "Quản lý các trang thiết bị của chung cư",
    content:
      "Cung cấp bộ công cụ mạnh mẽ để quản lý các trang thiết bị của chung cư, đem lại sự tiện nghi, kịp thời quản lý các thiết bị khi gặp các vấn đề kỹ thuật.",
    isReversed: true,
  },
];
