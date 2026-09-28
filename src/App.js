import './index.css';
import { useEffect, useState } from 'react';
import * as Api from './API';

export default function App() {
  const [allGuests, setAllGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'http://localhost:4000';

  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');

  useEffect(() => {
    async function getAll() {
      const response = await fetch(`${baseUrl}/guests`);
      const guests = await response.json();
      setAllGuests(guests);
      setLoading(false);
    }
    getAll().catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  async function createGuest(firstName, lastName) {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    return createdGuest;
  }
  if (loading) {
    return (
      <div className="bg-slate-400">
        <h1 className="text-3xl text-blue-800">Enter Guest</h1>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className="bg-slate-400">
      <h1 className="text-3xl text-blue-800">Enter Guest</h1>

      <form
        className="flex items-end gap-4 mb-6"
        onSubmit={async function (event) {
          event.preventDefault();
          const createdGuest = await createGuest(inputFirstName, inputLastName);

          setAllGuests([...allGuests, createdGuest]);
          setInputFirstName('');
          setInputLastName('');
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="First Name">Enter First Name</label>
          <input
            id="First Name"
            placeholder="First Name"
            value={inputFirstName}
            onChange={(event) => {
              setInputFirstName(event.currentTarget.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Last Name">Enter Last Name</label>
          <input
            id="Last Name"
            placeholder="Last Name"
            value={inputLastName}
            onChange={(event) => {
              setInputLastName(event.currentTarget.value);
            }}
          />
        </div>

        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Add Guest
          </button>
        </div>
      </form>
      <Api.GetAllUsers allGuests={allGuests} setAllGuests={setAllGuests} />
      <Api.DeleteUser allGuests={allGuests} setAllGuests={setAllGuests} />
      <Api.DeleteAllUsers allGuests={allGuests} setAllGuests={setAllGuests} />
    </div>
  );
}
