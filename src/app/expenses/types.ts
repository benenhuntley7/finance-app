interface Expenses {
  expenses: {
    id: number;
    user_id: string;
    name: string;
    value: number;
    created_at: string;
  };
  expenseCategory?: {
    id: number;
    expense_id: number;
    name: string;
    value: number;
  };
}
