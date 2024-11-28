import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['Owner', 'Admin', 'User', 'Guest'], // Allowed roles
        default: 'User', // Default role
        required: true,
    },

}, {
    timestamps: true
});


// Middleware for saving and updating password
userSchema.pre(['save', 'findOneAndUpdate'], async function (next) {
    const user = this; // For 'save', this refers to the user document
    
    if (user.isModified && !user.isModified('password')) {
      return next();
    }

    // For findOneAndUpdate, `this` is the query object, not the document
    if (this.getUpdate) {
      const update = this.getUpdate();
      
      if (!update.$set.password) {
        return next();
      }

      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.$set.password, salt);
      this.setUpdate(update); // Ensure the update query has the hashed password
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  
    next();
});

// Compare password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;