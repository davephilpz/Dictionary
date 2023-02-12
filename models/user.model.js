const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must input a user name."],
      unique: false,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Must input an email address."],
      unique: true,
      lowercase: true, //will transform string to lowercase
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a valid password."],
      select: false,
      minLength: [10, "Password must be at least 10 characters long."],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Must confirm password."],
      select: false,
      validate: {
        //this only works on create and save and must use save when updating a password.
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords must match.",
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    myWords: {
      red: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Word",
        },
      ],
      orange: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Word",
        },
      ],
      yellow: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Word",
        },
      ],
      green: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Word",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", usersSchema);
