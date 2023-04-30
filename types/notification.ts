export interface INotificationWithoutUser {
  id: number;
  generatedBy: string;
  text: string;
  createdAt: Date;
}

export interface INotification {
  id: number;
  userId: number;
  generatedBy: string;
  text: string;
  createdAt: Date;
}
