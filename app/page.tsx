"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const resources = [
  {
    title: "Watch the Film",
    caption: "The Last Rescue — a story of courage from the front lines.",
    image: "/assets/movie.png",
    href: "https://youtu.be/51t5hefn0dQ?si=rgR7Cqw6oNJ9ySBK",
    action: "Watch on YouTube",
  },
  {
    title: "Discover the Book",
    caption: "The Longest Day by Cornelius Ryan — the classic epic of D-Day.",
    image: "/assets/book.png",
    href: "https://www.google.com/goto?url=CAESZgHrOzAVd7Q5WyB6NUuMi5XH-YjZcXuohlDCao_1DXPlEndqfj2eQhT_IR0Y_lJO1CGEhL7rcl6hsO8RdSrmyezIXOpyevlnPZawEJ1c0zE-UcUBtL2eKdpuJDjBxvsfqd1lA59m1w",
    action: "Open book",
  },
  {
    title: "Read the Digital Copy",
    caption: "Explore The Longest Day in the complete online reader.",
    image: "/assets/file.png",
    href: "/assets/longestday00corn_1.html",
    action: "Start reading",
  },
  {
    title: "More Stories Ahead",
    caption: "A growing collection preserving the voices and history of D-Day.",
    image: "/assets/logo.png",
    action: "Coming soon",
  },
] as const;

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);

  useEffect(() => {
    const transitionTimer = window.setTimeout(() => setIntroLeaving(true), 5000);
    const finishTimer = window.setTimeout(() => setIntroVisible(false), 5500);

    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  const finishIntro = () => {
    setIntroLeaving(true);
    window.setTimeout(() => setIntroVisible(false), 500);
  };

  return (
    <main className="site-shell">
      {introVisible && (
        <section
          className={`intro ${introLeaving ? "intro--leaving" : ""}`}
          aria-label="Opening animation"
        >
          <video
            className="intro__video"
            src="/assets/animation.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={(event) => {
              if (event.currentTarget.currentTime >= 5) finishIntro();
            }}
          />
          <button className="intro__skip" type="button" onClick={finishIntro}>
            Skip intro
          </button>
        </section>
      )}

      <section className={`collection ${introVisible ? "collection--waiting" : ""}`}>
        <div className="collection__content">

          <div className="card-grid">
            {resources.map((resource, index) => {
              const cardContent = (
                <>
                  <div className={`card__image-wrap card__image-wrap--${index + 1}`}>
                    <Image
                      src={resource.image}
                      alt=""
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 25vw"
                      className="card__image"
                      unoptimized
                    />
                  </div>
                  <div className="card__body">
                    <span className="card__number">0{index + 1}</span>
                    <h2>{resource.title}</h2>
                    <p>{resource.caption}</p>
                    <span className="card__action">
                      {resource.action}
                      {"href" in resource && <span aria-hidden="true"> ↗</span>}
                    </span>
                  </div>
                </>
              );

              return "href" in resource ? (
                <a
                  className="card"
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={resource.title}
                >
                  {cardContent}
                </a>
              ) : (
                <article className="card card--inactive" key={resource.title}>
                  {cardContent}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
