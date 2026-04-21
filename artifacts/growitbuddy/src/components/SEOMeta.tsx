import { useEffect } from "react";

interface SEOMetaProps {
  title: string;
  description: string;
}

export default function SEOMeta({ title, description }: SEOMetaProps) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}
