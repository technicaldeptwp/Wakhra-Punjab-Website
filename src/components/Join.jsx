import { clubInfo } from "../data";

export default function Join() {
  return (
    <div className="section bg-brand-peacock text-white text-center black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading mb-6">Join Us</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Be a part of <span className="font-semibold">{clubInfo.name}</span> and
          experience the vibrant culture of Punjab! Whether you’re a dancer,
          singer, writer, or just a culture enthusiast, we welcome you.
        </p>

        <a
          href="https://forms.gle/VAyv6Ho24z4bi5Lm8" // <-- replace with your real Google Form link
          target="_blank"
          rel="noreferrer"
          className="btn-primary text-lg"
        >
          Fill Google Form →
        </a>
      </div>
    </div>
  );
}
