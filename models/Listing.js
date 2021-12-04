import mongoose from "mongoose";

const { model, Schema } = mongoose;

const listingSchema = new Schema({
  user: Schema.Types.ObjectId, // pwhbdev
  title: {
    my: String,
    en: String,
  }, // Home for sale
  type: Number, // Apartment, Condo, House
  description: {
    my: String,
    en: String,
  },
  location: {
    street: {
      my: String,
      en: String,
    }, // Myat Eain Yar
    quarter: {
      my: String,
      en: String,
    }, // Da Nyin Gone
    township: Number, // Insein
    state_or_division: Number, //Yangon
    coordinate: [Number], //
  },
  places_nearby: [
    {
      my: String,
      en: String,
    },
  ],
  floor: Number,
  flooring: Number, //
  length: Number, // 40
  width: Number, // 20
  lot_length: Number, // 48
  lot_width: Number, // 24
  bedrooms: Number, // 2
  bathrooms: Number, // 1
  hall: Boolean, // false
  price: {
    amount: Number,
    currency: Number,
  }, // {amount: 240 Lakhs, currency: mmk}
  pictures: [String],
  created_at: Date, //
  updated_at: Date, //
  sold: Date,
  likes: [Schema.Types.ObjectId],
});

const Listing = model("Listing", listingSchema);

export default Listing;
