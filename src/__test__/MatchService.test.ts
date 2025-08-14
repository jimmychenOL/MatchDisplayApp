import MatchService, { MatchEvent } from "../service/MatchService";

describe('MatchService', () => {
    let matchService: MatchService;
    beforeEach(() => {
        matchService = MatchService.getInstance();
    });

    it('should return match result', async () => {
        const result = await matchService.getMatchResult(1);
        expect(result).toBe("HH");
    });

    it('should update match result', async () => {
        const result = await matchService.updateMatchResult(1, MatchEvent.AddHomeGoal);
        expect(result).toBe("HH");
    });
});