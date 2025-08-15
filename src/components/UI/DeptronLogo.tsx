"use client";

import { FC } from "react";
import DeptronSVG from "@/assets/svgs/deptron_logo.svg";

type DeptronLogoProps = { className?: `h-${number}` };

const DeptronLogo: FC<DeptronLogoProps> = ({ className }) => {
    return <DeptronSVG className={`${className ?? "h-15"} w-auto`} />;
};

export default DeptronLogo;
