import { useCallback } from "react";

export const useFormatEntryText = () => {
  const formattedText = useCallback((formatText: string) => {
    const linkRegex = /\[([^\]]+) ([^\]]+)\]/g;
    const spoilerRegex = /--`spoiler`--/g;
    const placeholderRegex = /`:(.*?)`/;

    const formatted = formatText
      .replace(linkRegex, (_: any, linkText: string, linkURL: string) => {
        return `<a target="blank" href="${linkText}" style="color: #10b981; cursor: pointer;">${linkURL}</a>`;
      })
      .replace(
        spoilerRegex,
        '<span style="color: #10b981; cursor: pointer; display:flex; flex-direction:column">--spoiler--</span>'
      )
      //@ts-ignore
      .replace(placeholderRegex, (text) => {
        const extractedText = text.match(placeholderRegex);
        if (extractedText) {
          return `<a style="color: #10b981; cursor: pointer;" href="/topic/${extractedText[1]}">*</a>`;
        }
      });

    return formatted;
  }, []);

  return formattedText;
};
