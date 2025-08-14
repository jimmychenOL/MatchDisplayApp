export default class Budget {
    amount: number;
    yearMonth: string;

    constructor(amount: number, yearMonth: string) {
        this.amount = amount;
        this.yearMonth = yearMonth;
    }
};
