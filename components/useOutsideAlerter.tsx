import { useEffect } from "react";

export function useOutsideAlerter(
  ref: any,
  setHideExploreHandle: any,
  button: any
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !button?.current?.contains(event.target)
      ) {
        setHideExploreHandle();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
