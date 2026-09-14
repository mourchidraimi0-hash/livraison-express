const ICONS = {
  truck: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5v8.25H2.25V8.25Z M14.25 11.25h3.086a1.5 1.5 0 0 1 1.06.44l2.164 2.163a1.5 1.5 0 0 1 .44 1.061v2.086a.75.75 0 0 1-.75.75h-1.5 M14.25 16.5h-9 M2.25 16.5H.75 M6 18.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.25 18.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
    />
  ),
  bolt: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5 12 2.25 10.5 9.75h9.75L12 21.75l1.5-8.25H3.75Z"
    />
  ),
  user: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 20.25v-1.5a3.75 3.75 0 0 0-3.75-3.75h-3a3.75 3.75 0 0 0-3.75 3.75v1.5 M12 11.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
    />
  ),
  clipboard: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3.75h6a.75.75 0 0 1 .75.75v1.5H8.25v-1.5a.75.75 0 0 1 .75-.75Z M6.75 6h10.5a1.5 1.5 0 0 1 1.5 1.5v11.25a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5V7.5a1.5 1.5 0 0 1 1.5-1.5Z M9 12h6 M9 15.75h6"
    />
  ),
} as const;

export type FeatureIconName = keyof typeof ICONS;

export default function FeatureIcon({ name }: { name: FeatureIconName }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-6 w-6"
        aria-hidden="true"
      >
        {ICONS[name]}
      </svg>
    </div>
  );
}
