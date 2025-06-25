import React from "react";
import WalletConnect from "./components/WalletConnect";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">TON Game Shop</h1>
      <WalletConnect />
    </div>
  );
}

export default App;