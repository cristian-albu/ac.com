import {
    createCertification,
    getCertifications,
} from "@/db/model/certifications.model";
import { Certifications_Schema_Contents } from "@/db/schema/certifications.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await getCertifications();

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    const newCertification = Certifications_Schema_Contents.safeParse(body);

    if (!newCertification.success) {
        return NextResponse.json(
            { error: newCertification.error },
            { status: 400 }
        );
    }

    try {
        const res = await createCertification(body);

        return NextResponse.json(res, { status: 201 });
    } catch (error: any) {
        if (error.code === "23505") {
            return NextResponse.json(
                {
                    error: "Invalid parameters. Value with unique contraint already exists",
                },
                { status: 400 }
            );
        }
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
}
