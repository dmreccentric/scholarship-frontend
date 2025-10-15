import nodemailer from "nodemailer";
import Twilio from "twilio";

type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const { name, email, message }: ContactRequest = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        { status: 400 }
      );
    }

    // ✅ Send Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact Message from ${name}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // ✅ Send WhatsApp via Twilio
    const whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER;
    const whatsappTo = process.env.WHATSAPP_NUMBER;

    if (!whatsappFrom || !whatsappTo) {
      throw new Error("WhatsApp sender or recipient number is not defined");
    }

    const client = Twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    await client.messages.create({
      body: `New Contact Message!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      from: whatsappFrom, // now guaranteed string
      to: whatsappTo, // now guaranteed string
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
