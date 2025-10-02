import { API_URL } from "@/config/api";

export async function getCarouselImages() {
  const response = await fetch(API_URL);
  const data: unknown = await response.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return { props: { images: (data as { data: unknown[] }).data } };
  }
  return { props: { images: [] } };
}
