import { wordOfWeek } from "../data";

export default function WordOfWeek() {
  return (
    <div className="section bg-brand-maroon text-white text-center black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading mb-4">Punjabi Word of the Week</h2>
        <p className="text-2xl font-semibold">{wordOfWeek.word}</p>
        <p className="mt-2">{wordOfWeek.meaning}</p>
        <p className="mt-2 italic">Usage: {wordOfWeek.usage}</p>
      </div>
    </div>
  );
}
