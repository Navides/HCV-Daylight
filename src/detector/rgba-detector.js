import { NumberExpression } from "./number-expression.js";

/**
 * RGBA表現の検出処理を提供します。
 */
class RgbaDetector {
    /**
     * 表現を検査します。
     * @param {String} expression 検査対象の表現。
     * @returns {Boolean} 検証結果(true : 一致、false : 不一致)を返します。
     */
    match(expression) {
        const values = [
            [...Array(3)].map(x => NumberExpression.numericWithMargins),
            NumberExpression.questionablePercentWithMargins
        ];
        const regExp = new RegExp(`^\\s*rgba\\(${values.join(",")}\\)\\s*$`, "i");
        return regExp.test(expression);
    }

    /**
     * 文字列中の該当表現を検出します。
     * @param {String} expression 検査対象の表現。
     * @returns {Array<String>} 検出した表現を返します。
     */
    detect(expression) {
        const values = [
            [...Array(3)].map(x => NumberExpression.numericWithMargins),
            NumberExpression.questionablePercentWithMargins
        ];
        const regExp = new RegExp(`(\\b|\\s|^)rgba\\(${values.join(",")}\\)(\\b|\\s|$)`, "gi");
        const results = (expression || "").match(regExp) || [];
        return results.map(x => x.trim());
    }
}

export { RgbaDetector };