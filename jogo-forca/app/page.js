// app/page.js
"use client";

import { useState, useEffect } from 'react';
import { palavras } from './utils/palavras';
import styles from './page.module.css';

// 1. Array com todas as letras do alfabeto (coloque fora do componente para não recriar toda hora)
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

  // --- 2. A FUNÇÃO DO CLIQUE ---
  const lidarComClique = (letra) => {
    // Se a letra já foi clicada ou se o jogo não está rolando, não faz nada
    if (letrasTentadas.includes(letra) || statusDoJogo !== "jogando") return;

    // Adiciona a letra nova na nossa "memória" de tentativas
    setLetrasTentadas((prev) => [...prev, letra]);

    // Se a palavra não contiver a letra, é um erro!
    if (!palavraAtual.includes(letra)) {
      setErros((prev) => prev + 1);
    }
  };

  if (!palavraAtual) {
    return (
      <main className={styles.main}>
        <p>Carregando jogo...</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Jogo da Forca - Países</h1>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0e0e0' }}>
        <p><strong>(Debug) País Sorteado:</strong> {palavraAtual}</p>
        <p><strong>(Debug) Erros Atuais:</strong> {erros}</p>
      </div>
<div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0e0e0' }}>
        <p><strong>(Debug) País Sorteado:</strong> {palavraAtual}</p>
        <p><strong>(Debug) Erros Atuais:</strong> {erros}</p>
      </div>

      {/* --- ETAPA 5: O BONECO E A FORCA --- */}
      <div className={styles.forcaArea}>
        {/* A forca fica no fundo, sempre visível */}
        <img src="/forca.png" alt="Forca" className={styles.imagemBase} />
        
        {/* O boneco só renderiza se os erros forem maiores que zero */}
        {erros > 0 && erros <= 6 && (
          <img 
            src={`/erro-${erros}.png`} 
            alt={`Boneco erro ${erros}`} 
            className={styles.imagemBase} 
          />
        )}
      </div>

      {/* --- ETAPA 3: A PALAVRA OCULTA (já estava aqui) --- */}
      <div className={styles.palavraContainer}></div>
      <div className={styles.palavraContainer}>
        {palavraAtual.split('').map((letra, index) => {
          const revelada = letrasTentadas.includes(letra);
          return (
            <span key={index} className={styles.letraCaixa}>
              {revelada ? letra : ""}
            </span>
          );
        })}
      </div>

      {/* --- 3. O TECLADO VIRTUAL --- */}
      <div className={styles.teclado}>
        {alfabeto.map((letra) => {
          // Lógicas para saber a cor do botão
          const jaTentou = letrasTentadas.includes(letra);
          const acertou = jaTentou && palavraAtual.includes(letra);
          const errou = jaTentou && !palavraAtual.includes(letra);

          return (
            <button
              key={letra}
              onClick={() => lidarComClique(letra)}
              disabled={jaTentou} // Desabilita se já clicou
              className={`
                ${styles.tecla} 
                ${acertou ? styles.teclaCorreta : ''} 
                ${errou ? styles.teclaErrada : ''}
              `}
            >
              {letra}
            </button>
          );
        })}
      </div>

    </main>
  );
}