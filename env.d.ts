declare namespace NodeJS {
  interface ProcessEnv {
    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    STRIPE_PREMIUM_PLAN_PRICE_ID: string;
    STRIPE_WEBHOOK_SECRET: string;
    NEXT_PUBLIC_STRIPE_COSTUMER_PORTAL_URL: string;
    OPENAI_API_KEY: string;
    APP_URL: string;
  }
}
