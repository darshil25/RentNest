const mongoose = require("mongoose");
const User = require("../models/User");
const { stringify } = require("uuid");
const { ObjectId } = require("mongoose/lib/schema");

function updateDate(next) {
    this.updatedDate = new Date();
    next();
}


const adminSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "admin",
        },
        roleId: { type: String, required: true },
        name: { type: String, required: true }
    },
    { collection: 'admin' }
);

const admin = mongoose.model("admin", adminSchema);

