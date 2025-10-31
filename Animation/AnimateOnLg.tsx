import { useEffect, useState } from "react";

function AnimateOnLg({
  children,
  Animation,
}: {
  children: React.ReactNode;
  Animation: React.ComponentType<{ children: React.ReactNode }>;
}) {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLg ? <Animation>{children}</Animation> : <>{children}</>;
}

export default AnimateOnLg;
