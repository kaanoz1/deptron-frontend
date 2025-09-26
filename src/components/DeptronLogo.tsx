"use client";

import { FC } from "react";
import Image from "next/image";

type Props = {
  width?: number;
};

const DeptronLogo: FC<Props> = ({ width }) => {
  const scale = width ?? 60;

  return (
    <Image
      className="text-white dark:invert"
      src={"/deptron_logo.svg"}
      alt={"Deptron Logo"}
      width={scale}
      height={scale}
    />
  );
};

export default DeptronLogo;
