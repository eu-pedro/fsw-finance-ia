"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionProps {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}
export async function upsertTransaction(data: UpsertTransactionProps) {
  upsertTransactionSchema.parse(data);

  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");
  await db.transaction.upsert({
    where: {
      id: data.id ?? "",
    },
    update: {
      ...data,
      userId,
    },
    create: {
      ...data,
      userId,
    },
  });

  revalidatePath("/transactions");
}
