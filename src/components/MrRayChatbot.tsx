import { api } from "@convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { Bot, ExternalLink, Loader2, Send, User, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ServiceDetailModal } from "@/components/services/ServiceDetailModal";

interface ChatMessage {
	role: "user" | "model";
	content: string;
}

const WELCOME_MESSAGE = `Bonjour ! 👋 Je suis **Mr Ray** 🐡, votre assistant virtuel du Consulat Général du Gabon en France.

Je peux vous aider à :
- 🏛️ Trouver des informations sur les **services consulaires**
- 📋 Vous orienter vers les **bonnes démarches**
- 🇬🇦 Répondre à vos questions sur la **vie en France**

Comment puis-je vous aider aujourd'hui ?`;

const SUGGESTED_QUESTIONS = [
	"Carte consulaire",
	"Mariage au consulat",
	"OQTF : que faire ?",
	"Vie étudiante",
];

/** Extract the slug from a /services/{slug} link */
function extractSlugFromHref(href: string | undefined): string | null {
	if (!href) return null;
	const match = href.match(/^\/services\/([a-z0-9-]+)$/);
	return match ? match[1] : null;
}

/** Check if link text contains "Voir la fiche" */
function isVoirLaFicheLink(children: React.ReactNode): boolean {
	const text = String(children ?? "");
	return text.includes("Voir la fiche");
}

/** Check if link text contains "Faire la démarche" */
function isFaireLaDemarcheLink(children: React.ReactNode): boolean {
	const text = String(children ?? "");
	return text.includes("Faire la démarche");
}

