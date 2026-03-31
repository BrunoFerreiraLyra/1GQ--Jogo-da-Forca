// app/page.js
"use client";

import { useState, useEffect } from 'react';
import { listaDePaises } from './utils/palavras';
import styles from './page.module.css';

export default function JogoDaForca() {
  
 
  const [palavraAtual, setPalavraAtual] = useState("");
  
  const [letrasTentadas, setLetrasTentadas] = useState([]);
  
  const [erros, setErros] = useState(0);
  
  const [statusDoJogo, setStatusDoJogo] = useState("jogando"); 




 
  const iniciarNovoJogo = () => {
    // Sorteia um número aleatório baseado no tamanho do nosso array de países
    const indiceAleatorio = Math.floor(Math.random() * listaDePaises.length);
    
    setPalavraAtual(listaDePaises[indiceAleatorio]);
    setLetrasTentadas([]);
    setErros(0);
    setStatusDoJogo("jogando");
  };

  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Jogo da Forca - Países</h1>
      
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0e0e0' }}>
        <p><strong>(Debug) País Sorteado:</strong> {palavraAtual}</p>
        <p><strong>(Debug) Erros Atuais:</strong> {erros}</p>
      </div>

    </main>
  );
}