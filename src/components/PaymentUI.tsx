"use client";
import React, { useState } from "react";
import { CreditCard, Send, Wallet, ArrowLeft } from "lucide-react";
import { usePaystackPayment } from "react-paystack";

export default function PaymentUI() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [method, setMethod] = useState("card");

  
  const publicKey = "pk_test_a5100dde6eef6aa83b3581984fa690b3e6cab21c";

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: Number(amount) * 100, 
    publicKey,
    metadata: { name },
  };

  const initializePayment = usePaystackPayment(config);

  const handlePay = () => {
    if (!amount || !email || !name) {
      alert("Please fill in all fields");
      return;
    }

    // ✅ Trigger Paystack popup
    initializePayment(
      (response) => {
        alert("Payment Successful 🎉 Reference: " + response.reference);
      },
      () => {
        alert("Payment cancelled ❌");
      }
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar / Payment Summary */}
      <aside className="w-full lg:w-1/3 bg-green-600 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ArrowLeft className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Back to Dashboard</h2>
          </div>
          <h1 className="text-3xl font-bold mb-2">Pay with Paystack</h1>
          <p className="text-green-100 mb-6">
            Secure payment powered by Paystack 
          </p>
          <div className="space-y-4">
            <div className="bg-green-500/40 p-4 rounded-lg">
              <h3 className="text-sm text-green-100">Wallet Balance</h3>
              <p className="text-3xl font-bold">₦15,000</p>
            </div>
            <div className="bg-green-500/40 p-4 rounded-lg">
              <h3 className="text-sm text-green-100">Recent Transaction</h3>
              <p className="text-lg font-medium">₦5,000 — Gift Card Redeem</p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-sm text-center text-green-100">
          Secure & encrypted payment
        </div>
      </aside>

      {/* Main Payment Section */}
      <main className="flex-1 p-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Complete Payment
          </h2>
          <p className="text-gray-500 text-sm">
            Enter your payment details to continue
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount (₦)
              </label>
              <input
                type="number"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  method === "card"
                    ? "bg-green-500 text-white"
                    : "border-gray-300"
                }`}
                onClick={() => setMethod("card")}
              >
                <CreditCard className="w-4 h-4" /> Card
              </button>

              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  method === "wallet"
                    ? "bg-green-500 text-white"
                    : "border-gray-300"
                }`}
                onClick={() => setMethod("wallet")}
              >
                <Wallet className="w-4 h-4" /> Wallet
              </button>
            </div>
          </div>

          <button
            onClick={handlePay}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Send className="w-4 h-4" /> Proceed to Pay
          </button>
        </div>
      </main>
    </div>
  );
}
