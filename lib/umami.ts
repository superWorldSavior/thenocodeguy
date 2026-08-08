type UmamiPayload = Record<string, string | number | boolean | null | undefined>;

type UmamiWindow = Window & {
  umami?: {
    track?: (eventName: string, payload?: UmamiPayload) => void;
  };
};

export function trackUmamiEvent(eventName: string, payload?: UmamiPayload): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const umamiWindow = window as UmamiWindow;
  if (typeof umamiWindow.umami?.track !== 'function') {
    return false;
  }

  umamiWindow.umami.track(eventName, payload);
  return true;
}
