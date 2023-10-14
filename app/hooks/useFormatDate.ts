import { format } from "date-fns";
import { useCallback } from "react";

export const useFormatDate = () => {
  const formattedDate = useCallback((date: string) => {
    const entryDate = new Date(date);
    const result = format(entryDate, "MMM d, yyyy hh:mm aaaa");
    return result;
  }, []);

  return formattedDate;
};
