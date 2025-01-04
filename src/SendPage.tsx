import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SendPage: React.FC = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // Extract userId from search parameters
  const userId = searchParams.get("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientAddress || !amount) {
      setMessage("Both fields are required.");
      return;
    }

    if (!userId) {
      setMessage("User ID is missing in the URL.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://iagent-1.onrender.com/transfer_funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer Iyanuoluwa"
        },
        body: JSON.stringify({
          userId,
          recipientAddress,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send the transaction.");
      }

      const data = await response.json();
      setMessage(`Transaction successful: ${data.message}`);
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center w-[100vw] h-[80vh]">
    <div className="max-sm:w-[100%] min-w-[16em] bg-gray-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Send</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-gray-300 mb-2">
            Recipient Wallet Address (INJ)
          </label>
          <input
            type="text"
            id="recipient"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-300 mb-2">
            Amount (INJ)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded bg-blue-600 text-white font-bold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-white">{message}</p>
      )}
    </div>
    </div>
  );
};

export default SendPage;
