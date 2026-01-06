import { useState, useEffect, useRef } from "react";

const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Stop observing once the component is in view
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.disconnect();
    };
  }, []);

  return { isInView, elementRef };
};

export default useInView;
