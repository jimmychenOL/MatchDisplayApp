import { useEffect, useState } from "react";
import MatchService from "../service/MatchService";
import MatchViewModel from "../model/MatchViewModel";

export const useMatchDisplay = () => {
    const [homeScore, setHomeScore] = useState<string>("");
    const [awayScore, setAwayScore] = useState<string>("");
    const [period, setPeriod] = useState<string>("");

    const getMatchResult = async (matchId: number) => {
        const matchService = MatchService.getInstance();
        const matchResult = await matchService.getMatchResult(matchId);
        const matchViewModel = new MatchViewModel(matchResult, matchId);
        const displayResult = matchViewModel.getDisplayMatchResult();
        setHomeScore(displayResult.homeScore);
        setAwayScore(displayResult.awayScore);
        setPeriod(displayResult.period);
    }

    useEffect(() => {

    }, []);

    return {
        getMatchResult,
        homeScore,
        awayScore,
        period
    }
    // const matchViewModel = new MatchViewModel(matchResult, matchId);
    // return matchViewModel.getDisplayMatchResult();
};
