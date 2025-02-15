import React, { useState, useEffect } from "react";

// Página principal.
export default function Home() {

  const [message, setMessage] = useState("Loading!");

  useEffect(function fetchData() {
    fetch("http://localhost:8080/").then(
      response => response.json()
    ).then(
      data => {
        setMessage(data.message);
      }
    );
  }, []);

  return (
    <div>{message}</div>
  
  );
};
