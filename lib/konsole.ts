namespace Konsole {
  export interface Options {
    /**
     * Ability to add custom or more colors to the console output.
     */
    colors?: Record<string, string>;
  }
}

class Konsole {
  private _colors: Record<string, string>;
  /**
   * Konsole constructor
   */
  constructor(options?: Konsole.Options) {
    this._colors = Object.assign(
      {
        // utils
        clear: "\x1b[2J",
        r: "\x1b[0m",
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        italic: "\x1b[3m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        // foregrounds
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        // backgrounds
        bgBlack: "\x1b[40m",
        bgRed: "\x1b[41m",
        bgGreen: "\x1b[42m",
        bgYellow: "\x1b[43m",
        bgBlue: "\x1b[44m",
        bgMagenta: "\x1b[45m",
        bgCyan: "\x1b[46m",
        bgWhite: "\x1b[47m",
      },
      options?.colors || {}
    );
  }

  private _colorFormat(data: string): string {
    return data.replace(/\<(\d+)\>/gm, "\x1b[$1m").replace(/\<(\d+):(\d+)\>/gm, "\x1b[$1;$2;m");
  }

  private _parse(str: string, data: object | string[], l: string, r: string): string {
    "use strict";
    if (arguments.length) {
      var t = typeof data;
      var key: any;
      var args = "string" === t || "number" === t ? Array.prototype.slice.call(data) : data;

      for (key in args) {
        str = str.replace(new RegExp(`${l}${key}${r}`, "gi"), args[key]);
      }
    }

    return str;
  }

  /**
   * ## Example
   * ```js
   * import konsole from "node-konsole";
   *
   * // <0> is the same like <r> or <reset>, but <0> is plain
   * konsole.log("<green><underscore>Green message with underscore<blue>!<0>")
   * ```
   */
  public log(string: string, data?: object | string[]): void {
    process.stdout.write(this._parse(this._colorFormat(this._parse(string, data || {}, "{", "}")) + "\n", this._colors, "<", ">"));
  }

  public error(string: string, data: object | string[]): void {
    process.stderr.write(this._parse(this._colorFormat(this._parse(string, data || {}, "{", "}")) + "\n", this._colors, "<", ">"));
  }

  public static setCursorPosition(x, y): string {
    x = x || 0;
    y = y || 0;
    return "\x1b[" + y + ";" + x + "H";
  }
}

/**
 * Public Konsole Construct.
 */
const konsole = new Konsole();

export { konsole, Konsole };
