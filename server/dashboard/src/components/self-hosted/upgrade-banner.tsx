"use client";

import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const subscribeToNothing = () => () => {};

interface UpgradeBannerProps {
  id: string;
  message: string;
  ctaLabel: string;
  ctaUrl: string;
  variant: "cloud" | "enterprise";
  dismissible?: boolean;
}

export function UpgradeBanner({
  id,
  message,
  ctaLabel,
  ctaUrl,
  variant,
  dismissible = true,
}: UpgradeBannerProps) {
  // null until mounted on the client, where localStorage can be read.
  const storedDismissed = useSyncExternalStore(
    subscribeToNothing,
    () => localStorage.getItem(`nudge_${id}_dismissed`) === "true",
    () => null,
  );
  const [dismissed, setDismissed] = useState(false);

  if (storedDismissed === null || storedDismissed || dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(`nudge_${id}_dismissed`, "true");
    setDismissed(true);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-md typo-body-xs font-fustat",
        variant === "cloud"
          ? "bg-memGold-100 border-l-2 border-memGold-500"
          : "bg-memRed-100 border-l-2 border-memRed-400",
      )}
    >
      <p className="flex-1 text-onSurface-default-secondary">{message}</p>
      <a
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-xs font-medium whitespace-nowrap underline",
          variant === "cloud" ? "text-memGold-700" : "text-memRed-600",
        )}
      >
        {ctaLabel}
      </a>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="p-0.5 rounded hover:bg-surface-default-secondary-hover text-onSurface-default-tertiary"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
