import { post } from "@/util/axios";

export function uploadAsync(url, data) {
  return post(url, data);
}
