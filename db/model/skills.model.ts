import { PoolClient } from "pg";
import pool from "../client";
import {
    SK_CATEGORY,
    SK_DESCRIPTION,
    SK_ID,
    SK_IMAGE,
    SK_NAME,
    SK_TABLE,
} from "../constants";
import { T_Skill, T_Skill_Contents } from "..";

/** Retrieves all skills from the database table. It does not retrieve associated skill certifications */
export async function getSkills() {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();
        const skills = await client.query<T_Skill>(`SELECT * FROM ${SK_TABLE}`);

        return skills.rows;
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

/** Retrieves a specific skill based on the provided ID. It does not retrieve associated skill certifications */
export async function getSkill(id: number) {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();

        const skill = await client.query<T_Skill>(
            `SELECT 1 FROM ${SK_TABLE} WHERE ${SK_ID}=$1`,
            [id]
        );

        if (!skill) {
            throw new Error("Skill not found");
        }

        return skill.rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

/** Inserts a new skill into the database and returns the inserted skill. It does not handle the creation of associated skill certifications */
export async function createSkill(skill: T_Skill_Contents) {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();

        const result = await client.query<T_Skill>(
            `INSERT INTO ${SK_TABLE} (${SK_NAME.label}, ${SK_DESCRIPTION.label}, ${SK_IMAGE.label}, ${SK_CATEGORY.label}) VALUES($1, $2, $3, $4) RETURNING *;`,
            [skill.name, skill.description, skill.image, skill.category]
        );

        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

/** Deletes a skill from the database based on the provided ID. */
export async function deleteSkill(id: number) {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();

        const result = await client.query(
            `DELETE FROM ${SK_TABLE} WHERE ${SK_ID}=$1`,
            [id]
        );

        if (result.rows.length === 0) {
            throw new Error("Skill not found");
        }

        return {
            message: `Deleted ${SK_ID} from ${SK_TABLE} table successfully`,
        };
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}
