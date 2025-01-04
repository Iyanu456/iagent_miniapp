import React, { useEffect } from "react";
import useAxios from "./hooks/useAxios";
//import { useSearchParams } from "react-router-dom";\
interface SendPageProps {
  userId: string;
  setMessage: any
  message: any 
  recipientAddress: any
  setRecipientAddress: any
  amount: any
  setAmount: any
  loading:any
  setLoading: any// Define expected prop
}

const SendPage: React.FC<SendPageProps> = (props) => {
  
  const { sendRequest } = useAxios();
  //const [searchParams] = useSearchParams();

  // Extract userId from search parameters
  //const userId = searchParams.get("userId");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authToken = import.meta.env.VITE_API_AUTH_TOKEN; // Replace with actual API token


  useEffect(() => {
    const timer = setTimeout(() => {
      props.setMessage(null)
    }, 1500);

    return () => clearTimeout(timer);
  }, [props.message]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!props.recipientAddress || !props.amount) {
      props.setMessage("Both fields are required.");
      return;
    }

    if (!props.userId) {
      props.setMessage("User ID is missing in the URL.");
      return;
    }

    props.setLoading(true);
    props.setMessage(null);

    try {
      /*const response = await fetch(`${apiBaseUrl}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          userId: String(userId),
          props.recipientAddress: String(props.recipientAddress),
          amount: String(amount),
        }),
      });*/

      console.log(props.userId);
      const response = await sendRequest({
        url: `${apiBaseUrl}/transfer_funds`,
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: {
          user_id: props.userId,
          recipient: props.recipientAddress,
          amount: props.amount,
        },
      });
      
      if (response) console.log(response);
      if (response?.success) {
        props.setMessage(`Transaction successful!`);
        props.setLoading(false)
      } else {
        props.setLoading(false)
        throw new Error("Failed to send the transaction.");
      }

   
    } catch (error) {
      props.setMessage(`Error: ${(error as Error).message}`);
    } 
  };

  return (
    <div className="grid place-items-center w-[100vw] h-[80vh]">
    <div className="max-sm:w-[100%] min-w-[20em] bg-gray-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold text-white mb-4">Send</h1>
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
            
            value={props.recipientAddress}
            onChange={(e) => props.setRecipientAddress(e.target.value)}
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
            step="0.000000001"
            value={props.amount}
            onChange={(e) => {
              const value = e.target.value;
              if (parseFloat(value) >= 0 || value === "") {
                props.setAmount(value);
              }
            }}
            min={0}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={props.loading}
          className={`w-full p-3 rounded bg-blue-600 text-white font-bold ${
            props.loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {props.loading ? "Sending..." : "Send"}
        </button>
      </form>
      {props.message && (
        <p className="mt-4 text-center text-white">{props.message}</p>
      )}
    </div>
    </div>
  );
};

export default SendPage;
