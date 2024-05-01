import {
    deleteCertification,
    getCertification,
} from "@/db/model/certifications.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const cert_id = Number(params.id);

    if (isNaN(cert_id)) {
        return NextResponse.json("Invalid params", { status: 400 });
    }

    try {
        const result = await getCertification(cert_id);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const cert_id = Number(params.id);

    if (isNaN(cert_id)) {
        return NextResponse.json("Invalid params", { status: 400 });
    }
    try {
        const result = await deleteCertification(cert_id);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
