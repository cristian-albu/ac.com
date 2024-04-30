import { z } from "zod";
import {
    SK_CATEGORY,
    SK_DESCRIPTION,
    SK_ID,
    SK_IMAGE,
    SK_NAME,
    SK_TABLE,
} from "../constants";

export const Skill_Schema = z.object({
    [SK_ID]: z.number().int(),
    [SK_NAME.label]: z.string().max(SK_NAME.maxLength),
    [SK_DESCRIPTION.label]: z.string().max(SK_DESCRIPTION.maxLength),
    [SK_IMAGE.label]: z.string().max(SK_IMAGE.maxLength).url(),
    [SK_CATEGORY.label]: z.enum(SK_CATEGORY.options),
});

const Skills = `--sql
CREATE TABLE ${SK_TABLE}(
        ${SK_ID} SERIAL PRIMARY KEY,
        ${SK_NAME.label} VARCHAR(${SK_NAME.maxLength}) NOT NULL UNIQUE,
        ${SK_DESCRIPTION.label} VARCHAR(${SK_DESCRIPTION.maxLength}) NOT NULL,
        ${SK_IMAGE.label} VARCHAR(${SK_IMAGE.maxLength}) NOT NULL,
        ${SK_CATEGORY.label} VARCHAR(${SK_CATEGORY.maxLength}) 
                CHECK (${SK_CATEGORY.label} IN (${SK_CATEGORY.options
    .map((option) => `'${option}'`)
    .join(", ")}))
);`;

export const skills_table = {
    name: SK_TABLE,
    query: Skills,
};
