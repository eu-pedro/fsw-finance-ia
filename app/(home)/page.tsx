import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch } from "date-fns";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transactions";
import { IaReportButton } from "./_components/ia-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) redirect(`?month=${new Date().getMonth() + 1}`);

  const dashboard = await getDashboard(month);

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <IaReportButton month={month} />
            <TimeSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
}
