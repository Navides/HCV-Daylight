import { Daylight } from "../src/daylight.js";

describe("Daylight.getReflectionColor", () => {
    // 1:
    it("1: 第1引数が色表現ではない/色表現を含まない場合は、そのまま返却される", () => {
        // テストの準備
        const daylight = new Daylight();
        const expression = "not color";

        // テスト対象の処理を実行
        const actual = daylight.getReflectionColor(expression);

        // 結果を検証
        expect(actual).toBe(expression);
    });

    // hex3-1:
    it("hex3-1: 第1引数が16進数(3桁)の色表現の場合は、調整した色の16進数(3桁)表現が返却される", () => {
        // テストの準備
        const daylight = new Daylight();
        const expression = "#012";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            theme: {
                "11:00:00": "#345",
                "13:00:00": "#bdf"
            }
        };
        
        // テスト対象の処理を実行
        const actual = daylight.getReflectionColor(expression, config);
        
        // 結果を検証
        expect(actual).toBe("#123");
        
        // NOTE :
        // 16進数(3桁)の各桁が示す値はRGB値で言うところの17を乗算した値となっている
        //  例 : 1 = 17, 2 = 34, 3 = 51
        //
        // 処理結果が17で割り切れる場合は n/17 の16進数表記を桁とするので問題ない
        //  例 : rgb(0, 17, 34) > #012
        //
        // 処理結果が17で割り切れない場合は、最も近い17の倍数に丸めた値を結果とする
        //  例 : rgb(1, 8, 9) > #001
    });

    // hex3-2:
    it("hex3-2: 第1引数が16進数(3桁)の色表現を含む場合は、調整した色の16進数(3桁)表現に置換した内容が返却される", () => {
        // テストの準備
        const daylight = new Daylight();
        const expression = "linear-gradient(#012, #345);";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            theme: {
                "11:00:00": "#678",
                "13:00:00": "#bdf"
            }
        };

        // テスト対象の処理を実行
        const actual = daylight.getReflectionColor(expression, config);

        // 結果を検証
        expect(actual).toBe("linear-gradient(#123, #456);");
    });

    // hex6-1:
    it("hex6-1: 第1引数が16進数(6桁)の色表現の場合は、調整した色の16進数(6桁)表現が返却される", () => {
        // テストの準備
        const daylight = new Daylight();
        const expression = "001122";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            theme: {
                "11:00:00": "#334455",
                "13:00:00": "#bbddff"
            }
        };

        // テスト対象の処理を実行
        const actual = daylight.getReflectionColor(expression, config);

        // 結果を検証
        expect(actual).toBe("#0c1e30");
    });

    // hex6-2:
    it("hex6-2: 第1引数が16進数(6桁)の色表現を含む場合は、調整した色の16進数(6桁)表現に置換した内容が返却される", () => {
        // テストの準備
        const daylight = new Daylight();
        const expression = "linear-gradient(#001122, #334455);";
        const config = {
            now: new Date(2000, 0, 1, 12, 0, 0),
            impact: 0.1,
            theme: {
                "11:00:00": "#667788",
                "13:00:00": "#bbddff"
            }
        };

        // テスト対象の処理を実行
        const actual = daylight.getReflectionColor(expression, config);

        // 結果を検証
        expect(actual).toBe("linear-gradient(#0f2032, #3c4e60);");
    });
});