import { useState, useEffect } from "react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

export function usePublicContent<T extends object>(
  section: string,
  defaults: T,
): T {
  const [data, setData] = useState<T>(defaults);

  useEffect(() => {
    fetch(`${API_BASE}/admin/public/content/${section}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res?.data && typeof res.data === "object") {
          setData((prev) => ({ ...prev, ...(res.data as Partial<T>) }));
        }
      })
      .catch(() => {});
  }, [section]);

  return data;
}
