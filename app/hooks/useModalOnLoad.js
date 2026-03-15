"use client";

import { useEffect, useState } from "react";

export function useModalOnLoad() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return { open, setOpen };
}
