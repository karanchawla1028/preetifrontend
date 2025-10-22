// Sample Data
export const data = [
  {
    id: 1,
    name: "Avnish Kumar",
    email: "avnish@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Preeti Sharma",
    email: "preeti@example.com",
    status: "Inactive",
  },
  { id: 3, name: "Ravi Verma", email: "ravi@example.com", status: "Active" },
  { id: 3, name: "Sneha Patel", email: "sneha@example.com", status: "Active" },
  { id: 4, name: "Amit Singh", email: "amit@example.com", status: "Inactive" },
  { id: 5, name: "Priya Das", email: "priya@example.com", status: "Active" },
];

export const categoryData = [
  {
    id: 1,
    name: "PreetiNest Global Connect",
    description:
      "PreetiNest Global Connect is a Canada-based corporate travel and events solutions company specializing in seamless event management, business travel coordination, and customized corporate packages. We simplify logistics, save costs, and ensure smooth execution for corporate meetings, conferences, and more, partnering with trusted hotels, airlines, and vendors across Canada.",
    metaTitle: "PreetiNest Global Connect - Corporate Travel & Event Solutions",
    metaKeyword:
      "corporate events, business travel, event management, conference planning, Canada travel solutions",
    metaDescription:
      "PreetiNest Global Connect offers corporate travel and event solutions in Canada, managing meetings, conferences, and travel logistics with cost-effective, reliable services.",
    slug: "preetinest-global-connect",
    active: true,
    createdAt: "2025-10-15T23:58:26.069867",
    updatedAt: "2025-10-15T23:58:26.069867",
    createdById: 1,
    subCategoryIds: null,
  },
  {
    id: 2,
    name: "Corporate Event Management",
    description:
      "PreetiNest Global Connect provides comprehensive corporate event management services, including planning and executing meetings, conferences, and training sessions. We handle logistics, venue selection, AV setup, catering, and on-site coordination to ensure seamless events across Canada.",
    metaTitle: "Corporate Event Management - PreetiNest Global Connect",
    metaKeyword:
      "corporate event planning, conference management, meeting coordination, event logistics, Canada events",
    metaDescription:
      "PreetiNest Global Connect specializes in corporate event management, offering end-to-end solutions for meetings and conferences in Canada with professional, reliable service.",
    slug: "corporate-event-management",
    active: true,
    createdAt: "2025-10-15T23:59:07.668826",
    updatedAt: "2025-10-15T23:59:07.668826",
    createdById: 1,
    subCategoryIds: null,
  },
];

export const subcategoryData = [
  {
    description:
      "PreetiNest Global Connect offers expert conference planning services, including venue selection, AV and technical setup, catering coordination, and on-site support to ensure successful corporate conferences across Canada.",
    active: true,
    displayStatus: true,
    uuid: "1dc1be88-19ff-48ad-973e-01591979f065",
    metaDescription:
      "PreetiNest Global Connect provides professional conference planning services, managing venues, catering, and technical setup for seamless corporate events in Canada.",
    createdAt: "2025-10-16T00:01:10.416796",
    metaTitle: "Conference Planning - PreetiNest Global Connect",
    name: "Conference Planning",
    id: 1,
    slug: "conference-planning",
    createdById: 1,
    categoryId: 1,
    metaKeyword:
      "conference planning, corporate events, event coordination, Canada conferences, AV setup",
    updatedAt: "2025-10-16T00:01:10.416796",
  },
];

export const services = [
  {
    image: "https://preetinest.com/assets/images/onsite-support.jpg",
    description:
      "PreetiNest Global Connect provides professional on-site event support for corporate conferences, including real-time coordination, staff management, and technical assistance to ensure flawless execution.",
    active: true,
    showOnHome: true,
    displayStatus: true,
    subCategoryId: 1,
    uuid: "ef3a7d36-b540-41e6-899d-8ffaa9b3a68d",
    categoryName: "PreetiNest Global Connect",
    metaDescription:
      "PreetiNest Global Connect offers on-site event support for corporate conferences, ensuring seamless coordination and technical assistance across Canada.",
    subCategoryName: "Conference Planning",
    createdAt: "2025-10-16T00:03:27.736602",
    metaTitle: "On-Site Event Support - PreetiNest Global Connect",
    name: "On-Site Event Support",
    id: 1,
    iconUrl: "https://preetinest.com/assets/icons/onsite-support-icon.png",
    categoryId: 1,
    slug: "on-site-event-support",
    createdById: 1,
    metaKeyword:
      "on-site event support, conference coordination, event staff, technical assistance, Canada events",
    updatedAt: "2025-10-16T00:03:27.736602",
  },
];
