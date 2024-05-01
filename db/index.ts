import { z } from "zod";
import { Skill_Schema, Skill_Schema_Contents } from "./schema/skills.schema";
import {
    Certifications_Schema,
    Certifications_Schema_Contents,
} from "./schema/certifications.schema";
import { SkillCertification_Schema } from "./schema/skillCertifications.schema";

export type T_Skill_Contents = z.infer<typeof Skill_Schema_Contents>;
export type T_Skill = z.infer<typeof Skill_Schema>;
export type T_Certification_contents = z.infer<
    typeof Certifications_Schema_Contents
>;
export type T_Certification = z.infer<typeof Certifications_Schema>;
export type T_SkillCertification = z.infer<typeof SkillCertification_Schema>;

export { Skill_Schema, Certifications_Schema, SkillCertification_Schema };
