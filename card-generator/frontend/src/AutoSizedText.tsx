import { useState, useRef, useLayoutEffect, useEffect, FC } from "react";
import stringWidth from "string-width";

type AutoSizedTextProps = {
  text: string;
  className: string;
};

export const AutoSizedText: FC<AutoSizedTextProps> = ({ text, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [fontSize, setFontSize] = useState("auto");
  useEffect(() => {
    const sizePx = Math.min((width / stringWidth(text)) * 2, 24);
    setFontSize(`${sizePx}px`);
  }, [width, text]);

  useLayoutEffect(() => {
    // @ts-ignore
    const obs = new ResizeObserver((e) => setWidth(e[0].contentRect.width));
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ fontSize: fontSize }}>
      {text}
    </div>
  );
};
