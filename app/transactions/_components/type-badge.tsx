import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

export function TransactionTypeBadge({
  transaction,
}: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="group bg-muted text-primary hover:bg-muted hover:bg-white">
        <CircleIcon
          className="group:hover:fill-white mr-2 fill-primary"
          size={10}
        />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="group bg-danger bg-opacity-10 font-bold text-danger hover:bg-danger hover:text-white">
        <CircleIcon
          className="mr-2 fill-danger group-hover:fill-white"
          size={10}
        />
        Despesa
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="bg-white bg-opacity-10 font-bold text-white">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Investimento
      </Badge>
    );
  }
}
