import './App.css';
import { getDatabase, ref, push } from "firebase/database";
import { useState } from 'react';

export function AdminPage() {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [stake, setStake] = useState();

  const writeBet = () => {
    console.log(name, date, stake)
    const db = getDatabase();
    push(ref(db, 'bets/'), {
      name,
      date,
      stake,
      hour
    });
  }

  return (
    <div>
      <p>
        Admin
      </p>
      <input onChange={(e) => setName(e.target.value)} placeholder='Nombre' />
      <input onChange={(e) => setDate(e.target.value)} placeholder='Fecha de expiración' />
      <input onChange={(e) => setHour(e.target.value)} placeholder='Hora de expiración' />
      <input onChange={(e) => setStake(e.target.value)} placeholder='Cuota' />
      <button onClick={() => writeBet()} style={{ marginTop: 30, padding: 10 }}>Enviar</button>

    </div>
  );
}

