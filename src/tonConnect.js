import { TonConnect } from "@tonconnect/sdk";

export const connector = new TonConnect({
  manifestUrl: "https://your-vercel-app.vercel.app/tonconnect-manifest.json"
});