import { categories } from "@/constants/config"

export interface DateTime {
  justDate: Date | null;
  dateTime: Date | null;
}
type Categories = typeof categories[number]