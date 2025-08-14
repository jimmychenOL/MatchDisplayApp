export default class MatchViewModel {
    matchResult: string;
    matchId: number;
    constructor(matchResult: string, matchId: number) {
        this.matchResult = matchResult;
        this.matchId = matchId;
    }

    getDisplayMatchResult(): { homeScore: string, awayScore: string, period: string } {
        //matchResult example: "AA;HH" = 2:2 (下半場)
        //matchResult example: "A;HH" = 2:1 (下半場)
        //matchResult example: ";HH" = 2:0 (下半場)
        //matchResult example: "AAHH" = 2:2 (上半場)

        // 檢查是否有分號來決定是上半場還是下半場
        const hasSemicolon = this.matchResult.includes(";");
        const period = hasSemicolon ? "Second Half" : "First Half";

        const awayScore = (this.matchResult.match(/A/g) || []).length;
        const homeScore = (this.matchResult.match(/H/g) || []).length;

        return {
            homeScore: homeScore.toString(),
            awayScore: awayScore.toString(),
            period: period
        };
    }

    addHomeGoal() {
        this.matchResult += "H";
    }

    addAwayGoal() {
        this.matchResult += "A";
    }

    cancelHomeGoal() {
        // 取得最後一個字元
        const lastChar = this.matchResult.slice(-1);
        // 如果最後一個字元是 'H'，則移除它
        if (lastChar === 'H') {
            this.matchResult = this.matchResult.slice(0, -1);
        }else if (lastChar === ';'){
            // 如果最後是分號，需要檢查分號前一個字元
            if (this.matchResult.length >= 2) {
                const secondLastChar = this.matchResult.slice(-2, -1);
                if (secondLastChar === 'H') {
                    // 如果分號前是 H，刪除這個 H
                    this.matchResult = this.matchResult.slice(0, -2) + ';';
                } else if (secondLastChar === 'A') {
                    throw new Error("Cannot cancel away goal when home goal is not the last action");
                }
            }
        }else if (lastChar === 'A'){
            throw new Error("Cannot cancel away goal when home goal is not the last action");
        }
    }

    cancelAwayGoal() {
        // 取得最後一個字元
        const lastChar = this.matchResult.slice(-1);
        
        // 如果最後一個字元是 'A'，則移除它
        if (lastChar === 'A') {
            this.matchResult = this.matchResult.slice(0, -1);
        } else if (lastChar === ';') {
            // 如果最後是分號，需要檢查分號前一個字元
            if (this.matchResult.length >= 2) {
                const secondLastChar = this.matchResult.slice(-2, -1);
                if (secondLastChar === 'A') {
                    // 如果分號前是 A，刪除這個 A
                    this.matchResult = this.matchResult.slice(0, -2) + ';';
                } else if (secondLastChar === 'H') {
                    throw new Error("Cannot cancel home goal when away goal is not the last action");
                }
            }
        } else if (lastChar === 'H') {
            throw new Error("Cannot cancel home goal when away goal is not the last action");
        }
    }
};
