import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export default function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [commitments, setCommitments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTotal = async () => {
    const res = await fetch(`${API_URL}/total`);
    const data = await res.json();
    setCommitments(data.commitments);
    setTotal(data.total);
  };

  
  const submitForm = async (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    setLoading(true);
    await fetch(`${API_URL}/commit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount }),
    });
    setName("");
    setAmount("");
    setLoading(false);
    fetchTotal();
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          💸 Community Commitment Tracker
        </h1>

        <form onSubmit={submitForm} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? "Submitting..." : "Commit"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Committed:{" "}
            <span className="text-green-600">${total.toFixed(2)}</span>
          </h2>
        </div>

        <ul className="mt-4 divide-y divide-gray-200">
          {commitments.map((c, idx) => (
            <li key={idx} className="py-2 flex justify-between text-sm text-gray-700">
              <span>{c.name}</span>
              <span>${c.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
