import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://deptronrobotics.com/sitemap.xml",
      "https://www.deptronrobotics.com/sitemap.xml",
      "https://deptron.com.tr/sitemap.xml",
      "https://www.deptron.com.tr/sitemap.xml",
    ],
  };
}
