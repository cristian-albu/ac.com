import { PoolClient } from "pg";
import pool from "../client";
import {
    CR_DATE_ISSUED,
    CR_DESCRIPTION,
    CR_ID,
    CR_IMAGE,
    CR_ISSUER,
    CR_LINK,
    CR_NAME,
    CR_TABLE,
} from "../constants";
import { T_Certification, T_Certification_contents } from "..";

export async function getCertifications() {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();

        const results = await client.query<T_Certification>(
            `SELECT * FROM ${CR_TABLE};`
        );

        return results.rows;
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}
export async function getCertification(id: number) {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();

        const result = await client.query<T_Certification>(
            `SELECT * FROM ${CR_TABLE} WHERE ${CR_ID}=$1;`,
            [id]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}
export async function createCertification(
    certification: T_Certification_contents
) {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();

        const res = await client.query<T_Certification>(
            `INSERT INTO ${CR_TABLE}(${CR_NAME.label}, ${CR_DESCRIPTION.label}, ${CR_IMAGE.label}, ${CR_LINK.label}, ${CR_ISSUER.label}, ${CR_DATE_ISSUED}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [
                certification.name,
                certification.description,
                certification.image,
                certification.link,
                certification.issuer,
                certification.date_issued,
            ]
        );

        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}
export async function deleteCertification(id: number) {
    let client: PoolClient | undefined;

    try {
        client = await pool.connect();

        const result = await client.query(
            `DELETE FROM ${CR_TABLE} WHERE ${CR_ID}=$1;`,
            [id]
        );

        return { message: "Certification deleted successfully" };
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}
