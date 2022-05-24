import { Daylight } from "../../../src/daylight.js";

describe("Daylight.getReflectionColor", () => {
    // hex8-1:
    it("hex8-1: 第1引数が16進数(8桁)の色表現の場合は、調整した色の16進数(8桁)表現が返却される", () => {
        // テストの準備
        const expression = "#001122ff";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            theme: {
                "11:00:00": "#334455",
                "13:00:00": "#bbddff"
            }
        };

        // テスト対象の処理を実行
        const result = Daylight.getReflectionColor(expression, config);

        // 結果を検証
        expect(result).toBe("#0c1e30ff");
    });

    // hex8-2:
    it("hex8-2: 第1引数が16進数(8桁)の色表現を含む場合は、調整した色の16進数(8桁)表現に置換した内容が返却される", () => {
        // テストの準備
        const expression = "linear-gradient(#001122ee, #334455ff);";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            theme: {
                "11:00:00": "#667788",
                "13:00:00": "#bbddff"
            }
        };

        // テスト対象の処理を実行
        const result = Daylight.getReflectionColor(expression, config);

        // 結果を検証
        expect(result).toBe("linear-gradient(#0f2032ee, #3c4e60ff);");
    });
});