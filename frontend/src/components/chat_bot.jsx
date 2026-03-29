import { useState, useRef } from 'react';
import { MessageCircleMore, X, Send } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { chatWithAssistant, chatWithAssistantStream } from '@/lib/pythonChat';

const ChatBot = () => {
	const { lang } = useLanguage();
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			role: 'assistant',
			content: 'Hello! Ask me about government services and I will guide you.'
		}
	]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const listRef = useRef(null);

	const pushMessage = (role, content) => {
		setMessages((prev) => [...prev, { role, content }]);
		setTimeout(() => {
			if (listRef.current) {
				listRef.current.scrollTop = listRef.current.scrollHeight;
			}
		}, 0);
	};

	const updateLastAssistant = (delta) => {
		setMessages((prev) => {
			const next = [...prev];
			for (let i = next.length - 1; i >= 0; i -= 1) {
				if (next[i].role === 'assistant') {
					next[i] = { ...next[i], content: (next[i].content || '') + delta };
					break;
				}
			}
			return next;
		});
	};

	const handleSend = async () => {
		const trimmed = input.trim();
		if (!trimmed || loading) return;
		setInput('');
		pushMessage('user', trimmed);
		pushMessage('assistant', '');
		setLoading(true);

		const history = messages
			.filter((msg) => msg.role === 'user' || msg.role === 'assistant')
			.slice(-6)
			.map((msg) => ({ role: msg.role, content: msg.content }));

		let response;
		if (window.ReadableStream) {
			response = await chatWithAssistantStream({
				text: trimmed,
				lang,
				history,
				onToken: (token) => {
					updateLastAssistant(token);
					if (listRef.current) {
						listRef.current.scrollTop = listRef.current.scrollHeight;
					}
				},
			});
		} else {
			response = await chatWithAssistant(trimmed, lang, history);
			if (!response.error) {
				updateLastAssistant(response.answer || '');
			}
		}

		if (response.error) {
			setMessages((prev) => {
				const next = [...prev];
				const idx = next.findIndex((msg) => msg.role === 'assistant' && msg.content === '');
				if (idx !== -1) {
					next[idx] = { ...next[idx], content: 'Sorry, the assistant is not available right now.' };
				} else {
					next.push({ role: 'assistant', content: 'Sorry, the assistant is not available right now.' });
				}
				return next;
			});
		}

		setLoading(false);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			void handleSend();
		}
	};

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{open && (
				<div className="mb-4 w-[340px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-hover">
					<div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
						<div>
							<div className="text-sm font-semibold text-[var(--color-text-primary)]">AI Assistant</div>
							<div className="text-xs text-[var(--color-text-secondary)]">Powered by my.gov.uz data</div>
						</div>
						<button
							className="rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
							onClick={() => setOpen(false)}
							aria-label="Close chat"
						>
							<X size={16} />
						</button>
					</div>

					<div ref={listRef} className="max-h-80 space-y-3 overflow-y-auto px-4 py-3 text-sm">
						{messages.map((msg, index) => (
							<div
								key={`${msg.role}-${index}`}
								className={
									msg.role === 'user'
										? 'ml-10 rounded-[var(--radius-md)] bg-[var(--color-primary-dark)] px-3 py-2 text-white'
										: 'mr-10 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text-primary)]'
								}
							>
								{msg.content || (loading && msg.role === 'assistant' ? 'Thinking...' : '')}
							</div>
						))}
					</div>

					<div className="border-t border-[var(--color-border)] px-3 py-3">
						<div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2">
							<textarea
								rows={1}
								value={input}
								onChange={(event) => setInput(event.target.value)}
								onKeyDown={handleKeyDown}
								className="flex-1 resize-none bg-transparent text-sm text-[var(--color-text-primary)] outline-none"
								placeholder="Ask about a service..."
							/>
							<button
								className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
								onClick={() => void handleSend()}
								aria-label="Send"
							>
								<Send size={16} />
							</button>
						</div>
					</div>
				</div>
			)}

			<button
				className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white shadow-hover transition hover:bg-[var(--color-primary-dark)]"
				onClick={() => setOpen((prev) => !prev)}
				aria-label="Open chat"
			>
				<MessageCircleMore size={28} />
			</button>
		</div>
	);
};

export default ChatBot;
