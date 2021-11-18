import { useEffect, useState } from "react";

function useInterval(delay: number, maxOccurrences: number) {
  const [ticker, setTicker] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () =>
        setTicker((t: number) => {
          if (t + 1 >= maxOccurrences) {
            clearInterval(timer);
          }
          return t + 1;
        }),
      delay
    );
    return () => clearInterval(timer);
  }, [delay]);

  return ticker;
}

export { useInterval };
