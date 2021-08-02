import joi from "joi";

export const examCreationSchema = joi.object({
    examName: joi.string().required(),
    examLink: joi.string().uri().required(),
    category: joi.string().required(),
    professor: joi.string().required(),
    discipline: joi.string().required(),
});