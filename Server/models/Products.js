import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category_id: [
        {
            type: String,
            required: true,
        }
    ],
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true
    },
    topProducts: {
        type: Boolean,
        default: false
    },
    specialProducts: {
        type: Boolean,
        default: false
    }



},
    { timestamps: true }
)


export default mongoose.model("Product", productSchema);