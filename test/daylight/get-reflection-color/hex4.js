import { Daylight } from "../../../src/daylight";

// hex4
// 3桁の16進数表現(例: #0000 )に関するテスト

describe("Daylight.getReflectionColor - hex4_", () => {
    // hex4_1:
    it("1: 第1引数が16進数(4桁)の色表現の場合は、調整した色の16進数(4桁)表現が返却される", () => {
        // テストの準備
        const expression = "#012f";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            brightness: {
                "11:00:00": "#345",
                "13:00:00": "#bdf"
            }
        };
        
        // テスト対象の処理を実行
        const result = Daylight.getReflectionColor(expression, config);
        
        // 結果を検証
        expect(result).toBe("#123f");
        
        // NOTE :
        // 基本的な変換については hex3-1 を参照
        // hex4 の場合は、アルファ値に該当する4桁目が結果に付与
    });

    // hex4_2:
    it("2: 第1引数が16進数(4桁)の色表現を含む場合は、調整した色の16進数(4桁)表現に置換した内容が返却される", () => {
        // テストの準備
        const expression = "linear-gradient(#012e, #345f);";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            brightness: {
                "11:00:00": "#678",
                "13:00:00": "#bdf"
            }
        };

        // テスト対象の処理を実行
        const result = Daylight.getReflectionColor(expression, config);

        // 結果を検証
        expect(result).toBe("linear-gradient(#123e, #456f);");
    });
});