import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Deptron Robotics",
    short_name: "Deptron",
    description:
      "Deptron is a warehouse robot startup founded by a team of engineers from Yıldız Technical University.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/deptron_logo.png",
        sizes: "500x500",
        type: "image/png",
      },
    ],
  };
}
