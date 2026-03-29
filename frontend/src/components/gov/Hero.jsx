import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const QUICK_ACTIONS = {
	uz: [
		{ label: "Ariza holatini tekshirish", icon: '🧾' },
		{ label: "Jarimani to'lash", icon: '💳' },
		{ label: "Qabulga yozilish", icon: '📅' },
	],
	ru: [
		{ label: 'Проверить статус заявки', icon: '🧾' },
		{ label: 'Оплатить штраф', icon: '💳' },
		{ label: 'Записаться на приём', icon: '📅' },
	],
	en: [
		{ label: 'Check Application Status', icon: '🧾' },
		{ label: 'Pay a Fine', icon: '💳' },
		{ label: 'Book Appointment', icon: '📅' },
	],
	kk: [
		{ label: 'Ariza statusin tekseriw', icon: '🧾' },
		{ label: 'Jarima tolew', icon: '💳' },
		{ label: 'Qabылга jazılıw', icon: '📅' },
	],
};

export default function Hero({ children }) {
	const { t, lang } = useLanguage();
	const actions = QUICK_ACTIONS[lang] || QUICK_ACTIONS.en;

	return (
		<section className="relative overflow-hidden bg-[var(--color-surface-alt)]">
			<div className="absolute inset-0 hero-grid opacity-70" />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-[var(--space-6)] sm:px-6 lg:flex-row lg:items-center"
			>
				<div className="flex w-full flex-col gap-6 lg:w-[55%]">
					<div className="flex w-fit items-center gap-2 rounded-full bg-[var(--color-primary-light)] px-4 py-1.5 text-xs font-semibold text-[var(--color-primary-dark)]">
						<span>🇺🇿</span>
						<span>Official Services Portal</span>
					</div>
					<h1 className="font-display text-[2.5rem] font-bold leading-[1.1] text-[var(--color-text-primary)] sm:text-[3rem]">
						{t.heroTitle} <span className="text-[var(--color-primary)]">{t.heroSpan}</span>
					</h1>
					<p className="text-[1.05rem] text-[var(--color-text-secondary)]">
						{t.heroSub}
					</p>
					<div className="w-full">{children}</div>
				</div>

				<div className="flex w-full flex-col gap-4 lg:w-[45%]">
					{actions.map((action, idx) => (
						<motion.div
							key={action.label}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + idx * 0.1, duration: 0.35 }}
							className={`rounded-[var(--radius-md)] bg-white p-4 shadow-card transition hover:shadow-hover ${
								idx > 0 ? '-mt-2' : ''
							}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="text-2xl" aria-hidden>
										{action.icon}
									</div>
									<div>
										<div className="text-sm font-semibold text-[var(--color-text-primary)]">
											{action.label}
										</div>
										<div className="text-xs text-[var(--color-text-secondary)]">Start in seconds</div>
									</div>
								</div>
								<ArrowUpRight className="h-4 w-4 text-[var(--color-primary)]" />
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
