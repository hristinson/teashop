import { useCallback, useState, useEffect } from "react";

const useDragging = (
  ref: React.RefObject<HTMLDialogElement | null>,
  isDraggingAllowed: boolean
): any => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialRect, setInitialRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [style, setStyle] = useState({});
  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      const except = ["text", "textarea"];
      if (except.includes((e.target as HTMLInputElement).type)) return;

      e.button === 0 && setIsDragging(true);
      const rect = ref.current?.getBoundingClientRect();
      rect &&
        setInitialRect({
          x: e.clientX - (rect.x + rect.width / 2),
          y: e.clientY - (rect.y + rect.height / 2),
          width: rect.width,
          height: rect.height,
        });
    },
    [ref]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const coordsX = Math.max(
          initialRect?.width / 2,
          Math.min(
            window.innerWidth - initialRect?.width / 2,
            e.clientX - initialRect.x
          )
        );
        const coordsY = Math.max(
          initialRect?.height / 2,
          Math.min(
            window.innerHeight - initialRect?.height / 2,
            e.clientY - initialRect.y
          )
        );

        setStyle({
          left: `${coordsX}px`,
          top: `${coordsY}px`,
          pointer: `move`,
          width: initialRect.width,
        });
        if (ref.current) {
          ref.current.click();
        }
      }
    },
    [isDragging, initialRect, ref]
  );
  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    setStyle((prevCoords) => ({
      ...prevCoords,
      pointer: `default`,
    }));
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isDraggingAllowed) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    element.addEventListener("mousedown", onMouseDown);
    element.style.userSelect = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      element.removeEventListener("mousedown", onMouseDown);
      element.style.userSelect = "";
    };
  }, [handleMouseMove, onMouseUp, onMouseDown, ref, isDraggingAllowed]);

  return { style };
};

export default useDragging;
