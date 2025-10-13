import { createClient } from "@supabase/supabase-js";

// متغیرهای محیطی را بدون assertion اولیه دریافت می کنیم
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ مرحله رفع خطا: بررسی می کنیم که آیا متغیرها واقعاً مقدار دارند یا خیر
if (!supabaseUrl || !supabaseAnonKey) {
  // اگر مقدار نداشتند، یک خطای واضح پرتاب می کنیم
  throw new Error(
    "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file or deployment settings."
  );
}

// حالا که از وجود آن مطمئن هستیم، می توانیم با اطمینان createClient را فراخوانی کنیم
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
