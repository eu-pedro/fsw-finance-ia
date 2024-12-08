"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionProps {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}
export async function addTransaction(data: AddTransactionProps) {
  addTransactionSchema.parse(data);

  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");
  await db.transaction.create({
    data: { ...data, userId },
  });

  revalidatePath("/transactions");
}
