import { NextRequest, NextResponse } from "next/server";

import { requireAdminApiAuth } from "@/lib/admin/api-auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return badRequest("Invalid form data");
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return badRequest("No file provided — include a 'file' field in form-data");
  }

  if (file.size > MAX_FILE_SIZE) {
    return badRequest(`File too large (max ${MAX_FILE_SIZE / 1024 / 1024} MB)`);
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return badRequest(`Unsupported file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}`);
  }

  const folder = (formData.get("folder") as string | null) ?? "blog";
  const publicIdRaw = (formData.get("publicId") as string | null)?.trim() ?? "";
  const publicId = publicIdRaw
    ? publicIdRaw.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").slice(0, 80)
    : "";

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer, folder, publicId ? { public_id: `${folder}/${publicId}` } : {});

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (err) {
    console.error("[upload] Cloudinary error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
