import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';

export async function set(key: string, value: any): Promise<void> {
  await Storage.set({
    key: `${environment.appName}-${key}`,
    value: JSON.stringify(value),
  });
}

export async function get(key: string): Promise<any> {
  let item = await Storage.get({ key: `${environment.appName}-${key}` });
  try {
    item = JSON.parse(item.value);
    return item;
  } catch (error) {
    return item;
  }
}

export async function remove(key: string): Promise<void> {
  await Storage.remove({
    key: `${environment.appName}-${key}`,
  });
}
