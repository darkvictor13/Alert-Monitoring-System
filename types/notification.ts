import { AlertType } from "./alert";

export interface INotificationWithoutUser {
  id: number;
  generatedBy: string;
  text: string;
  createdAt: Date;
  type: AlertType;
  alertId: number;
  imagePath?: string;
}

export interface INotification {
  id: number;
  userId: number;
  generatedBy: string;
  text: string;
  createdAt: Date;
  type: AlertType;
  alertId: number;
  imagePath?: string;
}
