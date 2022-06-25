import { NumberExpression } from "./number-expression.js";

/**
 * RGBA表現に関する正規表現の作成処理を提供します。
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
}

export { RgbaDetector };