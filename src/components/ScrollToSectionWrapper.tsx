import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToSectionWrapper({
  children,
  scrollTo,
}: {
  children: React.ReactNode;
  scrollTo?: string;
}) {
  const location = useLocation();

  useEffect(() => {
    const scroll = () => {
      if (scrollTo) {
        const el = document.getElementById(scrollTo);
        if (el) {
          const yOffset = -96; // Adjust if your header is taller/shorter
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    requestAnimationFrame(() => setTimeout(scroll, 100));
  }, [location.pathname, scrollTo]);

  return <>{children}</>;
}
