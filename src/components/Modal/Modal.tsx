"use client";
import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  ReactNode, // ❌ این خط حذف شود چون 'children' استفاده نمی‌شود
} from "react";
// ✅ FIX 1: ایمپورت کامپوننت Image از Next.js برای بهینه‌سازی
import Image from "next/image";

interface TierData {
  name: string;
  description: string;
  amount: string;
  coverDataUrl?: string | null;
}

interface TierFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initial?: TierData;
  onDelete?: () => void;
  // children?: ReactNode; // ✅ FIX 2: حذف شد زیرا در کامپوننت استفاده نشده است.
}

const defaultInitial: TierData = {
  name: "",
  description: "",
  amount: "",
  coverDataUrl: null,
};

const TierFormModal: React.FC<TierFormModalProps> = ({
  isOpen,
  onClose,
  initial = defaultInitial,
  onDelete,
  // children, // ✅ FIX 2: حذف شد
}) => {
  const [tierData, setTierData] = useState<TierData>(initial);

  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        window.removeEventListener("keydown", handleKey);
        document.body.style.overflow = previousOverflow || "unset";
      };
    }
    return;
  }, [isOpen, onClose]);

  useEffect(() => {
    setTierData(initial);
  }, [initial]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setTierData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTierData((prev) => ({
        ...prev,
        coverDataUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCover = () => {
    setTierData((prev) => ({ ...prev, coverDataUrl: null }));
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    onClose();
  };

  const handleDeleteTier = () => {
    if (onDelete) {
      onDelete();
    }
    onClose();
  };

  const handleContributeClick = () => {
    alert(`Simulating contribution to tier: ${tierData.name}`);
  };

  if (!isOpen) return null;

  const primaryColor = "bg-indigo-600";
  const primaryHover = "hover:bg-indigo-700";
  const primaryRingFocus = "focus:ring-indigo-500 focus:border-indigo-500";

  const formatAmountForPreview = (amount: string) => {
    const match = amount.match(/(\d+(?:[.,]\d+)*)\s*(USD|\$|Toman|تومان)?/i);
    return match ? `$${match[1].replace(",", ".")}` : amount;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] transform transition-all duration-300 flex flex-col" // flex-col برای چیدمان داخلی
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-lg font-semibold text-indigo-600">
            Contribution Tier
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 rounded-md p-1"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 border border-gray-100 rounded-xl shadow-inner">
              <h2 className="text-2xl font-bold mb-6 text-indigo-600">
                Tier type
              </h2>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={tierData.name}
                    onChange={handleChange}
                    placeholder="e.g., Bronze Sponsor"
                    className={`w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none ${primaryRingFocus}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Reward description
                  </label>
                  <textarea
                    id="description"
                    value={tierData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the rewards for this tier"
                    className={`w-full p-2 border border-gray-300 rounded-md resize-y shadow-sm outline-none ${primaryRingFocus}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="text"
                    value={tierData.amount}
                    onChange={handleChange}
                    placeholder="e.g., 20 USD or $20"
                    className={`w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none ${primaryRingFocus}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add cover photo
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="coverUpload"
                      className="w-40 h-28 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-4xl text-gray-400 cursor-pointer hover:bg-gray-100 transition duration-150 overflow-hidden"
                      title="Upload cover image"
                    >
                      {tierData.coverDataUrl ? (
                        // ✅ FIX 1: جایگزینی <img> با <Image /> Next.js
                        <Image
                          src={tierData.coverDataUrl}
                          alt="cover preview"
                          fill // استفاده از fill برای پر کردن کانتینر
                          className="object-cover"
                        />
                      ) : (
                        <span className="select-none text-3xl">+</span>
                      )}
                    </label>
                    <div className="flex-1 text-sm text-gray-600">
                      <input
                        id="coverUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <p>Recommended size: 1200×400. PNG, JPG up to 5MB.</p>
                      <div className="mt-3 flex gap-3">
                        {tierData.coverDataUrl && (
                          <button
                            type="button"
                            onClick={handleRemoveCover}
                            className="px-3 py-2 border border-red-200 rounded-md text-sm text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleDeleteTier}
                    className="px-5 py-2 text-gray-600 border border-gray-400 rounded-lg font-medium hover:bg-gray-100 transition duration-150"
                  >
                    Delete
                  </button>

                  <button
                    type="submit"
                    className={`px-5 py-2 ${primaryColor} text-white font-semibold rounded-lg shadow-md ${primaryHover}`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-1 p-6">
              <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
                Preview
              </h2>
              <div className="border border-gray-300 rounded-xl shadow-lg overflow-hidden text-center transform hover:scale-[1.02] transition duration-300 ease-in-out">
                <div
                  className={`py-3 ${primaryColor} text-white font-bold text-lg`}
                >
                  {tierData.name || "Default Tier Name"}
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-3">
                    You are on the list
                  </p>

                  <div className="w-full h-28 mx-auto mb-4 rounded-md flex items-center justify-center text-gray-500 font-medium text-sm border border-indigo-200 overflow-hidden relative">
                    {tierData.coverDataUrl ? (
                      // ✅ FIX 1: جایگزینی <img> با <Image /> Next.js
                      <Image
                        src={tierData.coverDataUrl}
                        alt="Cover preview"
                        fill // استفاده از fill برای پر کردن کانتینر
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                        Tier Cover Image
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      Start at{" "}
                      <span className="text-2xl font-extrabold text-gray-900">
                        {formatAmountForPreview(tierData.amount)}
                      </span>
                    </p>

                    <p className="text-xs text-gray-600 mb-4 h-12 overflow-hidden line-clamp-3">
                      {tierData.description}
                    </p>

                    <button
                      className={`w-full py-2 ${primaryColor} text-white font-semibold rounded-lg shadow-md ${primaryHover}`}
                      onClick={handleContributeClick}
                    >
                      Contribute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierFormModal;
