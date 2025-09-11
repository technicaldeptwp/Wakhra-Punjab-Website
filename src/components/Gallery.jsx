// import { useEffect, useState, useRef } from "react";
// import { pastEvents } from "../data";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function Gallery() {
//   const [lightbox, setLightbox] = useState(null);
//   const scrollRef = useRef(null);
//   const modalRef = useRef(null);

//   // ✅ Fixed: load images directly from the clicked event
//   const openLightbox = (ev) => {
//     const imagesForEvent =
//       Array.isArray(ev.images) && ev.images.length ? ev.images : [ev.img];

//     setLightbox({
//       title: ev.title,
//       images: imagesForEvent,
//       index: 0,
//     });
//   };

//   const close = () => setLightbox(null);

//   const next = () =>
//     setLightbox((lb) =>
//       lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb
//     );

//   const prev = () =>
//     setLightbox((lb) =>
//       lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb
//     );

//   // Handle ESC + outside click
//   useEffect(() => {
//     if (!lightbox) return;

//     const onKey = (e) => {
//       if (e.key === "Escape") close();
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };

//     const onClick = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         close();
//       }
//     };

//     document.addEventListener("keydown", onKey);
//     const timer = setTimeout(() => {
//       document.addEventListener("click", onClick);
//     }, 0);

//     return () => {
//       clearTimeout(timer);
//       document.removeEventListener("keydown", onKey);
//       document.removeEventListener("click", onClick);
//     };
//   }, [lightbox]);

//   // scroll gallery left/right
//   const scrollLeft = () => {
//     if (scrollRef.current)
//       scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };
//   const scrollRight = () => {
//     if (scrollRef.current)
//       scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   return (
//     <div className="section container mx-auto px-4" style={{ paddingTop: "0px" }}>
//       <h2 className="text-3xl font-heading text-center text-brand-maroon mb-8">
//         Gallery
//       </h2>

//       {/* Carousel Wrapper */}
//       <div className="relative">
//         {/* Left Arrow */}
//         <button
//           onClick={scrollLeft}
//           className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white z-10"
//         >
//           <ChevronLeft size={22} />
//         </button>

//         {/* Scrollable Carousel */}
//         <div
//           ref={scrollRef}
//           className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
//         >
//           {pastEvents.map((ev, idx) => (
//             <button
//               key={idx}
//               onClick={() => openLightbox(ev)}
//               className="min-w-[250px] flex-shrink-0 overflow-hidden rounded-2xl shadow hover:scale-105 transition focus:outline-none"
//             >
//               <img
//                 src={(ev.images && ev.images[0]) || ev.img}
//                 alt={ev.title}
//                 className="w-full h-60 object-contain"
//                 draggable="false"
//               />
//               <p className="p-2 text-sm text-center" style={{ color: "#FFD700" }}>
//                 {ev.title}
//               </p>
//             </button>
//           ))}
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={scrollRight}
//           className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white z-10"
//         >
//           <ChevronRight size={22} />
//         </button>
//       </div>

//       {/* Lightbox */}
//       {lightbox && (
//         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
//           <div
//             ref={modalRef}
//             className="relative bg-neutral-900 rounded-xl shadow-xl w-[min(55vw,500px)] h-[min(45vh,400px)] flex flex-col overflow-hidden z-10"
//           >
//             {/* Close */}
//             <button
//               aria-label="Close"
//               className="absolute right-3 top-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
//               onClick={close}
//             >
//               <span className="text-lg font-bold leading-none mb-1">&times;</span>
//             </button>

//             {/* Title */}
//             <div className="text-center text-white/90 py-2 text-base border-b border-white/10">
//               {lightbox.title}
//             </div>

//             {/* Image area */}
//             <div className="flex-1 flex items-center justify-center relative overflow-hidden p-3">
//               {lightbox.images.length > 1 && (
//                 <button
//                   onClick={prev}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-1 rounded-full text-white"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>
//               )}

//               <img
//                 src={lightbox.images[lightbox.index]}
//                 alt={`${lightbox.title} ${lightbox.index + 1}`}
//                 className="max-w-full object-contain rounded-md"
//                 draggable="false"
//               />

//               {lightbox.images.length > 1 && (
//                 <button
//                   onClick={next}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-1 rounded-full text-white"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               )}
//             </div>

//             {/* Dots */}
//             {lightbox.images.length > 1 && (
//               <div className="flex items-center justify-center gap-2 py-2">
//                 {lightbox.images.map((_, i) => (
//                   <button
//                     key={i}
//                     className={`w-2 h-2 rounded-full ${
//                       i === lightbox.index ? "bg-yellow-400" : "bg-white/30"
//                     }`}
//                     onClick={() =>
//                       setLightbox((lb) => (lb ? { ...lb, index: i } : lb))
//                     }
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/components/Gallery.jsx
// src/components/Gallery.jsx
import { useState, useEffect, useRef } from "react";
import { pastEvents } from "../data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Open album lightbox
  const openLightbox = (event) => {
    setLightbox({ ...event, index: 0 });
  };

  const closeLightbox = () => setLightbox(null);

  const next = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb
    );

  const prev = () =>
    setLightbox((lb) =>
      lb
        ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }
        : lb
    );

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  // Touch gestures (swipe for iPhones & mobiles)
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); // swipe left → next
      else prev(); // swipe right → prev
    }
  };

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Gallery</h2>
      <div className="gallery-grid">
        {pastEvents.map((event, i) => (
          <div
            key={i}
            className="album-card"
            onClick={() => openLightbox(event)}
          >
            <img
              src={event.images[0]}
              alt={event.title}
              className="album-cover"
              loading="lazy"
              draggable="false"
            />
            <div className="album-info">
              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button className="close-btn" onClick={closeLightbox}>
            &times;
          </button>

          {/* Prev Button */}
          {lightbox.images.length > 1 && (
            <button
              className="nav-btn left"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt={`${lightbox.title} ${lightbox.index + 1}`}
            className="lightbox-img"
            loading="lazy"
            draggable="false"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking image
          />

          {/* Next Button */}
          {lightbox.images.length > 1 && (
            <button
              className="nav-btn right"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Caption */}
          <div className="lightbox-caption">
            {lightbox.title} — {lightbox.index + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </section>
  );
}

