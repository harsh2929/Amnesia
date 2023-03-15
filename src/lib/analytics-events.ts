const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

type GenericEvent<
  C extends string = string,
  E extends `${C}${string}` = `${C}`,
  P = Record<string, unknown>
> = {
  category: C;
  eventName: E;
  loads?: P;
};

export type LoginEvent = GenericEvent<
  'login',
  | 'login_prev_mode'
  | 'login_apikey'
  | 'login_password'
  | 'login_password_failed'
>;

export type GameEvent = GenericEvent<
  'game',
  'game_start' | 'game_end',
  {
    map_name: string;
    map_category: string;
    total_rounds: number;
    total_players: number;
  }
>;

export function gaevent<T extends GenericEvent>({
  eventName,
  category,
  loads,
}: T) {
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      ...(loads && loads),
    });
  }
}

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_locationss: url,
  });
};
