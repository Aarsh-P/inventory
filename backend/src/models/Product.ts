import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from './Category';

export interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  categories: ICategory['_id'][];
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
