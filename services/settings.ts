import { api } from "@/services/api";

export type Setting = {
  readonly name: string;
  readonly value: string;
  readonly category: string;
  readonly description: string;
}

export type Settings = {
  data: Setting[]
};

export function getSettings() {
  return api.get<Settings>(`/settings/`).then((response) => ({
    data: response.data.data,
  }))
}

export function saveSetting(setting: Setting) {
  return api.put<Setting>(`/settings/${ setting.name }`, setting).then((response) => ({
    data: response.data,
  }));
}