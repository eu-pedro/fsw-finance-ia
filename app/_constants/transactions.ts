import { TransactionPaymentMethod, TransactionType } from "@prisma/client";

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Comida",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "BOleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    label: "Depósito",
    value: TransactionType.DEPOSIT,
  },
  {
    label: "Despesa",
    value: TransactionType.EXPENSE,
  },
  {
    label: "Investimento",
    value: TransactionType.INVESTMENT,
  },
];

export const PAYMENT_METHOD_OPTIONS = [
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
    value: TransactionPaymentMethod.BANK_TRANSFER,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
    value: TransactionPaymentMethod.BANK_SLIP,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
    value: TransactionPaymentMethod.CASH,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
    value: TransactionPaymentMethod.CREDIT_CARD,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
    value: TransactionPaymentMethod.DEBIT_CARD,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
    value: TransactionPaymentMethod.OTHER,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
    value: TransactionPaymentMethod.PIX,
  },
];
