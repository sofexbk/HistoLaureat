const mongoose=require('mongoose')
const stageSchema = new mongoose.Schema({
  laureatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  company: { type: String, required: true },
  type: { type: String,enum:['Observation','PFA','PFA'], required: true },
  title: { type: String, required: true },
  description: { type: String,required: true  },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});
module.exports = mongoose.model('Stage', stageSchema);
