import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://deptronrobotics.com",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://www.deptronrobotics.com",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },

    {
      url: "https://deptron.com.tr",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },

    {
      url: "https://www.deptron.com.tr",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
  ];
}
