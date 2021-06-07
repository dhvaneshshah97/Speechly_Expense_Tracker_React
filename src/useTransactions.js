import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);
    // All transactions with either income or expense category
    const transactionsPerType = transactions.filter((t) => t.type === title);
    // Total of all transactions (either for income chart or expense chart)
    const total = transactionsPerType.reduce((acc, currVal) => acc += currVal.amount, 0);
    // Fetching all the categories based on title (either income or expense)
    const categories = title === "Income" ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((t) => {
        const categoryObject = categories.find((c) => c.type === t.category);
        if (categoryObject) categoryObject.amount += t.amount;
    });

    const filteredCategories = categories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type),
    }

    return { total, chartData };

}

export default useTransactions;