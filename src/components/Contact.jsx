import { clubInfo } from "../data";
import { Instagram, Youtube ,Linkedin, Link} from "lucide-react";

export default function Contact() {
  return (
    <div className="section container mx-auto px-4">
      <h2 className="text-3xl font-heading text-center text-brand-maroon mb-8">
        Contact Us
      </h2>

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="mb-4">
            Have questions or want to collaborate? Reach out to us via email or
            social media.
          </p>
          <p className="mb-2">
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${clubInfo.email}`}
              className="text-brand-maroon hover:underline"
            >
              {clubInfo.email}
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href={clubInfo.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-maroon transition"
            >
              <Instagram size={28} />
            </a>
            <a
              href={clubInfo.Linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-maroon transition"
            >
              <Linkedin size={28} />
            </a>
          </div>
        </div>

        {/* Map Embed */}
        <div className="w-full h-64 md:h-80">
          <iframe
            src={clubInfo.locationEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl shadow"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
