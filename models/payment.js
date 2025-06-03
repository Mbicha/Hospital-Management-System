import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    visit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visit",
        required: true,
    },
    method: {
        type: String,
        enum: ["CreditCard", "DebitCard", "Cash", "Insurance"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0.0,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    },
    cratedAt: {
        type: Date,
        default: Date.now,
    },
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
