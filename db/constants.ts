// Skills
export const SK_TABLE = "skills";
export const SK_ID = "skill_id";
export const SK_NAME = {
    label: "name",
    maxLength: 63,
} as const;
export const SK_DESCRIPTION = {
    label: "description",
    maxLength: 255,
} as const;
export const SK_IMAGE = {
    label: "image",
    maxLength: 255,
} as const;
export const SK_CATEGORY = {
    label: "category",
    options: ["front-end", "back-end"],
    maxLength: 63,
} as const;

// Certifications
export const CR_TABLE = "certifications";
export const CR_ID = "certification_id";
export const CR_NAME = {
    label: "name",
    maxLength: 63,
} as const;
export const CR_DESCRIPTION = {
    label: "description",
    maxLength: 255,
} as const;
export const CR_IMAGE = {
    label: "image",
    maxLength: 255,
} as const;
export const CR_LINK = {
    label: "link",
    maxLength: 255,
} as const;

// Skill Certifications
export const SC_TABLE = "skill_certifications";
