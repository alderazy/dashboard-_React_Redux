// استدعاء أدوات إنشاء الـ Slice والـ Async Thunk من مكتبة Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// استدعاء مكتبة axios لإرسال طلبات الـ HTTP
import axios from "axios";

/**
 * 1️⃣ إنشاء Async Thunk لجلب بيانات لوحة التحكم
 * - الاسم المفتاحي: 'apiRq/getDataDashboard'
 * - يُستخدم للتعامل مع العمليات اللاتزامية (API Requests)
 */
export const getDataDashboard = createAsyncThunk(
  "apiRq/getDataDashboard",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال طلب GET لقراءة ملف البيانات المحلي data.json
      const res = await axios.get(`/data.json`);

      // إرجاع كائن بيانات الـ dashboard ليُمرر كـ payload في حالة النجاح (fulfilled)
      return res.data.dashboard;
    } catch (error) {
      console.log(error);

      // التعامل مع الأخطاء وإرجاع رسالة الخطأ المخصصة في حالة الفشل (rejected)
      return rejectWithValue("cant get data" + error);
    }
  },
);

// 2️⃣ إعداد الحالة المبدئية (Initial State) للـ Slice
const Data = {
  dashboard: [], // مصفوفة/كائن لتخزين بيانات لوحة التحكم القادمة من الـ API
  error: null, // متغير لتخزين نص رسالة الخطأ في حال حدوث فشل
};

/**
 * 3️⃣ إنشاء الـ Slice الخاص ببيانات لوحة التحكم
 */
export const DataDashboard = createSlice({
  name: "DataDashboard",
  initialState: Data,

  // معالجة الحالات الناتجة عن الـ Async Thunk (النجاح / الفشل)
  extraReducers: (builder) => {
    // حالة نجاح جلب البيانات (fulfilled)
    builder.addCase(getDataDashboard.fulfilled, (state, { payload }) => {
      state.dashboard = payload; // تحديث حالة الـ dashboard بالبيانات المرجعة
    });

    // حالة فشل جلب البيانات (rejected)
    builder.addCase(getDataDashboard.rejected, (state, action) => {
      // تخزين رسالة الخطأ القادمة من rejectWithValue أو النص الافتراضي
      state.error = action.payload || "=======> error";
    });
  },
});

// تصدير الـ Reducer الرئيسي لإضافته في ملف الـ Store
export default DataDashboard.reducer;
