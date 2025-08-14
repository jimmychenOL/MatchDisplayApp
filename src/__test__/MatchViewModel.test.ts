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
});