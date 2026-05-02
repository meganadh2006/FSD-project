import { ArrowRight, Heart, Shield, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface DeliveryTimelineStep {
  title: string;
  dateLabel: string;
  isComplete: boolean;
}

export const landingStatsFallback = {
  activeDonors: "2.5K+",
  peopleHelped: "1.8K+",
  activeDrives: "12",
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Sign Up",
    description: "Create your account and choose your role",
    icon: Users,
  },
  {
    step: 2,
    title: "Create or Request",
    description: "Post donations or request essential items",
    icon: Heart,
  },
  {
    step: 3,
    title: "Connect",
    description: "Match with logistics coordinators",
    icon: TrendingUp,
  },
  {
    step: 4,
    title: "Track & Impact",
    description: "Monitor deliveries and see your impact",
    icon: Shield,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Donor",
    content:
      "ReliefLink made it so easy to donate items during the emergency. I could see exactly where my donations went.",
    avatar: "SJ",
  },
  {
    name: "Ahmed Hassan",
    role: "Recipient",
    content:
      "When disaster struck, ReliefLink connected me with essential supplies within 48 hours. Truly grateful.",
    avatar: "AH",
  },
  {
    name: "Maria Garcia",
    role: "Logistics Coordinator",
    content:
      "The platform makes coordination seamless. We managed 500+ deliveries last month efficiently.",
    avatar: "MG",
  },
];

export const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export const aboutValues: AboutValue[] = [
  {
    title: "Transparency",
    description: "Every donation is tracked and verified",
  },
  {
    title: "Efficiency",
    description: "Fast matching and delivery of relief items",
  },
  {
    title: "Community",
    description: "Building networks of care and support",
  },
  {
    title: "Accessibility",
    description: "Available to everyone, regardless of background",
  },
];

export const deliveryTimeline: DeliveryTimelineStep[] = [
  {
    title: "Requested",
    dateLabel: "Jan 20",
    isComplete: true,
  },
  {
    title: "In Transit",
    dateLabel: "Jan 22",
    isComplete: true,
  },
  {
    title: "Delivered",
    dateLabel: "Expected soon",
    isComplete: false,
  },
];
