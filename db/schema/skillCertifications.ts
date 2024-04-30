import { z } from "zod";
import { SC_TABLE, SK_ID, CR_ID, SK_TABLE, CR_TABLE } from "../constants";

export const SkillCertification_Schema = z.object({
    [SK_ID]: z.number().int(),
    [CR_ID]: z.number().int(),
});

const SkillCertifications = `--sql
CREATE TABLE ${SC_TABLE}(
        ${SK_ID} INT,
        ${CR_ID} INT,
        FOREIGN KEY (${SK_ID}) REFERENCES ${SK_TABLE}(${SK_ID}),
        FOREIGN KEY (${CR_ID}) REFERENCES ${CR_TABLE}(${CR_ID}),
        PRIMARY KEY (${SK_ID}, ${CR_ID})
);`;

export const skill_certifications = {
    name: SC_TABLE,
    query: SkillCertifications,
};
