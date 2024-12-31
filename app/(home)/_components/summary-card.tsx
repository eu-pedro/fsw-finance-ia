import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { ReactNode } from "react";

type SizeProps = "small" | "large";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: SizeProps;
  userCanAddTransaction?: boolean;
}

export function SummaryCard({
  amount,
  icon,
  size = "small",
  title,
  userCanAddTransaction,
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
}
