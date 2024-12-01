import { ScreenNames } from '@/Navigation/RouteName';

enum ListEventName {
  Refresh = 'Refresh',
}

export type EventRefresh = `${ScreenNames}` | `${ListEventName}`;

interface IRefreshNotification {
  event: EventRefresh;
  data?: any;
}

class RefreshNotificationService {
  private static instance: RefreshNotificationService;
  private listeners: ((notification: IRefreshNotification) => void)[] = [];

  private constructor() {}

  public static getInstance(): RefreshNotificationService {
    if (!RefreshNotificationService.instance) {
      RefreshNotificationService.instance = new RefreshNotificationService();
    }
    return RefreshNotificationService.instance;
  }

  public addListener(listener: (notification: IRefreshNotification) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public notifyEvent(event: EventRefresh): void {
    const notification: IRefreshNotification = { event };
    this.listeners.forEach(listener => listener(notification));
  }
}

// Để thông báo refresh từ bất kỳ đâu trong ứng dụng
export const notifyEvent = (event: EventRefresh) => {
  RefreshNotificationService.getInstance().notifyEvent(event);
};

export default RefreshNotificationService;
