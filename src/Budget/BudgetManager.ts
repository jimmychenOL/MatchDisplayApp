import BudgetService from "./service/BudgetService";

export default class BudgetManager {
    private budgetService: BudgetService;

    constructor() {
        this.budgetService = new BudgetService();
    }

    queryTotalAmount(startDate: Date, endDate: Date): number {
        const budgets = this.budgetService.getAll();
        const startDateYear = startDate.getFullYear();
        const startDateMonth = startDate.getMonth() + 1;
        const startDateDay = startDate.getDate();

        const endDateYear = endDate.getFullYear();
        const endDateMonth = endDate.getMonth() + 1;
        const endDateDay = endDate.getDate();

        return 0
    }
};
