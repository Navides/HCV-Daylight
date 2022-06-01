import { Color } from "./color.js";
import { ExpressionType } from "./expression-type.js";

/**
 * HSLA表現に関連する処理を提供します。
 */
class Hsla extends ExpressionType {
}

// シングルトンとして提供
const instance = new Hsla();
export { instance as Hsla };