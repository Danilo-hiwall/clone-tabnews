import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  function teste2() {
    console.log("iden   tação");
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const createPetals = () => {
    if (!isClient) return;

    const petalsContainer = document.getElementById("petals");
    if (!petalsContainer) return;

    petalsContainer.innerHTML = "";

    for (let i = 0; i < 15; i++) {
      const petal = document.createElement("div");
      petal.className = "rose-petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = Math.random() * 5 + 5 + "s";
      petal.style.animationDelay = Math.random() * 5 + "s";
      petal.style.opacity = Math.random() * 0.5 + 0.3;
      petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      petalsContainer.appendChild(petal);
    }
  };

  const createSparkles = () => {
    if (!isClient) return;

    const sparklesContainer = document.getElementById("sparkles");
    if (!sparklesContainer) return;

    sparklesContainer.innerHTML = "";

    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 100 + "vh";
      sparkle.style.animationDelay = Math.random() * 2 + "s";
      sparkle.style.width = sparkle.style.height =
        Math.random() * 10 + 5 + "px";
      sparklesContainer.appendChild(sparkle);
    }
  };

  const showSecretMessage = () => {
    if (!isClient) return;

    const messages = [
      "Você é a razão do meu sorriso todas as manhãs! ☀️",
      "Meu coração bate mais forte só de pensar em você! 💓",
      "Você é mais linda que todas as estrelas do céu! ✨",
      "Cada momento com você é um tesouro para mim! 💎",
      "Você é o melhor presente que Deus me deu! 🎁",
      "Meu amor por você cresce mais a cada dia! 🌹",
      "Você completa minha vida de uma forma única! 🌈",
      "Sou o homem mais sortudo do mundo por ter você! 🍀",
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50";
    modal.innerHTML = `
      <div class="bg-gradient-to-br from-pink-100 to-rose-200 rounded-3xl p-8 max-w-md mx-4 shadow-2xl relative">
        <button class="absolute top-4 right-4 text-2xl text-rose-600 hover:text-rose-800">
          <i class="fas fa-times"></i>
        </button>
        <div class="text-center">
          <div class="text-5xl text-red-500 mb-4">
            <i class="fas fa-heart heart-beat"></i>
          </div>
          <h3 class="text-2xl font-bold text-rose-700 dancing-script mb-4">Mensagem Secreta para Você!</h3>
          <p class="text-lg text-gray-800 mb-6">${randomMessage}</p>
          <div class="text-3xl text-red-400">
            <i class="fas fa-heart"></i> <i class="fas fa-heart"></i> <i class="fas fa-heart"></i>
          </div>
        </div>
      </div>
    `;

    modal.querySelector("button").addEventListener("click", () => {
      modal.remove();
    });

    document.body.appendChild(modal);

    if (isClient) {
      const heartSound = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-heartbeat-fast-958.mp3",
      );
      heartSound.volume = 0.3;
      heartSound
        .play()
        .catch((e) => console.log("Som não pode ser reproduzido"));
    }
  };

  const createConfetti = (x, y) => {
    if (!isClient) return null;

    const confetti = document.createElement("div");
    confetti.className = "absolute w-3 h-3 rounded-full";
    const colors = ["#ff4081", "#ff79b0", "#ff4081", "#ff4081"];
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = x + "px";
    confetti.style.top = y + "px";
    confetti.style.zIndex = "9999";

    document.body.appendChild(confetti);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let posX = x;
    let posY = y;

    const animate = () => {
      posX += vx;
      posY += vy;
      const newVy = vy + 0.1;

      confetti.style.left = posX + "px";
      confetti.style.top = posY + "px";
      confetti.style.opacity = String(1 - posY / window.innerHeight);

      if (posY < window.innerHeight) {
        requestAnimationFrame(animate);
      } else {
        confetti.remove();
      }
    };

    animate();
  };

  useEffect(() => {
    if (isClient) {
      createPetals();
      createSparkles();

      // Efeito de revelação suave
      const elements = document.querySelectorAll(".love-letter > div");
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
          el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      });

      // Efeito de confete ao clicar
      const handleClick = (e) => {
        if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;

        for (let i = 0; i < 10; i++) {
          createConfetti(e.clientX, e.clientY);
        }
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [isClient]);

  return (
    <>
      <Head>
        <title>Para a Pessoa Mais Especial do Mundo! ❤️</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Poppins", sans-serif;
          overflow-x: hidden;
        }

        .dancing-script {
          font-family: "Dancing Script", cursive;
        }

        .heart-beat {
          animation: heartbeat 1.5s infinite;
        }

        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .sparkle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #ff4081 30%, transparent 70%);
          border-radius: 50%;
          animation: sparkle 2s infinite;
        }

        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        .gradient-text {
          background: linear-gradient(45deg, #ff4081, #ff79b0, #ff4081);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .love-letter {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 240, 245, 0.95) 100%
          );
          backdrop-filter: blur(10px);
          border: 3px solid;
          border-image: linear-gradient(45deg, #ff4081, #ff79b0, #ff4081) 1;
          position: relative;
          overflow: hidden;
        }

        .love-letter::before {
          content: "";
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(
            45deg,
            #ff4081,
            #ff79b0,
            #ff4081,
            #ff4081
          );
          z-index: -1;
          filter: blur(20px);
          opacity: 0.3;
        }

        .rose-petal {
          position: absolute;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #ff4081, #ff79b0);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: fall linear infinite;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>

      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

      {/* Efeito de Pétalas de Rosas */}
      <div id="petals"></div>

      {/* Efeito de Brilhos */}
      <div id="sparkles"></div>

      <main className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="love-letter rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl w-full mx-auto relative overflow-hidden">
          {/* Coração Flutuante */}
          <div className="absolute -top-6 -right-6 text-6xl text-red-400 heart-beat">
            <i className="fas fa-heart"></i>
          </div>

          {/* Cabeçalho Especial */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-pink-200 to-red-200 rounded-full mb-4 floating">
              <i className="fas fa-crown text-3xl text-yellow-500"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text dancing-script mb-2">
              Para a Pessoa Mais Especial do Mundo! 🌟
            </h1>
            <p className="text-lg text-rose-600 font-semibold">
              <i className="fas fa-star text-yellow-500"></i> May, Você é Única!{" "}
              <i className="fas fa-star text-yellow-500"></i>
            </p>
          </div>

          {/* Conteúdo Principal */}
          <div className="space-y-6">
            {/* Mensagem 1 - Destaque */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border-l-4 border-red-400 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="text-3xl text-red-500">
                  <i className="fas fa-heart heart-beat"></i>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-red-600 dancing-script mb-2">
                    May, eu te amo! ❤️
                  </h2>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Você é a mulher da minha vida. A pessoa que Deus enviou pra
                    mim.
                    <br />
                    Com você, eu me sinto amado, completo e realizado.
                  </p>
                </div>
              </div>
            </div>

            {/* Mensagem 2 - Gratidão */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border-l-4 border-pink-400 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="text-3xl text-pink-500">
                  <i className="fas fa-hands-praying floating"></i>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dancing-script mb-2">
                    Gratidão Infinita 🙏
                  </h2>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Sou muito agradecido a Deus por cuidar tão bem de nós.
                    <br />
                    Cada dia ao seu lado é uma bênção, um presente divino.
                  </p>
                </div>
              </div>
            </div>

            {/* Mensagem 3 - Amor Eterno */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-2xl border-l-4 border-rose-400 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="text-3xl text-rose-500">
                  <i className="fas fa-infinity floating"></i>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-rose-600 dancing-script mb-2">
                    Te amo muito! Você é o amor da minha vida. 💫
                  </h2>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Cada sorriso seu ilumina meu mundo.
                    <br />
                    Cada abraço seu é meu porto seguro.
                    <br />
                    Cada "eu te amo" seu é a melodia da minha alma.
                  </p>
                </div>
              </div>
            </div>

            {/* Foto do Casal */}
            <div className="bg-gradient-to-br from-pink-200 to-rose-300 p-1 rounded-2xl shadow-xl">
              <div className="bg-white p-8 rounded-2xl text-center">
                <div className="relative inline-block">
                  <div className="w-48 h-48 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <i className="fas fa-heart text-6xl text-white"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-3 rounded-full">
                    <i className="fas fa-heart text-2xl"></i>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dancing-script mt-6">
                  Danilo & Mayara
                </h3>
                <p className="text-xl text-rose-600 font-semibold mt-2">
                  <i className="fas fa-heart text-red-500"></i> Para Sempre
                  Juntos <i className="fas fa-heart text-red-500"></i>
                </p>
              </div>
            </div>

            {/* Galeria de Emoções */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-pink-100 p-4 rounded-xl text-center shadow-lg hover:scale-105 transition-transform">
                <i className="fas fa-laugh-beam text-3xl text-pink-500 mb-2"></i>
                <p className="text-sm font-semibold text-gray-700">
                  Felicidade
                </p>
              </div>
              <div className="bg-rose-100 p-4 rounded-xl text-center shadow-lg hover:scale-105 transition-transform">
                <i className="fas fa-heart text-3xl text-red-500 mb-2"></i>
                <p className="text-sm font-semibold text-gray-700">Amor</p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl text-center shadow-lg hover:scale-105 transition-transform">
                <i className="fas fa-star text-3xl text-yellow-500 mb-2"></i>
                <p className="text-sm font-semibold text-gray-700">Especial</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl text-center shadow-lg hover:scale-105 transition-transform">
                <i className="fas fa-infinity text-3xl text-orange-500 mb-2"></i>
                <p className="text-sm font-semibold text-gray-700">
                  Eternidade
                </p>
              </div>
            </div>

            {/* Mensagem Final */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg">
                <i className="fas fa-heart text-xl"></i>
                <span className="text-xl font-bold dancing-script">
                  Nossa História de Amor
                </span>
                <i className="fas fa-heart text-xl"></i>
              </div>
              <p className="text-lg text-gray-700 mt-6 italic">
                "O amor não se vê com os olhos, mas com o coração."
                <br />- E nosso coração escolheu você, May!
              </p>
            </div>

            {/* Botão de Mensagem Secreta */}
            <div className="text-center mt-8">
              <button
                onClick={showSecretMessage}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fas fa-envelope mr-2"></i>
                Clique para uma Mensagem Secreta
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Áudio de Fundo */}
      <audio id="loveMusic" loop>
        <source
          src="https://assets.mixkit.co/music/preview/mixkit-romantic-sunset-687.mp3"
          type="audio/mpeg"
        />
      </audio>
    </>
  );
}
