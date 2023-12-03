import { useCallback } from "react";

export const useFormatEntryText = () => {
  const formattedText = useCallback((formatText: string) => {
    const linkRegex = /\[([^\]]+) ([^\]]+)\]/g;
    const spoilerRegex = /--`spoiler`--/g;
    const placeholderRegex = /`:(.*?)`/g;

    const formatted = formatText
      .replace(linkRegex, (_: any, linkText: string, linkURL: string) => {
        return `<a target="blank" href="${linkText}" style="color: #10b981; cursor: pointer;">${linkURL}</a>`;
      }) // regular expression for links. ex [https://google.com, google] -> first link, second alias
      .replace(
        spoilerRegex,
        '<span style="color: #10b981; cursor: pointer; display:flex; flex-direction:column">--spoiler--</span>'
      ) // spoiler tag
      .replace(
        placeholderRegex,
        (_, match) =>
          `<a style="color: #10b981; cursor: pointer;" href="/topic/${match}">*</a>`
      ); // astericks. reference to tag
    return formatted;
  }, []);

  return formattedText;
};
