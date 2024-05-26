import Button from "@/components/Button";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureCard from "@/components/FeatureCard";
import Heading from "@/components/Heading";
import PricingSection from "@/components/PricingSection";
import TestimonialCard from "@/components/TestimonialCard";
import { clients } from "@/constants/clients";
import { features, featuresBlock } from "@/constants/features";
import { testimonials } from "@/constants/testimonials";
import { ArrowRightCircle, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HomeLand",
  description: "best modern crm dashboard for engineering teams",
};

export default function Home() {
  return (
    <body
      className={`${inter.className} bg-slate-900 text-slate-400 text-lg min-h-screen`}
    >
      <Navbar />

      <main className={` overflow-x-hidden pt-24 lg:pt-28 antialiased`}>
        <div className="relative container">
          <Image
            src="/bg.png"
            width={1920}
            height={1080}
            alt="test"
            className="absolute -z-50 w-full min-h-screen md:max-h-[670px] md:h-full lg:min-h-screen -top-20 left-0 opacity-10"
          />
          {/* Home section */}
          <section id="home" className="relative">
            <figure className="bubble w-96 lg:w-[520px] h-96 bg-indigo-600 top-16 -left-40" />
            <figure className="bubble w-96 lg:w-[430px] h-96 bg-sky-600 bottom-16 md:bottom-44  -right-20 md:right-20" />
            <div className="flex flex-col text-center space-y-12">
              <div className="flex flex-col items-center space-y-6">
                <Heading title="Giải pháp công nghệ cho việc quản lý chung cư" />
                <p className="max-w-[46rem] leading-normal sm:text-lg sm:leading-8">
                  Tái định nghĩa trải nghiệm quản lý chung cư với Bảng Điều
                  Khiển Toàn Diện - Nền tảng chuyên nghiệp hàng đầu, nâng tầm
                  chất lượng cuộc sống và mang lại tiện ích vượt trội cho cư
                  dân, qua việc kiểm soát và tối ưu hóa mọi khía cạnh của việc
                  quản lý.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="https://www.facebook.com/ManhHoDinh.03/">
                    <Button>
                      Trải nghiệm ngay
                      <MoveRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="#testimonials">
                    <Button variant="outline">Các nhận xét</Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/Hero-image.svg"
                width={670}
                height={370}
                alt="banner"
                className="mx-auto shadow-xl"
              />
            </div>
          </section>
          {/* Home section */}

          {/* Clients section */}
          <section
            id="clients"
            className="max-w-[62rem] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-4"
          >
            {clients.map((client, index) => (
              <Image
                key={index}
                src={client.imageUrl}
                width={120}
                height={80}
                alt={client.alt}
                className="w-40 md:w-full mx-auto"
              />
            ))}
          </section>
          {/* Clients section */}

          {/* Features section */}
          <section
            id="features"
            className="flex flex-col gap-y-12 md:gap-y-20 lg:gap-y-28"
          >
            {/* Part 1 */}
            <div
              className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
              style={{ justifyContent: "center" }}
            >
              <Image
                src="/bg2.png"
                width={1920}
                height={1080}
                alt="second banner"
                className="absolute -z-50 w-[1400px] h-[670px] top-0 left-0 opacity-5"
              />
              <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-start">
                <Heading title="Các tính năng mạnh mẽ hỗ trợ tối ưu quản lý chung cư" />
                <p
                  style={{ justifyContent: "center", textAlign: "justify" }}
                  className="lg:max-w-[34rem] leading-normal sm:text-lg sm:leading-8"
                >
                  Giúp cho việc quản lý các hoạt động trong khu chung cư trở nên
                  dễ dàng và hiệu quả hơn. Các tính năng này bao gồm quản lý
                  thông tin cư dân, quản lý phí dịch vụ, quản lý thông tin tài
                  sản cộng đồng, và hỗ trợ trong việc giải quyết các vấn đề phát
                  sinh. Bằng cách tận dụng công nghệ, người quản lý chung cư có
                  thể tiết kiệm thời gian, công sức và tăng cường sự minh bạch
                  trong quá trình quản lý.
                </p>
                <Button>Liên hệ</Button>
              </div>
              <div
                className="grid md:grid-cols-2 lg:grid-cols-1 gap-4"
                style={{ justifyContent: "center", textAlign: "justify" }}
              >
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
            {/* Part 1 */}

            {/* Part 2 */}
            {featuresBlock.map((item, index) => (
              <FeatureBlock key={index} {...item} />
            ))}
            {/* Part 2 */}
          </section>
          {/* Features section */}

          {/* Pricing section */}
          {/* <PricingSection />
           */}
          {/* Pricing section */}

          {/* Testimonials section */}
          <section id="testimonials" className="flex flex-col gap-8">
            <Heading title="Meet our Customers" isCentered />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </section>
          {/* Testimonials section */}

          {/* Contact section */}
          <section id="contact">
            <div className="bg-slate-800 rounded-lg px-8 lg:px-24 py-8 lg:py-12 flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col gap-4 text-center lg:text-start">
                <Heading title="Trải nghiệm dịch vụ của chúng tôi ngay!" />
                <p className="max-w-[38rem] leading-normal text-lg">
                  Trải nghiệm bộ công cụ mạnh mẽ tối ưu quá trình quản lý chung
                  cư. Liên hệ để biết thêm chi tiết và có nhiều thông tin khuyến
                  mãi!
                </p>
              </div>
              <Link href="https://www.facebook.com/ManhHoDinh.03/">
                <Button>
                  Liên Hệ
                  <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </section>
          {/* Contact section */}
        </div>
      </main>
      <Footer />
    </body>
  );
}