export function MrRayChatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);
	const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const chatAction = useAction(api.functions.chatbot.chat);

	// Fetch service data when a slug is selected
	const serviceData = useQuery(
		api.functions.services.getBySlug,
		selectedSlug ? { slug: selectedSlug } : "skip",
	);

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Open modal when service data loads
	useEffect(() => {
		if (serviceData && selectedSlug && modalOpen) {
			// Service loaded, modal is ready
		}
	}, [serviceData, selectedSlug, modalOpen]);

	const handleVoirLaFiche = (slug: string) => {
		setSelectedSlug(slug);
		setModalOpen(true);
	};

	const handleModalClose = (open: boolean) => {
		setModalOpen(open);
		if (!open) {
			setSelectedSlug(null);
		}
	};

	const sendMessage = async (text?: string) => {
		const messageText = text || input.trim();
		if (!messageText || isLoading) return;

		setHasInteracted(true);
		const userMessage: ChatMessage = { role: "user", content: messageText };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const history = messages.map((m) => ({
				role: m.role,
				content: m.content,
			}));

			const result = await chatAction({
				message: messageText,
				history,
			});

			const assistantMessage: ChatMessage = {
				role: "model",
				content: result.response,
			};
			setMessages((prev) => [...prev, assistantMessage]);
		} catch {
			setMessages((prev) => [
				...prev,
				{
					role: "model",
					content:
						"Désolé, une erreur s'est produite. Veuillez réessayer ou contacter le consulat par email à **contact@consulatdugabon.fr**.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const toggleChat = () => {
		setIsOpen((prev) => !prev);
	};

	/** Shared markdown link renderer that styles action buttons */
	const createLinkRenderer = () => ({
		a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
			const slug = extractSlugFromHref(href);

			// "Voir la fiche" button — styled like ServiceCard grey button
			if (isVoirLaFicheLink(children) && slug) {
				return (
					<button
						type="button"
						onClick={() => handleVoirLaFiche(slug)}
						className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground bg-secondary/60 hover:bg-secondary border border-border/40 rounded-lg transition-colors gap-1.5"
					>
						📋 Voir la fiche
					</button>
				);
			}

			// "Faire la démarche" button — styled like ServiceCard blue button
			if (isFaireLaDemarcheLink(children)) {
				return (
					<a
						href={href || "https://www.consulat.ga/"}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors gap-1.5 no-underline"
					>
						Faire la démarche
					</a>
				);
			}

			// Default link rendering
			return (
				<a
					href={href}
					className="text-primary hover:underline font-medium inline-flex items-center gap-1"
					target={href?.startsWith("http") ? "_blank" : undefined}
					rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
				>
					{children}
					{href?.startsWith("http") && <ExternalLink className="w-3 h-3" />}
				</a>
			);
		},
	});

	/** Check if a paragraph node contains action buttons or contact info */
	const createParagraphRenderer = () => ({
		p: ({ children }: { children?: React.ReactNode }) => {
			const childText = String(children ?? "");
			const hasVoirFiche = childText.includes("Voir la fiche");
			const hasFaireDemarche = childText.includes("Faire la démarche");

			// Action buttons row
			if (hasVoirFiche || hasFaireDemarche) {
				return (
					<div className="flex flex-wrap gap-2 my-3 pt-3 border-t border-border/30">
						{children}
					</div>
				);
			}

			// Contact lines (Email / Tél) — render as compact muted text
			const isContactLine =
				(childText.includes("Email") && childText.includes("@")) ||
				(childText.includes("Tél") && /\d{2}\s\d{2}/.test(childText));
			if (isContactLine) {
				return (
					<p className="text-xs text-muted-foreground mb-1 last:mb-0">
						{children}
					</p>
				);
			}

			return <p className="mb-2 last:mb-0">{children}</p>;
		},
	});

	const modelComponents = {
		...createLinkRenderer(),
		...createParagraphRenderer(),
		strong: ({ children }: { children?: React.ReactNode }) => (
			<strong className="font-semibold">{children}</strong>
		),
		ul: ({ children }: { children?: React.ReactNode }) => (
			<ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
		),
		ol: ({ children }: { children?: React.ReactNode }) => (
			<ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
		),
		li: ({ children }: { children?: React.ReactNode }) => (
			<li className="text-sm">{children}</li>
		),
	};

	const welcomeComponents = {
		a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
			<a
				href={href}
				className="text-primary hover:underline font-medium inline-flex items-center gap-1"
				target={href?.startsWith("http") ? "_blank" : undefined}
				rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			>
				{children}
				{href?.startsWith("http") && <ExternalLink className="w-3 h-3" />}
			</a>
		),
		p: ({ children }: { children?: React.ReactNode }) => (
			<p className="mb-2 last:mb-0">{children}</p>
		),
		strong: ({ children }: { children?: React.ReactNode }) => (
			<strong className="font-semibold text-foreground">{children}</strong>
		),
		ul: ({ children }: { children?: React.ReactNode }) => (
			<ul className="list-none space-y-1 my-2">{children}</ul>
		),
		li: ({ children }: { children?: React.ReactNode }) => (
			<li className="text-sm">{children}</li>
		),
	};

	return (
		<>
			{/* Chat Window */}
			{isOpen && (
				<div
					className="fixed z-50 flex flex-col overflow-hidden border border-border/60 chatbot-window inset-0 rounded-none sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] sm:max-h-[75vh] sm:rounded-2xl"
					style={{
						background: "var(--glass-panel-bg)",
						boxShadow:
							"0 8px 40px rgba(0,0,0,0.15), 0 2px 12px rgba(0,0,0,0.08)",
					}}
				>
					{/* Header */}
					<div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shrink-0">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
								<Bot className="w-5 h-5" />
							</div>
							<div>
								<h3 className="font-bold text-sm">Mr Ray 🐡</h3>
								<p className="text-xs opacity-80">Assistant du Consulat</p>
							</div>
						</div>
						<button
							type="button"
							onClick={toggleChat}
							className="p-2 rounded-full hover:bg-white/20 transition-colors"
							aria-label="Fermer le chat"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Messages area */}
					<div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
						{/* Welcome message */}
						<div className="flex gap-3">
							<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
								<Bot className="w-4 h-4 text-primary" />
							</div>
							<div className="glass-card px-4 py-3 rounded-2xl rounded-tl-md max-w-[85%] text-sm leading-relaxed chatbot-message">
								<ReactMarkdown components={welcomeComponents}>
									{WELCOME_MESSAGE}
								</ReactMarkdown>
							</div>
						</div>

						{/* Suggested questions */}
						{!hasInteracted && (
							<div className="flex flex-wrap gap-2 pl-11">
								{SUGGESTED_QUESTIONS.map((q) => (
									<button
										type="button"
										key={q}
										onClick={() => sendMessage(q)}
										className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors font-medium"
									>
										{q}
									</button>
								))}
							</div>
						)}

						{/* Chat messages */}
						{messages.map((msg) => (
							<div
								key={`${msg.role}-${msg.content.slice(0, 40)}`}
								className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
							>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
										msg.role === "user"
											? "bg-primary text-primary-foreground"
											: "bg-primary/10"
									}`}
								>
									{msg.role === "user" ? (
										<User className="w-4 h-4" />
									) : (
										<Bot className="w-4 h-4 text-primary" />
									)}
								</div>
								<div
									className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed chatbot-message ${
										msg.role === "user"
											? "bg-primary text-primary-foreground rounded-tr-md"
											: "glass-card rounded-tl-md"
									}`}
								>
									{msg.role === "model" ? (
										<ReactMarkdown components={modelComponents}>
											{msg.content}
										</ReactMarkdown>
									) : (
										msg.content
									)}
								</div>
							</div>
						))}

						{/* Loading indicator */}
						{isLoading && (
							<div className="flex gap-3">
								<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
									<Bot className="w-4 h-4 text-primary" />
								</div>
								<div className="glass-card px-4 py-3 rounded-2xl rounded-tl-md">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Loader2 className="w-4 h-4 animate-spin" />
										<span>Mr Ray réfléchit...</span>
									</div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* Input area */}
					<div className="border-t border-border/50 px-4 py-3 shrink-0 safe-area-bottom">
						<div className="flex items-center gap-2">
							<input
								ref={inputRef}
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Posez votre question..."
								className="flex-1 bg-muted/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
								disabled={isLoading}
							/>
							<button
								type="button"
								onClick={() => sendMessage()}
								disabled={isLoading || !input.trim()}
								className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
								aria-label="Envoyer"
							>
								<Send className="w-4 h-4" />
							</button>
						</div>
						<p className="text-[10px] text-muted-foreground/50 mt-2 text-center">
							Propulsé par Gemini AI • Pour les démarches, utilisez{" "}
							<a
								href="https://consulat.ga"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary/60 hover:text-primary transition-colors"
							>
								CONSULAT.GA
							</a>
						</p>
					</div>
				</div>
			)}

			{/* Service Detail Modal — triggered from chat action buttons */}
			<ServiceDetailModal
				service={serviceData ?? null}
				open={modalOpen}
				onOpenChange={handleModalClose}
			/>

			{/* Floating Action Button — hidden when chat is open */}
			{!isOpen && (
				<button
					type="button"
					onClick={toggleChat}
					className="fixed bottom-6 right-4 sm:right-6 z-50 w-[96px] h-[96px] sm:w-[144px] sm:h-[144px] flex items-center justify-center rounded-full shadow-xl transition-all duration-300 text-white animate-heartbeat"
					style={{
						background:
							"linear-gradient(135deg, #E74C3C 0%, #FF6B9D 35%, #EAB308 100%)",
						boxShadow:
							"0 6px 30px rgba(231, 76, 60, 0.4), 0 0 50px rgba(234, 179, 8, 0.2)",
					}}
					aria-label="Ouvrir le chat Mr Ray"
				>
					<span className="font-extrabold text-base sm:text-2xl text-white drop-shadow-md tracking-wide">
						Mr Ray
					</span>
				</button>
			)}
		</>
	);
}
