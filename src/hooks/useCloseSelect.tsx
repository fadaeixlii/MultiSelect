import * as React from "react";
import { generateRandomString } from "../utils/utilities";

export function useCloseSelect(
  excludeRefs: React.MutableRefObject<HTMLDivElement | undefined>[] = []
) {
  const [UUID] = React.useState(generateRandomString(8));
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      let isOutside = true;

      if ((event.target as HTMLElement).closest(`#${UUID}`)) {
        isOutside = false;
      } else {
        for (const ref of excludeRefs) {
          if (ref.current && ref.current.contains(event.target as Node)) {
            isOutside = false;
            break;
          }
        }
      }

      if (isOutside) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [excludeRefs, UUID]);

  return {
    UUID,
    isOpen,
    setIsOpen,
  };
}
