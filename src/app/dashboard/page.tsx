// app/dashboard/page.tsx
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/public-profile"); // 👈 حلقه در همین‌جا ایجاد می‌شود
}
