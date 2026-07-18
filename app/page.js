"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const RELEASE_AT = "2026-08-31T20:00:00-04:00";
const VIDEO_URL = "";
const TRAILER_URL = "";

const missions = [
  {
    id: 1,
    unlockAt: "2026-08-24T06:00:00-04:00",
    day: "DÍA 1",
    title: "Ora por tres personas",
    text: "Escribe tres nombres y dedica al menos cinco minutos a interceder por cada persona.",
    points: 100,
    icon: "✦",
  },
  {
    id: 2,
    unlockAt: "2026-08-25T06:00:00-04:00",
    day: "DÍA 2",
    title: "Envía una palabra de ánimo",
    text: "Comparte un mensaje sincero con alguien que necesite recordar que Dios no lo ha olvidado.",
    points: 120,
    icon: "↗",
  },
  {
    id: 3,
    unlockAt: "2026-08-26T06:00:00-04:00",
    day: "DÍA 3",
    title: "Sirve sin anunciarlo",
    text: "Haz una acción práctica de amor sin publicarla ni esperar reconocimiento.",
    points: 150,
    icon: "＋",
  },
  {
    id: 4,
    unlockAt: "2026-08-27T06:00:00-04:00",
    day: "DÍA 4",
    title: "Comparte tu testimonio",
    text: "Cuenta en menos de dos minutos una forma concreta en la que Dios transformó tu vida.",
    points: 180,
    icon: "◉",
  },
  {
    id: 5,
    unlockAt: "2026-08-28T06:00:00-04:00",
    day: "DÍA 5",
    title: "Invita a una persona",
    text: "Invita personalmente a alguien a conocer el mensaje de Jesús y acompáñalo en el proceso.",
    points: 200,
    icon: "→",
  },
  {
    id: 6,
    unlockAt: "2026-08-29T06:00:00-04:00",
    day: "DÍA 6",
    title: "Comparte esperanza",
    text: "Publica una frase, versículo o video que dirija la atención hacia Jesús, no hacia ti.",
    points: 220,
    icon: "◇",
  },
  {
    id: 7,
    unlockAt: "2026-08-30T06:00:00-04:00",
    day: "DÍA 7",
    title: "Activa a otro enviado",
    text: "Reta a otra persona a completar una misión y caminar contigo durante el lanzamiento.",
    points: 250,
    icon: "⚡",
  },
];

