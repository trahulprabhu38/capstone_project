import mongoose, { Document, Schema } from "mongoose";

export interface IConfig extends Document {
  key: string;
  value: string;
  updatedAt: Date;
  createdAt: Date;
}

const configSchema = new Schema<IConfig>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ConfigModel = mongoose.model<IConfig>("Config", configSchema);

/**
 * Get a config value by key, with an optional fallback.
 */
export async function getConfigValue(
  key: string,
  fallback = ""
): Promise<string> {
  const doc = await ConfigModel.findOne({ key }).lean();
  return doc?.value || fallback;
}

/**
 * Set a config value by key (upsert).
 */
export async function setConfigValue(
  key: string,
  value: string
): Promise<IConfig> {
  return ConfigModel.findOneAndUpdate(
    { key },
    { value },
    { upsert: true, new: true }
  ) as Promise<IConfig>;
}
