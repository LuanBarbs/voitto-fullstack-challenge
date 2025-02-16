import React, { useState, useEffect } from "react";

// Página principal.
export default function Home() {

  const [message, setMessage] = useState("Loading!");

  useEffect(async function fetchData() {
    try {
      await fetch("http://localhost:8080/").then(
        response => response.json()
      ).then(
        data => {
          setMessage(data.message);
        }
      );
    } catch (error) {
      console.error(`Erro: ${error}`);
      setMessage("Erro");
    }
  }, []);

  return (
    <div>{message}</div>
  
  );
};
