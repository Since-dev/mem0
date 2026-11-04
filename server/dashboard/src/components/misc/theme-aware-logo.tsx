"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const subscribeToNothing = () => () => {};

export default function ThemeAwareLogo({
  width = 120,
  height = 40,
}: {
  width?: number;
  height?: number;
}) {
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const { theme, resolvedTheme } = useTheme();

  if (!mounted) {
    return <div style={{ width, height }} />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const logoSrc =
    currentTheme === "dark" ? "/images/dark.svg" : "/images/light.svg";

  return <Image src={logoSrc} alt="Mem0.ai" width={width} height={height} />;
}
