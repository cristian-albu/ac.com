import { z } from "zod";
import {
    CR_TABLE,
    CR_ID,
    CR_NAME,
    CR_DESCRIPTION,
    CR_IMAGE,
    CR_LINK,
    CR_ISSUER,
    CR_DATE_ISSUED,
} from "../constants";

export const Certifications_Schema_Contents = z.object({
    [CR_NAME.label]: z.string().max(CR_NAME.maxLength).min(1),
    [CR_DESCRIPTION.label]: z.string().max(CR_DESCRIPTION.maxLength).min(1),
    [CR_IMAGE.label]: z.string().max(CR_IMAGE.maxLength).url(),
    [CR_LINK.label]: z.string().max(CR_LINK.maxLength).url(),
    [CR_ISSUER.label]: z.string().max(CR_ISSUER.maxLength).min(1),
    [CR_DATE_ISSUED]: z.coerce.date(),
});

export const Certifications_Schema = Certifications_Schema_Contents.and(
    z.object({
        [CR_ID]: z.number().int(),
    })
);

const Certifications = `--sql
CREATE TABLE ${CR_TABLE}(
        ${CR_ID} SERIAL PRIMARY KEY,
        ${CR_NAME.label} VARCHAR(${CR_NAME.maxLength}) NOT NULL UNIQUE,
        ${CR_DESCRIPTION.label} VARCHAR(${CR_DESCRIPTION.maxLength}) NOT NULL,
        ${CR_IMAGE.label} VARCHAR(${CR_IMAGE.maxLength}) NOT NULL,
        ${CR_LINK.label} VARCHAR(${CR_LINK.maxLength}) NOT NULL,
        ${CR_ISSUER.label} VARCHAR(${CR_ISSUER.maxLength}) NOT NULL,
        ${CR_DATE_ISSUED} DATE NOT NULL
);`;

export const certifications_table = {
    name: CR_TABLE,
    query: Certifications,
};
