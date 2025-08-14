import BudgetService from "./service/BudgetService";

export default class BudgetManager {
    private budgetService: BudgetService;

    constructor() {
        this.budgetService = new BudgetService();
    }

    queryTotalAmount(startDate: Date, endDate: Date): number {
        const budgets = this.budgetService.getAll();
        let totalAmount = 0;

        // Create a date iterator from startDate to endDate
        const currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const yearMonth = `${year}${month.toString().padStart(2, '0')}`;
            
            // Find budget for current year-month
            const budget = budgets.find(b => b.yearMonth === yearMonth);
            
            if (budget) {
                // Calculate daily amount for this month
                const daysInMonth = new Date(year, month, 0).getDate();
                const dailyAmount = budget.amount / daysInMonth;
                totalAmount += dailyAmount;
            }
            
            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return Math.round(totalAmount);
    }
};
