import joi from "joi";

export const professorsCreationSchema = joi.object({
    name: joi.string().required(),
    discipline: joi.string().required()
});

export const idSchemaFindProfessor = joi.object({
    id: joi.number().required()
});