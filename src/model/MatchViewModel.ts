export default class MatchViewModel {
    matchResult: string;
    matchId: number;
    constructor(matchResult: string, matchId: number) {
        this.matchResult = matchResult;
        this.matchId = matchId;
    }

    getDisplayMatchResult(): {homeScore: string, awayScore: string, period: string} {
        //matchResult example: "AA;HH" = 2:2
        //matchResult example: "A;HH" = 2:1 
        //matchResult example: ";HH" = 2:0

        const [away, home] = this.matchResult.split(";");
        
        // Count the number of 'A' characters for away score
        const awayScore = (away.match(/A/g) || []).length;
        
        // Count the number of 'H' characters for home score
        const homeScore = (home.match(/H/g) || []).length;
        
        return {
            homeScore: homeScore.toString(),
            awayScore: awayScore.toString(),
            period: "1st Half"
        };
    }
};
