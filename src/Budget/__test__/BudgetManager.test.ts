import BudgetManager from "../BudgetManager";

describe('BudgetManager', () => {
    let budgetManager: BudgetManager;

    beforeEach(() => {
        budgetManager = new BudgetManager();
    });

    describe('queryTotalAmount', () => {
        beforeEach(() => {
            // Mocking the BudgetService to return a fixed set of budgets
            jest.spyOn(budgetManager['budgetService'], 'getAll').mockReturnValue([
                { amount: 310, yearMonth: '202508' },
                { amount: 3100, yearMonth: '202507' },
                { amount: 300, yearMonth: '202506' },
            ]);
        })
        it('should return the total budget amount for 7/30 ~ 8/14', () => {
            const startDate = new Date('2025-07-30');
            const endDate = new Date('2025-08-14');
            const total = budgetManager.queryTotalAmount(startDate, endDate);
            expect(total).toBe(340);
        });

        it('should return the total budget amount for 6/30 ~ 8/14', () => {
            const startDate = new Date('2025-06-30');
            const endDate = new Date('2025-08-14');
            const total = budgetManager.queryTotalAmount(startDate, endDate);
            expect(total).toBe(3250);
        }); 
    });
});