export enum MatchEvent {
    AddHomeGoal = 'AddHomeGoal',
    AddAwayGoal = 'AddAwayGoal',
    CancelHomeGoal = 'CancelHomeGoal',
    CancelAwayGoal = 'CancelAwayGoal',
}
export default class MatchService {
    private static instance: MatchService;
    getInstance(): MatchService {
        if (!MatchService.instance) {
            MatchService.instance = new MatchService();
        }
        return MatchService.instance;
    }

    async getMatchResult(matchId: number): Promise<string> {
        // Simulate fetching match data
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("HH");
            }, 2000);
        });
    }

    async updateMatchResult(matchId: number, event: MatchEvent): Promise<string> {
        // Simulate fetching match data
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("HH");
            }, 2000);
        });
    }
};
