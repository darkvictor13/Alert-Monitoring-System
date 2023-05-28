export enum AlertType {
  PRESENCE_ALERT,
  PRESENCE_ALERT_WITH_PHOTO,
}

// the data of specific alerts
export interface AlertDataPresenceWithPhoto {
  size: number;
  buffer: string;
}
