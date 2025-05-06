import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const saveSession = () => {
    if (time > 0) {
      setSessions([...sessions, time]);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Cronómetro</h1>
      <h2>{time} segundos</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={toggleStartPause}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={reset} style={{ marginLeft: "10px" }}>
          Reiniciar
        </button>
        <button onClick={saveSession} style={{ marginLeft: "10px" }}>
          Guardar Sesión
        </button>
      </div>

      <h3>Sesiones guardadas:</h3>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            Sesión {index + 1}: {session} segundos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