function getCountdown(target) {
  const difference = new Date(target).getTime() - Date.now();

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
  const [now, setNow] = useState(Date.now());
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("envia2-v4-missions") || "[]");
    setCompleted(saved);

    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(() => getCountdown(RELEASE_AT), [now]);
  const unlockedMissions = missions.filter(
    (mission) => now >= new Date(mission.unlockAt).getTime()
  );
  const totalPoints = completed.reduce((sum, id) => {
    const mission = missions.find((item) => item.id === id);
    return sum + (mission?.points || 0);
  }, 0);
  const progress = Math.round((completed.length / missions.length) * 100);

  function toggleMission(id, unlocked) {
    if (!unlocked) return;
    const next = completed.includes(id)
      ? completed.filter((item) => item !== id)
      : [...completed, id];

    setCompleted(next);
    localStorage.setItem("envia2-v4-missions", JSON.stringify(next));
  }

  function openExternal(url, fallback) {
    if (!url) {
      window.alert(fallback);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <nav className="nav">
        <a href="#inicio" className="brand" aria-label="ENVIA2">
          <Image src="/envia2-logo.png" alt="ENVIA2" width={180} height={68} priority />
        </a>

        <div className="navLinks">
          <a href="#inicio">Inicio</a>
          <a href="#mision">La misión</a>
          <a href="#misiones">Misiones</a>
          <a href="#estreno">Estreno</a>
        </div>

        <a className="navButton" href="#misiones">Aceptar misión</a>
      </nav>

      <section className="hero" id="inicio">
        <div className="scanlines" />
        <div className="orb orbOne" />
        <div className="orb orbTwo" />
        <div className="noise" />

        <div className="heroContent">
          <p className="eyebrow">CONGRESO ACTIVA PRESENTA</p>

          <div className="logoStage">
            <div className="logoHalo" />
            <Image
              className="heroLogo"
              src="/envia2-logo.png"
              alt="ENVIA2"
              width={920}
              height={340}
              priority
            />
          </div>

          <h1>LA MISIÓN YA COMENZÓ</h1>
          <p className="heroText">
            No fuiste llamado a observar. Fuiste enviado. Completa misiones,
            comparte tu fe y conviértete en parte de una historia que alcanza personas.
          </p>

          <div className="heroActions">
            <button
              className="primaryButton"
              onClick={() => openExternal(TRAILER_URL, "El tráiler todavía no ha sido agregado.")}
            >
              ▶ VER TRÁILER
            </button>
            <a className="secondaryButton" href="#misiones">ACEPTAR LA MISIÓN</a>
          </div>

          <div className="countdownLabel">
            {countdown.released ? "EL ESTRENO YA ESTÁ DISPONIBLE" : "ESTRENO OFICIAL EN"}
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
        </div>

        <a className="scrollCue" href="#mision" aria-label="Continuar">
          <span>DESCUBRE LA MISIÓN</span>
          <i>↓</i>
        </a>
      </section>

      <section className="manifesto" id="mision">
        <div className="manifestoNumber">01</div>
        <div className="manifestoContent">
          <p className="eyebrow">EL PROPÓSITO</p>
          <h2>No fuiste llamado a observar.<br />Fuiste enviado.</h2>
          <p>
            ENVIA2 es una experiencia de fe en movimiento. Durante los días previos
            al lanzamiento, cada misión te llevará a orar, servir, compartir esperanza
            y activar a otros. No se trata de acumular puntos. Se trata de alcanzar vidas.
          </p>

          <div className="featureRow">
            <div><strong>07</strong><span>Misiones</span></div>
            <div><strong>01</strong><span>Propósito</span></div>
            <div><strong>∞</strong><span>Impacto</span></div>
          </div>
        </div>
      </section>

      <section className="missionsSection" id="misiones">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">TU RECORRIDO</p>
            <h2>Misiones diarias</h2>
            <p className="sectionDescription">
              Una nueva misión se desbloquea cada día. Tu progreso se guarda automáticamente.
            </p>
          </div>

          <div className="scorePanel">
            <span>PUNTOS</span>
            <strong>{totalPoints}</strong>
            <small>{completed.length} de {missions.length} completadas</small>
          </div>
        </div>

        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${progress}%` }} />
        </div>

        <div className="missionGrid">
          {missions.map((mission) => {
            const unlocked = now >= new Date(mission.unlockAt).getTime();
            const done = completed.includes(mission.id);
            const unlockDate = new Date(mission.unlockAt).toLocaleDateString("es-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <article
                className={`missionCard ${done ? "done" : ""} ${!unlocked ? "locked" : ""}`}
                key={mission.id}
              >
                <div className="cardTop">
                  <span className="missionDay">{mission.day}</span>
                  <span className="missionIcon">{mission.icon}</span>
                </div>

                <div className="missionStatus">
                  {unlocked ? (done ? "COMPLETADA" : "DISPONIBLE") : `SE ABRE ${unlockDate}`}
                </div>

                <h3>{mission.title}</h3>
                <p>{mission.text}</p>

                <div className="missionFooter">
                  <span>+{mission.points} PTS</span>
                  <button
                    disabled={!unlocked}
                    onClick={() => toggleMission(mission.id, unlocked)}
                  >
                    {!unlocked ? "🔒 BLOQUEADA" : done ? "✓ COMPLETADA" : "COMPLETAR"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="premiere" id="estreno">
        <div className="premiereGlow" />
        <div className="premiereContent">
          <p className="eyebrow">31 DE AGOSTO · 8:00 PM</p>
          <h2>{countdown.released ? "La misión comienza ahora." : "El estreno permanece bloqueado."}</h2>
          <p>
            {countdown.released
              ? "El momento llegó. Entra al estreno oficial de ENVIA2."
              : "El acceso al videoclip se activará automáticamente a las 8:00 PM, hora de Nueva York y Nueva Jersey."}
          </p>

          <button
            className={`videoButton ${countdown.released ? "unlocked" : ""}`}
            disabled={!countdown.released}
            onClick={() =>
              openExternal(
                VIDEO_URL,
                "El estreno está habilitado, pero todavía falta agregar el enlace oficial del video."
              )
            }
          >
            {countdown.released ? "▶ VER VIDEO OFICIAL" : "🔒 VIDEO BLOQUEADO"}
          </button>
        </div>
      </section>

      <footer>
        <Image src="/envia2-logo.png" alt="ENVIA2" width={150} height={58} />
        <p>Congreso Activa · ENVIA2 · 2026</p>
        <a href="#inicio">VOLVER ARRIBA ↑</a>
      </footer>
    </main>
  );
}
