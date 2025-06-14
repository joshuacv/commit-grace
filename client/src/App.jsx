import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState([]);

  const fetchTotal = async () => {
    const res = await fetch('/api/total');
    const data = await res.json();
    setTotal(data.total);
    setPeople(data.commitments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, amount }),
    });
    setName('');
    setAmount('');
    fetchTotal();
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Make a Monthly commitment</h1>
        <p className="text-2xl mb-3">How much can you contribute towards the expenses of the church per month?</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Monthly Amount (€)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Total committed so far: €{total.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
