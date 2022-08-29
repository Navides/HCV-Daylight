import { Color } from "../color";
import { RgbaPercentDetector } from "../detector/rgba-percent-detector";

/**
 * %指定RGBA表現の抽出処理を提供します。
 */
class RgbaPercentExtractor {
    /**
     * 色情報を抽出します。
     * @param {String} expression WEBカラーの色表現。
     * @return {Color} 抽出結果を返します。
     */
    extract(expression) {
        const detector = new RgbaPercentDetector();
        if (!detector.match(expression)) return null;

        const head = expression.indexOf("(");
        const tail = expression.indexOf(")");
        const body = expression.slice(head + 1, tail);

        const values = body.split(",");
        const [ red, green, blue ] = values.slice(0, 3).map(x => Math.round(Number(x.replace(/[^0-9.]/g, "") / 100 * 255)));
        const alpha = Number(values[3].replace(/[^0-9.]/g, "")) * (values[3].indexOf("%") > 0 ? 1 : 100);

        return new Color(red, green, blue, alpha);
    }
}

export { RgbaPercentExtractor }