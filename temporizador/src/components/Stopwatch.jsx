import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      const start = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - start);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggle = () => setRunning(r => !r);
  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
  };
  const saveSession = () => setSessions(prev => [...prev, time]);

  const formatTime = ms => {
    const m = String(Math.floor(ms / 60000)).padStart(2, '0');
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${m}:${s}:${cs}`;
  };

  return (
    <div className="stopwatch-container">
      <h2>Cronómetro</h2>
      <img
        src="https://web.archive.org/web/20090820151055/http://geocities.com/heartland/ridge/1039/monkey_time.gif"
        alt="Mono Reloj"
        className="stopwatch-image"
      />

      <div className="display">{formatTime(time)}</div>

      <div className="buttons">
        <button onClick={toggle}>{running ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={reset}>Reiniciar</button>
        <button onClick={saveSession}>Guardar sesión</button>
      </div>

      <img
        src="https://web.archive.org/web/20090821122734/http://geocities.com/Baja/Outback/3333/images/mysnakebar.gif"
        alt="División"
        className="divider"
      />

      <h3>Sesiones guardadas</h3>
      <ul className="sessions-list">
        {sessions.map((s, i) => (
          <li key={i}>Sesión {i + 1}: {formatTime(s)}</li>
        ))}
      </ul>
    </div>
  );
}