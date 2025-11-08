import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

// Testimonials (concise, rotate)
const testimonials = [
	{
		quote: "It felt like someone handed me a personal clarity framework I can actually use.",
		author: "Entrepreneur",
	},
	{
		quote: "Relationship mapping reshaped how I invest my time after work.",
		author: "HR Professional",
	},
	{
		quote: "Left with calm focus — grounded yet motivated.",
		author: "Graduate Student",
	},
];

// Carousel uses Base64 images exclusively (loaded at runtime)

const usePrefersReducedMotion = () => {
	const [prefers, setPrefers] = useState(false);
	useEffect(() => {
		if (typeof window === "undefined" || !("matchMedia" in window)) return;
		const m = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setPrefers(m.matches);
		update();
		m.addEventListener?.("change", update);
		return () => m.removeEventListener?.("change", update);
	}, []);
	return prefers;
};

export type PastEditionProps = {
	id?: string;
	variant?: "default" | "compact";
	className?: string;
};

// count-up animation for stats
const useCountUp = (target: number, { duration = 1200, start = 0, active = true } = {}) => {
	const [val, setVal] = useState(start);
	const startRef = useRef<number | null>(null);
	useEffect(() => {
		if (!active) return;
		let raf = 0;
		const step = (ts: number) => {
			if (startRef.current === null) startRef.current = ts;
			const p = Math.min(1, (ts - startRef.current) / duration);
			const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
			setVal(Math.floor(start + (target - start) * eased));
			if (p < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [target, duration, start, active]);
	return val;
};

const PastEdition = ({ id = "past-edition", variant = "default", className = "" }: PastEditionProps) => {
	const [activeTestimonial, setActiveTestimonial] = useState(0);
	const [pausedTestimonials, setPausedTestimonials] = useState(false);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const [galleryHover, setGalleryHover] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();
	const sectionRef = useRef<HTMLElement | null>(null);
	const galleryRef = useRef<HTMLDivElement | null>(null);
	const [inView, setInView] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);
	const [gallerySources, setGallerySources] = useState<string[] | null>(null);
	const [galleryLoadError, setGalleryLoadError] = useState<string | null>(null);

	// intersection observe
	useEffect(() => {
		const el = sectionRef.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	// testimonials autoplay
	useEffect(() => {
		if (prefersReducedMotion || pausedTestimonials || !inView) return;
		const id = setInterval(() => setActiveTestimonial((i) => (i + 1) % testimonials.length), 6500);
		return () => clearInterval(id);
	}, [prefersReducedMotion, pausedTestimonials, inView]);

	// gallery autoplay
	useEffect(() => {
		if (prefersReducedMotion || galleryHover || !inView) return;
		const sources = gallerySources ?? [];
		if (!sources.length) return;
		const id = setInterval(() => setGalleryIndex((i) => (i + 1) % sources.length), 4500);
		return () => clearInterval(id);
	}, [prefersReducedMotion, galleryHover, inView, gallerySources]);

	// Try to load base64 images from either localStorage or a bundled file URL (if present)
	useEffect(() => {
		let cancelled = false;

		const parseBase64Manifest = (text: string, limit = 50) => {
			const out: string[] = [];
			const headerRe = /^====\s*(.+?)\s*====\s*$/m;
			const lines = text.split(/\r?\n/);
			let currentName: string | null = null;
			let currentData: string[] = [];
			const flush = () => {
				if (currentName && currentData.length) {
					const nameLower = currentName.toLowerCase();
					let mime = "image/jpeg";
					if (nameLower.endsWith(".png")) mime = "image/png";
					else if (nameLower.endsWith(".webp")) mime = "image/webp";
					else if (nameLower.endsWith(".avif")) mime = "image/avif";
					else if (nameLower.endsWith(".jpg") || nameLower.endsWith(".jpeg")) mime = "image/jpeg";
					const b64 = currentData.join("").replace(/\s+/g, "");
					if (b64) out.push(`data:${mime};base64,${b64}`);
				}
				currentName = null;
				currentData = [];
			};
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				const match = line.match(/^====\s*(.+?)\s*====\s*$/);
				if (match) {
					// start of new block
					flush();
					currentName = match[1];
					continue;
				}
				if (currentName) {
					if (line.startsWith("====")) {
						// safety: unexpected header without trailing ==== spacing
						flush();
						const m2 = line.match(headerRe);
						if (m2) {
							currentName = m2[1];
						}
						continue;
					}
					if (line.trim().length === 0) continue; // ignore blank lines
					currentData.push(line.trim());
				}
				if (out.length >= limit) break;
			}
			flush();
			return out;
		};

		const load = async () => {
			try {
				// 1) Prefer public runtime file (generated by script)
				try {
					const resp = await fetch("/base64_output.txt", { cache: "no-store" });
					if (resp.ok) {
						const text = await resp.text();
						const parsed = parseBase64Manifest(text);
						if (!cancelled && parsed.length) {
							setGallerySources(parsed);
							return;
						}
					}
				} catch {}

				// 2) Try localStorage injection (developer paste)
				const fromLS = typeof window !== "undefined" ? window.localStorage.getItem("influenciaBase64Images") : null;
				if (fromLS && fromLS.length > 0) {
					const parsed = parseBase64Manifest(fromLS);
					if (!cancelled && parsed.length) {
						setGallerySources(parsed);
						return;
					}
				}

				// 3) Try bundled asset URL via Vite ?url
				let base64Url: string | null = null;
				try {
					const mod: any = await import("@/assets/base64_output.txt?url");
					base64Url = mod?.default ?? null;
				} catch {
					base64Url = null;
				}
				if (base64Url) {
					const resp = await fetch(base64Url);
					const text = await resp.text();
					const parsed = parseBase64Manifest(text);
					if (!cancelled && parsed.length) {
						setGallerySources(parsed);
						return;
					}
				}

				// No base64 found; keep empty and show message
				if (!cancelled) setGallerySources([]);
			} catch (e: any) {
				if (!cancelled) {
					setGalleryLoadError("Failed to load base64 images.");
					setGallerySources([]);
				}
			}
		};
		load();
		return () => {
			cancelled = true;
		};
	}, []);

	const onTestimonialKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowRight") {
			e.preventDefault();
			setActiveTestimonial((i) => (i + 1) % testimonials.length);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			setActiveTestimonial((i) => (i - 1 + testimonials.length) % testimonials.length);
		} else if (e.key === "Home") {
			e.preventDefault();
			setActiveTestimonial(0);
		} else if (e.key === "End") {
			e.preventDefault();
			setActiveTestimonial(testimonials.length - 1);
		}
	};

	const yearVal = useCountUp(2024, { start: 1998, active: inView && !prefersReducedMotion });
	const attendeesVal = useCountUp(150, { start: 0, duration: 1400, active: inView && !prefersReducedMotion });

	const sectionPadding = useMemo(() => (variant === "compact" ? "py-16 md:py-24" : "py-24 md:py-32"), [variant]);

	return (
		<section
			id={id}
			ref={sectionRef}
			className={`${sectionPadding} bg-background ${className}`}
			role="region"
			aria-labelledby="past-edition-heading"
		>
			<div className="container px-4 sm:px-6 mx-auto max-w-5xl">
				{/* Heading */}
				<div className={`${variant === "compact" ? "mb-12" : "mb-16 md:mb-20"} text-center space-y-4 md:space-y-6 animate-fade-in-up`}>
					<Badge className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-2 border-primary/40 px-5 py-1.5 tracking-wide font-semibold shadow-sm">
						INFLUENCIA 1.0
					</Badge>
					<h2
						id="past-edition-heading"
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
					>
						Foundation for{" "}
						<span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
							Personal Momentum
						</span>
					</h2>
					<p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed px-4">
						The inaugural edition gathered committed professionals, students and emerging leaders for a
						structured deep dive into mindset, relationships and sustainable growth habits.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-start">
					{/* Left column */}
					<div className="space-y-10 md:space-y-12">
						{/* Narrative */}
						<div
							className="space-y-5 animate-fade-in-up"
							style={{ animationDelay: "0.1s" }}
						>
							<div className="pl-4 border-l-4 border-primary/30">
								<p className="text-muted-foreground text-base md:text-lg leading-relaxed">
									Influencia 1.0 established our core philosophy: growth that honors emotional steadiness while
									amplifying meaningful output. Participants worked through internal scripts, priority alignment
									and clarity anchors.
								</p>
							</div>
							<p className="text-muted-foreground text-base leading-relaxed">
								Its success shaped Edition 2 – refining interaction pacing, deepening reflection exercises and
								adding integration checkpoints beyond the event day.
							</p>
						</div>

						{/* Stats */}
						<div
							className="grid grid-cols-3 gap-4 animate-fade-in-up"
							style={{ animationDelay: "0.2s" }}
						>
							<Card className="bg-gradient-to-br from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-primary/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
								<CardContent className="p-5 text-center">
									<dl>
										<div className="flex flex-col items-center gap-2">
											<div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
												<Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
											</div>
											<dt className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Year</dt>
											<dd className="text-2xl font-bold text-foreground" aria-label={`Year ${yearVal}`}>
												{yearVal}
											</dd>
										</div>
									</dl>
								</CardContent>
							</Card>
							<Card className="bg-gradient-to-br from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-primary/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
								<CardContent className="p-5 text-center">
									<dl>
										<div className="flex flex-col items-center gap-2">
											<div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
												<Users className="w-5 h-5 text-primary" aria-hidden="true" />
											</div>
											<dt className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Attendees</dt>
											<dd className="text-2xl font-bold text-foreground" aria-label={`${attendeesVal} attendees`}>
												<span className="tabular-nums">{attendeesVal}</span>
												<span aria-hidden className="text-primary">+</span>
											</dd>
										</div>
									</dl>
								</CardContent>
							</Card>
							<Card className="bg-gradient-to-br from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-primary/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
								<CardContent className="p-5 text-center">
									<dl>
										<div className="flex flex-col items-center gap-2">
											<div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
												<Star className="w-5 h-5 text-primary" aria-hidden="true" />
											</div>
											<dt className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Engagement</dt>
											<dd className="text-2xl font-bold text-foreground">High</dd>
										</div>
									</dl>
								</CardContent>
							</Card>
						</div>

						{/* Journey Highlights */}
						<div className="space-y-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
							<h3 className="text-xs font-semibold tracking-[0.25em] text-primary uppercase text-center">
								Journey Highlights
							</h3>
							<ol className="space-y-3">
								<li className="group">
									<div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/20 transition-all hover:shadow-md">
										<span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
											1
										</span>
										<div className="flex-1 pt-1">
											<p className="text-sm font-medium text-foreground leading-relaxed">
												Identity + inner script recalibration
											</p>
										</div>
									</div>
								</li>
								<li className="group">
									<div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/20 transition-all hover:shadow-md">
										<span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
											2
										</span>
										<div className="flex-1 pt-1">
											<p className="text-sm font-medium text-foreground leading-relaxed">
												Relationship & priority mapping workshop
											</p>
										</div>
									</div>
								</li>
								<li className="group">
									<div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/20 transition-all hover:shadow-md">
										<span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
											3
										</span>
										<div className="flex-1 pt-1">
											<p className="text-sm font-medium text-foreground leading-relaxed">
												Clarity anchors & forward planning frameworks
											</p>
										</div>
									</div>
								</li>
							</ol>
						</div>
					</div>

					{/* Right column: image + vertical gallery */}
					<div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-rose-600/20 rounded-2xl blur-2xl" />
							<AspectRatio ratio={16/9}>
								<div className="relative w-full h-full flex items-center justify-center rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-800 border-2 border-red-500/30">
									<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
									<div className="relative z-10 text-center px-6 space-y-2">
										<div className="text-white/90 text-sm font-semibold tracking-[0.3em] uppercase mb-2">
											Edition Glimpse
										</div>
										<h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight leading-tight">
											INFLUENCIA
										</h3>
										<div className="text-red-100 text-xl md:text-2xl font-light tracking-wider">
											EDITION 1
										</div>
										<div className="pt-2 flex items-center justify-center gap-2">
											<div className="h-px w-8 bg-white/40" />
											<Calendar className="w-4 h-4 text-white/70" />
											<span className="text-white/70 text-xs font-medium">2024</span>
											<div className="h-px w-8 bg-white/40" />
										</div>
									</div>
								</div>
							</AspectRatio>
						</div>

						{/* Vertical gallery showcase */}
						<div
							ref={galleryRef}
							onMouseEnter={() => setGalleryHover(true)}
							onMouseLeave={() => setGalleryHover(false)}
							className="mt-8"
						>
							<div className="flex items-center justify-between mb-4 px-1">
								<h4 className="text-xs tracking-[0.25em] font-semibold text-primary uppercase">
									Event Gallery
								</h4>
								<div className="flex gap-2">
									<button
										onClick={() => {
											const len = (gallerySources ?? []).length;
											if (!len) return;
											setGalleryIndex((i) => (i - 1 + len) % len);
										}}
										aria-label="Previous image"
										className="h-8 w-8 rounded-lg border border-primary/30 bg-background hover:bg-primary hover:text-white hover:border-primary transition-all text-sm flex items-center justify-center shadow-sm"
									>
										↑
									</button>
									<button
										onClick={() => {
											const len = (gallerySources ?? []).length;
											if (!len) return;
											setGalleryIndex((i) => (i + 1) % len);
										}}
										aria-label="Next image"
										className="h-8 w-8 rounded-lg border border-primary/30 bg-background hover:bg-primary hover:text-white hover:border-primary transition-all text-sm flex items-center justify-center shadow-sm"
									>
										↓
									</button>
								</div>
							</div>
							<div
								className="relative h-[420px] overflow-hidden rounded-2xl border-2 border-border/40 bg-background/60 backdrop-blur-sm shadow-xl"
								role="region"
								aria-label="Photo showcase from Influencia 1.0"
							>
								<div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background/95 to-transparent" />
								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/95 to-transparent" />
								<div
									style={{
										height: `${420 * (gallerySources?.length ?? 0)}px`,
										transform: `translateY(-${
											(gallerySources?.length ?? 0) > 0 ? galleryIndex * 420 : 0
										}px)`,
										transition: prefersReducedMotion ? undefined : "transform 700ms ease-out",
									}}
									className="absolute left-0 right-0"
								>
									{(gallerySources ?? []).map((src, i) => (
										<div key={src} className="h-[420px] w-full">
											<img
												src={src}
												alt={`Influencia 1.0 event photo ${i + 1}`}
												loading="lazy"
												decoding="async"
												className="w-full h-full object-cover"
											/>
										</div>
									))}
								</div>
								<div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
									{(gallerySources ?? []).map((_, i) => (
										<button
											key={i}
											aria-label={`Show image ${i + 1}`}
											onClick={() => setGalleryIndex(i)}
											className={`h-1.5 rounded-full transition-all shadow-sm ${
												i === galleryIndex
													? "bg-primary w-6"
													: "bg-white/60 hover:bg-white/80 w-1.5"
											}`}
										/>
									))}
								</div>
							</div>
							{(gallerySources?.length ?? 0) === 0 && (
								<div className="mt-4 p-4 rounded-xl border border-border/60 bg-muted/30 text-center">
									<p className="text-xs text-muted-foreground leading-relaxed">
										Gallery images not loaded. Add Base64 manifest to localStorage or include base64_output.txt in public/ directory.
									</p>
								</div>
							)}
							<div className="sr-only" aria-live="polite">
								{(gallerySources?.length ?? 0) > 0
									? `Image ${galleryIndex + 1} of ${(gallerySources ?? []).length}`
									: "No images loaded"}
							</div>
						</div>
					</div>
				</div>

				{/* Testimonials - Centered below grid */}
				<div
					className="animate-fade-in-up mx-auto max-w-3xl mt-16 md:mt-20"
					style={{ animationDelay: "0.5s" }}
				>
					<h3 className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-6 text-center">
						What Attendees Say
					</h3>
					<div
						className="relative rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl p-8 mx-auto max-w-lg shadow-lg text-center"
						role="group"
						aria-labelledby="testimonials-label"
						onKeyDown={onTestimonialKey}
					>
						<div className="absolute top-6 left-6 text-primary/20 text-5xl font-serif leading-none">"</div>
						<span id="testimonials-label" className="sr-only">
							Testimonials from Influencia 1.0
						</span>
						{testimonials.map((t, i) => (
							<blockquote
								key={t.quote}
								aria-hidden={activeTestimonial !== i}
								className={`transition-opacity duration-500 ${
									activeTestimonial === i ? "opacity-100" : "opacity-0 absolute inset-0 p-8"
								}`}
							>
								<p className="text-base md:text-lg leading-relaxed text-foreground font-light italic pt-4">
									{t.quote}
								</p>
								<footer className="mt-5 flex items-center justify-center gap-2">
									<div className="h-px w-6 bg-primary/30" />
									<cite className="not-italic text-sm font-semibold text-primary">
										{t.author}
									</cite>
									<div className="h-px w-6 bg-primary/30" />
								</footer>
							</blockquote>
						))}
						<div className="flex items-center justify-center mt-8 gap-4">
							<div
								className="flex gap-2.5 justify-center"
								role="radiogroup"
								aria-label="Select testimonial"
							>
								{testimonials.map((_, i) => (
									<button
										key={i}
										role="radio"
										aria-checked={activeTestimonial === i}
										aria-label={`Show testimonial ${i + 1}`}
										onClick={() => setActiveTestimonial(i)}
										className={`h-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full ${
											activeTestimonial === i
												? "bg-primary w-8"
												: "bg-primary/30 hover:bg-primary/50 w-2"
										}`}
									/>
								))}
							</div>
							<div className="w-px h-4 bg-border/60" />
							<button
								type="button"
								aria-pressed={pausedTestimonials}
								onClick={() => setPausedTestimonials((p) => !p)}
								className="text-xs font-medium text-primary/90 border border-primary/30 rounded-full px-3 py-1.5 hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
							>
								{pausedTestimonials ? "▶" : "⏸"} {pausedTestimonials ? "Play" : "Pause"}
							</button>
						</div>
						<div className="sr-only" aria-live="polite" aria-atomic="true">
							{`Testimonial ${activeTestimonial + 1} of ${testimonials.length}: ${testimonials[activeTestimonial].quote} — ${testimonials[activeTestimonial].author}`}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PastEdition;
