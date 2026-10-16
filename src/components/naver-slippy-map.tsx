"use client";

import { useEffect, useRef, useState } from "react";

const TILE = 256;
/** Naver basic style revision. Tiles are the live map, not a screenshot. */
const STYLE = "1791456229";

type LngLat = { lat: number; lng: number };

function project(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lng + 180) / 360) * n;
  const s = Math.sin((lat * Math.PI) / 180);
  const y =
    (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n;
  return { x, y };
}

function unproject(x: number, y: number, zoom: number): LngLat {
  const n = 2 ** zoom;
  const lng = (x / n) * 360 - 180;
  const lat =
    (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;
  return { lat, lng };
}

export function NaverSlippyMap({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    x: number;
    y: number;
    lat: number;
    lng: number;
  } | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [center, setCenter] = useState<LngLat>({ lat, lng });
  const [zoom, setZoom] = useState(17);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const rect = frame.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setZoom((current) =>
        Math.min(18, Math.max(15, current + (event.deltaY < 0 ? 1 : -1))),
      );
    };
    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, []);

  const origin = project(center.lat, center.lng, zoom);
  const place = project(lat, lng, zoom);
  const tiles = [];
  if (size.w > 0 && size.h > 0) {
    const minX = Math.floor(origin.x - size.w / 2 / TILE) - 1;
    const maxX = Math.floor(origin.x + size.w / 2 / TILE) + 1;
    const minY = Math.floor(origin.y - size.h / 2 / TILE) - 1;
    const maxY = Math.floor(origin.y + size.h / 2 / TILE) + 1;
    for (let x = minX; x <= maxX; x += 1) {
      for (let y = minY; y <= maxY; y += 1) {
        tiles.push({
          key: `${zoom}/${x}/${y}`,
          left: size.w / 2 + (x - origin.x) * TILE,
          top: size.h / 2 + (y - origin.y) * TILE,
          src: `https://map.pstatic.net/nrb/styles/basic/${STYLE}/${zoom}/${x}/${y}.png`,
        });
      }
    }
  }

  const pinLeft = size.w / 2 + (place.x - origin.x) * TILE;
  const pinTop = size.h / 2 + (place.y - origin.y) * TILE;

  return (
    <div
      ref={frameRef}
      role="application"
      aria-label={`${label} 네이버 지도`}
      className="relative h-[min(420px,70vw)] min-h-[260px] w-full cursor-grab touch-none overflow-hidden active:cursor-grabbing"
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
          x: event.clientX,
          y: event.clientY,
          lat: center.lat,
          lng: center.lng,
        };
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag) return;
        const start = project(drag.lat, drag.lng, zoom);
        setCenter(
          unproject(
            start.x - (event.clientX - drag.x) / TILE,
            start.y - (event.clientY - drag.y) / TILE,
            zoom,
          ),
        );
      }}
      onPointerUp={() => {
        dragRef.current = null;
      }}
      onPointerCancel={() => {
        dragRef.current = null;
      }}
    >
      {tiles.map((tile) => (
        <img
          key={tile.key}
          src={tile.src}
          alt=""
          draggable={false}
          className="pointer-events-none absolute max-w-none"
          style={{ left: tile.left, top: tile.top, width: TILE, height: TILE }}
        />
      ))}
      <span
        className="pointer-events-none absolute z-[1]"
        style={{ left: pinLeft, top: pinTop, transform: "translate(-50%, -100%)" }}
      >
        <svg width="28" height="36" viewBox="0 0 28 36" aria-hidden>
          <path
            d="M14 35C14 35 26 20.5 26 13.2C26 6.5 20.6 1 14 1C7.4 1 2 6.5 2 13.2C2 20.5 14 35 14 35Z"
            fill="#5DC39B"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx="14" cy="13" r="4.5" fill="#ffffff" />
        </svg>
      </span>
      <div className="absolute top-3 right-3 z-[2] flex flex-col overflow-hidden rounded-full bg-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          aria-label="지도 확대"
          className="flex size-9 items-center justify-center text-[20px] leading-none text-[#242424] hover:bg-[#F5F5E9]"
          onClick={() => setZoom((current) => Math.min(18, current + 1))}
        >
          +
        </button>
        <button
          type="button"
          aria-label="지도 축소"
          className="flex size-9 items-center justify-center border-t border-black/10 text-[20px] leading-none text-[#242424] hover:bg-[#F5F5E9]"
          onClick={() => setZoom((current) => Math.max(15, current - 1))}
        >
          −
        </button>
      </div>
    </div>
  );
}
