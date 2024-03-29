import { useEffect } from "react";
export default function useOnScreen(ref, setShow) {
  //   const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      setShow(!entry.isIntersecting);
    },
    {
      threshold: 0.99,
    }
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  //   return isIntersecting;
}
