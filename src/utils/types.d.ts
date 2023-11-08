import { categories } from "@/constants/config"

export interface DateTime {
  jusDate: Date | null;
  dateTime: Date | null;
}
type Categories = typeof categories[number]