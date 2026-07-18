"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const RELEASE_AT = "2026-08-31T20:00:00-04:00"; // 8:00 PM, hora de Nueva York/Nueva Jersey
const VIDEO_URL = ""; // Pega aquí el enlace de YouTube cuando exista.

const missions = [
  {
    day: "DÍA 1",
    title: "Ora por tres personas",
    text: "Intercede por sus necesidades y pide a Dios una oportunidad para acercarte a ellas.",
  },
  {
    day: "DÍA 2",
    title: "Comparte tu fe",
    text: "Cuenta a alguien, con sencillez, lo que Dios ha hecho en tu vida.",
  },
  {
    day: "DÍA 3",
    title: "Sirve sin anunciarlo",
    text: "Haz una acción de amor práctica sin esperar reconocimiento.",
  },
  {
    day: "DÍA 4",
    title: "Invita a alguien",
    text: "Invita a una persona a caminar contigo y conocer el mensaje de Jesús.",
  },
];

function getCountdown() {
  const difference = new Date(RELEASE_AT).getTime() - Date.now();

  if (difference <= 0) {
    return { released: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    released: false,
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
  };
}

export default function Home() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("envia2-missions") || "[]");
    setCompleted(saved);

    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const progress = useMemo(
    () => Math.round((completed.length / missions.length) * 100),
    [completed]
  );

  function toggleMission(index) {
    const next = completed.includes(index)
      ? completed.filter((item) => item !== index)
      : [...completed, index];

    setCompleted(next);
    localStorage.setItem("envia2-missions", JSON.stringify(next));
  }

  function openVideo() {
    if (!countdown.released) return;

    if (!VIDEO_URL) {
      window.alert("El estreno ya está habilitado, pero todavía falta agregar el enlace oficial del video.");
      return;
    }

    window.open(VIDEO_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <nav className="nav">
        <a href="#inicio" className="brand" aria-label="ENVIA2">
          <Image
            src="/envia2-logo.png"
            alt="ENVIA2"
            width={190}
            height={72}
            priority
          />
        </a>

        <div className="navLinks">
          <a href="#inicio">Inicio</a>
          <a href="#mision">La misión</a>
          <a href="#misiones">Misiones</a>
          <a href="#estreno">Estreno</a>
        </div>

        <a href="#misiones" className="navButton">Aceptar misión</a>
      </nav>

      <section className="hero" id="inicio">
        <div className="glow glowOne" />
        <div className="glow glowTwo" />

        <div className="heroContent">
          <p className="eyebrow">CONGRESO ACTIVA PRESENTA</p>

          <Image
            className="heroLogo"
            src="/envia2-logo.png"
            alt="ENVIA2"
            width={820}
            height={310}
            priority
          />

          <h1>LA MISIÓN YA COMENZÓ</h1>
          <p className="heroText">
            Dios nos ha enviado. No vamos solos. Cumple misiones, comparte tu fe
            y conviértete en parte de algo más grande que tú.
          </p>

          <div className="countdownLabel">
            {countdown.released ? "EL ESTRENO YA ESTÁ DISPONIBLE" : "EL ESTRENO COMIENZA EN"}
          </div>

          <div className="countdown" aria-live="polite">
            {[
              ["DÍAS", countdown.days],
              ["HORAS", countdown.hours],
              ["MINUTOS", countdown.minutes],
              ["SEGUNDOS", countdown.seconds],
            ].map(([label, value]) => (
              <div className="timeBlock" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <a className="primaryButton" href="#misiones">
            VER MISIONES <span>→</span>
          </a>
        </div>

        <div className="heroShade" />
      </section>

      <section className="missionIntro" id="mision">
        <p className="eyebrow">NO ES SOLO UNA CAMPAÑA</p>
        <h2>Ser enviado es vivir la fe en movimiento.</h2>
        <p>
          Cada misión fue creada para llevar el mensaje de Jesús fuera de las
          paredes. No se trata de acumular puntos: se trata de alcanzar personas.
        </p>
      </section>

      <section className="missionsSection" id="misiones">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">TU RECORRIDO</p>
            <h2>Misiones activas</h2>
          </div>
          <div className="progressText">{completed.length} de {missions.length} completadas</div>
        </div>

        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${progress}%` }} />
        </div>

        <div className="missionGrid">
          {missions.map((mission, index) => {
            const done = completed.includes(index);

            return (
              <article className={`missionCard ${done ? "done" : ""}`} key={mission.title}>
                <span className="missionDay">{mission.day}</span>
                <h3>{mission.title}</h3>
                <p>{mission.text}</p>
                <button onClick={() => toggleMission(index)}>
                  {done ? "✓ MISIÓN COMPLETADA" : "MARCAR COMO COMPLETADA"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="premiere" id="estreno">
        <div className="premiereCard">
          <div>
            <p className="eyebrow">31 DE AGOSTO · 8:00 PM</p>
            <h2>{countdown.released ? "La misión comienza ahora." : "El video oficial permanece bloqueado."}</h2>
            <p>
              {countdown.released
                ? "El momento llegó. Entra al estreno oficial de ENVIA2."
                : "El botón se desbloqueará automáticamente a las 8:00 PM, hora de Nueva York y Nueva Jersey."}
            </p>
          </div>

          <button
            className={`videoButton ${countdown.released ? "unlocked" : ""}`}
            disabled={!countdown.released}
            onClick={openVideo}
          >
            {countdown.released ? "▶ VER VIDEO OFICIAL" : "🔒 VIDEO BLOQUEADO"}
          </button>
        </div>
      </section>

      <footer>
        <Image src="/envia2-logo.png" alt="ENVIA2" width={155} height={58} />
        <p>Plataforma oficial de Congreso Activa · 2026</p>
      </footer>
    </main>
  );
}
