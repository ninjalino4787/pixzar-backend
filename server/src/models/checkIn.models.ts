import mongoose, {Schema} from "mongoose"

interface IcheckIn extends Document{
        habitId: mongoose.Types.ObjectId,
        userId: mongoose.Types.ObjectId,
        date: Date,
        createdAt: Date,
        updatedAt: Date,
        checker: Boolean
}

const checkInSchema = new Schema <IcheckIn>({
    habitId:{
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
    },

    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
       
    },
    
    date:{
        type: Date,
    },
    checker:{
        type:Boolean,
        required: true
    }

},{
    timestamps: true
});

export const CheckIn = mongoose.model<IcheckIn>("CheckIn", checkInSchema)
