const CSS_LIGHT = "font-weight: lighter";
const CSS_BOLD = "font-weight: bold";

const CSS_GRAY = "color: gray";
const CSS_INFO = "color: #369";
const CSS_WARN = "color: orange";
const CSS_ERR = "color: maroon";

const CSS_TITLE = [CSS_GRAY, CSS_BOLD];
const CSS_KEY_INFO = [CSS_INFO, CSS_LIGHT];
const CSS_KEY_WARN = [CSS_WARN, CSS_BOLD];
const CSS_KEY_ERR = [CSS_ERR, CSS_BOLD];

export function styleLogger(title: string, key: string = "DATA") {
  const isDev = process.env.NODE_ENV === "development";
  function log(data: any, ...rest: any) {
    isDev &&
      console.log(
        `%c${title}\n  %c${key} `,
        CSS_TITLE.join(";"),
        CSS_KEY_INFO.join(";"),
        data,
        ...rest
      );
  }
  function warn(data: any, ...rest: any) {
    isDev &&
      console.log(
        `%c${title}\n  %c${key} `,
        CSS_TITLE.join(";"),
        CSS_KEY_WARN.join(";"),
        data,
        ...rest
      );
  }
  function err(data: any, ...rest: any) {
    isDev &&
      console.log(
        `%c${title}\n  %c${key} `,
        CSS_TITLE.join(";"),
        CSS_KEY_ERR.join(";"),
        data,
        ...rest
      );
  }
  return [log, warn, err];
}
