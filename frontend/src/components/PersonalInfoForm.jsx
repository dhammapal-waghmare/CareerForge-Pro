import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Linkedin,
  Globe,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-600">
          Get started with your personal information here.
        </p>
      </div>

      {/* Image + Remove Background */}
      <div className="flex items-center gap-6">

        {/* Image Upload */}
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user"
              className="w-20 h-20 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border flex items-center justify-center text-slate-500 hover:text-slate-700">
              <User className="size-8" />
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            hidden
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Remove Background Toggle */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium text-gray-700">
              Remove Background
            </p>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() =>
                  setRemoveBackground((prev) => !prev)
                }
                checked={removeBackground}
              />
              <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
            </label>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.key} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="size-4" />
                {field.label}
                {field.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>

              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) =>
                  handleChange(field.key, e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
