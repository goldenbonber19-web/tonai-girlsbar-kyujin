"use client";

import { useEffect } from "react";
import { useShopStore } from "@/lib/store";

export function StoreHydration() {
  useEffect(() => {
    useShopStore.persist.rehydrate();
  }, []);

  return null;
}
