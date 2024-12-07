import configPromise from "@payload-config";
import { getPayload } from "payload";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = schema.parse(body);

    const payload = await getPayload({
      config: configPromise,
    });

    await payload.create({
      collection: "contact",
      data: validatedData,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(JSON.stringify({ error: "Failed to process contact form submission" }), {
      status: 500,
    });
  }
}
