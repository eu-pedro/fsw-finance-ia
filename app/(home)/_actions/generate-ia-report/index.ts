"use server";
import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { generateAiReportSchema, GenerateAiReportSchema } from "./schema";

const DUMMY_REPORT =
  "Este recurso utiliza a tecnologia GPT para criar conteúdos personalizados e insights avançados diretamente no seu fluxo de trabalho. Para ativá-lo, é necessário: Recarregar Créditos: Recarregue sua conta na API do GPT. Ativar o Recurso: Configure o uso da sua chave da API GPT no painel de desenvolvedor.";

export async function generateAiReport({ month }: GenerateAiReportSchema) {
  generateAiReportSchema.parse({ month });

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await clerkClient().users.getUser(userId);

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  if (!hasPremiumPlan)
    throw new Error("You need to have a premium plan to generate reports");

  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return DUMMY_REPORT;
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // pegar as transações do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });

  // mandar as transações para o chat

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  // pegar o relátorio gerado pelo GPT e retornar para o usuário
  return completion.choices[0].message.content;
}
