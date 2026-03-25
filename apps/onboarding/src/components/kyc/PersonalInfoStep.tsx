"use client";

import { UserCircle, Calendar, Globe, Phone, MapPin, Building2 } from "lucide-react";

interface PersonalInfoData {
  fullName: string;
  dateOfBirth: string;
  country: string;
  state: string;
  city: string;
  phone: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
  onNext: () => void;
}

const countries = [
  "United States", "United Kingdom", "Canada", "India", "Germany",
  "France", "Australia", "Japan", "South Korea", "Brazil",
  "Singapore", "UAE", "Netherlands", "Switzerland", "Sweden",
];

export default function PersonalInfoStep({
  data,
  onChange,
  onNext,
}: PersonalInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <h2 className="font-heading text-xl font-semibold mb-2">Personal Information</h2>
      <p className="text-offwhite/50 text-sm mb-4">
        Please provide your legal name and personal details.
      </p>

      <div>
        <label className="block text-sm font-medium text-offwhite/70 mb-2">
          Full Name
        </label>
        <div className="relative">
          <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            className="input-field pl-10"
            placeholder="Enter your full legal name"
            required
            minLength={2}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-offwhite/70 mb-2">
          Date of Birth
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange({ ...data, dateOfBirth: e.target.value })}
            className="input-field pl-10"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-offwhite/70 mb-2">
          Country
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
          <select
            value={data.country}
            onChange={(e) => onChange({ ...data, country: e.target.value })}
            className="input-field pl-10 appearance-none"
            required
          >
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-offwhite/70 mb-2">
            State / Province
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
            <input
              type="text"
              value={data.state}
              onChange={(e) => onChange({ ...data, state: e.target.value })}
              className="input-field pl-10"
              placeholder="Enter your state"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-offwhite/70 mb-2">
            City / Town
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
            <input
              type="text"
              value={data.city}
              onChange={(e) => onChange({ ...data, city: e.target.value })}
              className="input-field pl-10"
              placeholder="Enter your city or town"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-offwhite/70 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="input-field pl-10"
            placeholder="+1 234 567 8900"
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="btn-primary">
          Continue
        </button>
      </div>
    </form>
  );
}
