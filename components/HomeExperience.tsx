import type { ReactNode } from "react";

/**
 * Connects the homepage sections with a quiet, animated deep-field backdrop.
 * The layered orbit paths sit behind real content and stay decorative only.
 */
export default function HomeExperience({ children }: { children: ReactNode }) {
  return (
    <div className="home-experience relative isolate overflow-hidden">
      <div className="home-experience__field" aria-hidden="true">
        <div className="home-experience__stars" />
        <span className="home-experience__orbit home-experience__orbit--one" />
        <span className="home-experience__orbit home-experience__orbit--two" />
        <span className="home-experience__orbit home-experience__orbit--three" />
        <span className="home-experience__spark home-experience__spark--one" />
        <span className="home-experience__spark home-experience__spark--two" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
