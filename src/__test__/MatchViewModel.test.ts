import MatchViewModel from "../model/MatchViewModel";

describe('MatchViewModel', () => {
    let matchViewModel: MatchViewModel;
    beforeEach(() => {
        matchViewModel = new MatchViewModel("AA;HH", 1);
    });

    it('should return correct display match result for second half', () => {
        const result = matchViewModel.getDisplayMatchResult();
        expect(result.homeScore).toBe("2");
        expect(result.awayScore).toBe("2");
        expect(result.period).toBe("Second Half");
    });

    it('should return correct display match result for first half', () => {
        matchViewModel.matchResult = "AAHH";
        const result = matchViewModel.getDisplayMatchResult();
        expect(result.homeScore).toBe("2");
        expect(result.awayScore).toBe("2");
        expect(result.period).toBe("First Half");
    });

    it('should handle empty scores correctly', () => {
        matchViewModel.matchResult = ";HH";
        const result = matchViewModel.getDisplayMatchResult();
        expect(result.homeScore).toBe("2");
        expect(result.awayScore).toBe("0");
        expect(result.period).toBe("Second Half");
    });

    it('should handle single scores correctly', () => {
        matchViewModel.matchResult = "A;HH";
        const result = matchViewModel.getDisplayMatchResult();
        expect(result.homeScore).toBe("2");
        expect(result.awayScore).toBe("1");
        expect(result.period).toBe("Second Half");
    });

    it('should handle no scores correctly', () => {
        matchViewModel.matchResult = "AA;H";
        const result = matchViewModel.getDisplayMatchResult();
        expect(result.homeScore).toBe("1");
        expect(result.awayScore).toBe("2");
        expect(result.period).toBe("Second Half");
    });

    it('should return Error not A or H', () => {
        matchViewModel.matchResult = "AABCHH";
        const result = matchViewModel.getDisplayMatchResult();
        expect(result.homeScore).toBe("2");
        expect(result.awayScore).toBe("2");
        expect(result.period).toBe("First Half");
    });

    describe('cancelHomeGoal', () => {
        it('should cancel last home goal', () => {
            matchViewModel.matchResult = "AA;HH";
            matchViewModel.cancelHomeGoal();
            expect(matchViewModel.matchResult).toBe("AA;H");
            
        });
        it('should cancel last home goal', () => {
            matchViewModel.matchResult = "AH;";
            matchViewModel.cancelHomeGoal();
            expect(matchViewModel.matchResult).toBe("A;");
            
        });
        it('should throw error when last action is not home goal', () => {
            matchViewModel.matchResult = "A;A";
            expect(() => matchViewModel.cancelHomeGoal()).toThrow("Cannot cancel away goal when home goal is not the last action");
        });
        it('should throw error when last action is not home goal', () => {
            matchViewModel.matchResult = "HA;";
            expect(() => matchViewModel.cancelHomeGoal()).toThrow("Cannot cancel away goal when home goal is not the last action");
        });
    })

    describe('cancelAwayGoal', () => {
        it('should cancel last away goal', () => {
            matchViewModel.matchResult = "AA;AA";
            matchViewModel.cancelAwayGoal();
            expect(matchViewModel.matchResult).toBe("AA;A");

        });
        it('should cancel last home goal', () => {
            matchViewModel.matchResult = "AA;";
            matchViewModel.cancelAwayGoal();
            expect(matchViewModel.matchResult).toBe("A;");
            
        });
        it('should throw error when last action is not away goal', () => {
            matchViewModel.matchResult = "A;H";
            expect(() => matchViewModel.cancelAwayGoal()).toThrow("Cannot cancel home goal when away goal is not the last action");
        });
        it('should throw error when last action is not away goal', () => {
            matchViewModel.matchResult = "HH;";
            expect(() => matchViewModel.cancelAwayGoal()).toThrow("Cannot cancel home goal when away goal is not the last action");
        });
    })

});