import { z } from "zod";
import {
    CR_TABLE,
    CR_ID,
    CR_NAME,
    CR_DESCRIPTION,
    CR_IMAGE,
    CR_LINK,
} from "../constants";

export const Certifications_Schema = z.object({
    [CR_ID]: z.number().int(),
    [CR_NAME.label]: z.string().max(CR_NAME.maxLength),
    [CR_DESCRIPTION.label]: z.string().max(CR_DESCRIPTION.maxLength),
    [CR_IMAGE.label]: z.string().max(CR_IMAGE.maxLength).url(),
    [CR_LINK.label]: z.string().max(CR_LINK.maxLength).url(),
});

const Certifications = `--sql
CREATE TABLE ${CR_TABLE}(
        ${CR_ID} SERIAL PRIMARY KEY,
        ${CR_NAME.label} VARCHAR(${CR_NAME.maxLength}) NOT NULL UNIQUE,
        ${CR_DESCRIPTION.label} VARCHAR(${CR_DESCRIPTION.maxLength}) NOT NULL,
        ${CR_IMAGE.label} VARCHAR(${CR_IMAGE.maxLength}) NOT NULL,
        ${CR_LINK.label} VARCHAR(${CR_LINK.maxLength}) NOT NULL
);`;

export const certifications_table = {
    name: CR_TABLE,
    query: Certifications,
};
