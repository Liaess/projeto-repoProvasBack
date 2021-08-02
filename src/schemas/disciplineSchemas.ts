import joi from "joi";

export const idSchemaFindDisciplines = joi.object({
    id: joi.number().required()
});