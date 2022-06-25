import { NumberExpression } from "./number-expression.js";

/**
 * アルファ値を含む%指定RGB表現に関する正規表現の作成処理を提供します。
 */
class RgbPercentAlphaDetector {
    /**
     * 表現を検査します。
     * @param {String} expression 検査対象の表現。
     * @returns {Boolean} 検証結果(true : 一致、false : 不一致)を返します。
     */
    match(expression) {
        const values = [
            [...Array(3)].map(x => NumberExpression.percentWithMargins),
            NumberExpression.questionablePercentWithMargins
        ].flat();
        const regExp = new RegExp(`^\\s*rgb\\(${values.join(",")}\\)\\s*$`, "i");
        return regExp.test(expression);
    }
}

export { RgbPercentAlphaDetector };