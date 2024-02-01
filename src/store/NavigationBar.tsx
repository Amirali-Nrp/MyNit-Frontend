import { useEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  action: (...args: unknown[]) => unknown
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref?.current && !ref?.current.contains(event.target as Node)) {
        action();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [action]);

  return ref;
}
