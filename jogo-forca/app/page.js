// app/page.js
"use client";

import { useState, useEffect } from 'react';
import { palavras } from './utils/palavras';
import styles from './page.module.css';

export default function JogoDaForca() {
  
 
  const [palavraAtual, setPalavraAtual] = useState("");
  
  const [letrasTentadas, setLetrasTentadas] = useState([]);
  
  const [erros, setErros] = useState(0);
  
  const [statusDoJogo, setStatusDoJogo] = useState("jogando"); 




 
  const iniciarNovoJogo = () => {

    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    
    setPalavraAtual(palavras[indiceAleatorio]);
    setLetrasTentadas([]);
    setErros(0);
    setStatusDoJogo("jogando");
  };

  useEffect(() => {
    iniciarNovoJogo();
  }, []);
}

  // Substitua apenas o 'return' do seu app/page.js por este:

  return (
    <main className={styles.main}>
      <h1>Jogo da Forca - Países</h1>
      
      {/* Caixa de Debug (Vamos deixar aqui por enquanto para facilitar os testes, 
        depois nós apagamos quando o jogo estiver pronto) 
      */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0e0e0' }}>
        <p><strong>(Debug) País Sorteado:</strong> {palavraAtual}</p>
        <p><strong>(Debug) Erros Atuais:</strong> {erros}</p>
      </div>

      {/* --- ETAPA 3: A PALAVRA OCULTA --- */}
      <div className={styles.palavraContainer}>
        {palavraAtual.split('').map((letra, index) => {
          // Verifica se a letra atual da iteração já foi clicada pelo usuário
          const revelada = letrasTentadas.includes(letra);
          
          return (
            <span key={index} className={styles.letraCaixa}>
              {revelada ? letra : ""}
            </span>
          );
        })}
      </div>

    </main>
  );