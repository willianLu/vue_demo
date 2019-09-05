import { post } from "@/util/axios";

export function loginAsync(url, data) {
  return post(url, data);
}
