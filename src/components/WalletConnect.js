import React, { useEffect, useState } from "react";
import { connector } from "../tonConnect";

const WALLET_RECEIVER = "UQDNqYE7mTZnTRKdyZuu5ITXVJEnPt4co-kSqBNZ_oHZn1Q7";

export default function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [transactionSent, setTransactionSent] = useState(false);

  useEffect(() => {
    connector.restoreConnection().then(() => {
      if (connector.connected) {
        setWalletAddress(connector.account.address);
      }
    });

    connector.onStatusChange(wallet => {
      if (wallet) setWalletAddress(connector.account.address);
      else setWalletAddress(null);
    });
  }, []);

  const connectWallet = async () => {
    await connector.connect();
  };

  const sendTransaction = async () => {
    const amountNanoTON = BigInt(1e8); // 0.1 TON

    await connector.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: WALLET_RECEIVER,
          amount: amountNanoTON.toString(),
        },
      ],
    });

    setTransactionSent(true);
  };

  const checkPayment = async () => {
    const res = await fetch(
      `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/checkPayment?wallet=${walletAddress}`
    );
    const result = await res.json();
    if (result.success) {
      alert("✅ Вы получили 20 монет!");
    } else {
      alert("⏳ Платёж пока не найден.");
    }
  };

  return (
    <div className="text-center p-4">
      {!walletAddress ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={connectWallet}
        >
          🔗 Подключить TON Wallet
        </button>
      ) : (
        <>
          <p>✅ Подключен: {walletAddress}</p>
          <button
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
            onClick={sendTransaction}
          >
            💰 Купить 20 монет за 0.1 TON
          </button>
          <button
            onClick={checkPayment}
            className="bg-purple-600 text-white mt-2 px-4 py-2 rounded"
          >
            🔄 Проверить начисление монет
          </button>
          {transactionSent && (
            <p className="mt-2 text-green-700 font-bold">
              ✅ Транзакция отправлена!
            </p>
          )}
        </>
      )}
    </div>
  );
}