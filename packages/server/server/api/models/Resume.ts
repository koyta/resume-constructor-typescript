import mongoose, { Schema, SchemaDefinition, HookNextFunction } from "mongoose";

const schemaDefinition: SchemaDefinition = {
  profession: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: Number
  },
  github: {
    type: Object
  },
  medium: {
    type: Object
  },
  skills: {
    type: Array
  },
  experience: {
    type: Object
  },
  owner: {
    type: String,
    required: true
  }
};

const resumeSchema = new Schema({ schemaDefinition });

resumeSchema.path("phone").validate(function(next: HookNextFunction) {
  if (this.email || this.phone) {
    next();
  } else {
    next(new Error("You must specify one of the 'error' or 'phone' fields"));
  }
});

resumeSchema.path("email").validate(function(next: HookNextFunction) {
  if (this.email || this.phone) {
    next();
  } else {
    next(new Error("You must specify one of the 'error' or 'phone' fields"));
  }
});

export default mongoose.model("Resume", resumeSchema);
