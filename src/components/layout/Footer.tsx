export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 px-4 py-3">
      <p className="text-center text-[11px] text-muted-foreground/60">
        Demo only. Not real financial advice. Bond data reflects real transit
        agencies but purchases are simulated. Map data{" "}
        <a
          href="https://protomaps.com"
          className="underline hover:text-muted-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          Protomaps
        </a>{" "}
        &{" "}
        <a
          href="https://openstreetmap.org"
          className="underline hover:text-muted-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>
        .
      </p>
    </footer>
  );
}
