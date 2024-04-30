import { z } from "zod";
import { Skill_Schema } from "./schema/skills";

export type T_Skill = z.infer<typeof Skill_Schema>;

export { Skill_Schema };
