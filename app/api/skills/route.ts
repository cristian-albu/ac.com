import { createSkill, getSkills } from "@/db/model/skills.model";
import { Skill_Schema_Contents } from "@/db/schema/skills.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const res = await getSkills();
    return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const newSkill = Skill_Schema_Contents.safeParse(body);

    if (!newSkill.success) {
        return NextResponse.json(
            { data: "Invalid parameters" },
            { status: 400 }
        );
    }

    try {
        const res = await createSkill(newSkill.data);
        return NextResponse.json({ data: res }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ data: error }, { status: 500 });
    }
}
