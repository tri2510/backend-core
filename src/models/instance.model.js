const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const InstanceRelation = require('./instanceRelation.model');

const instanceSchema = new mongoose.Schema(
  {
    // Reference to the Schema this instance conforms to
    schema: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Schema',
      required: true,
      index: true, // Important for querying instances of a specific schema
    },
    // The actual data/object payload
    data: {
      type: mongoose.SchemaTypes.Mixed,
      required: true,
      // Validation against the referenced schemaDefinition would typically happen
      // in the service layer before saving, not directly in the Mongoose schema.
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins
instanceSchema.plugin(toJSON);
instanceSchema.plugin(paginate);

instanceSchema.post('remove', async function (_, next) {
  try {
    const instanceRelations = await InstanceRelation.find({
      $or: [
        { source: this._id },
        { target: this._id },
      ],
    });
    await Promise.all(instanceRelations.map((ir) => ir.remove()));
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * @typedef Instance
 */
const Instance = mongoose.model('Instance', instanceSchema);

module.exports = Instance;
