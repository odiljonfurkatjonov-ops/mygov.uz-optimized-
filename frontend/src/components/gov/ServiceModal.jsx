import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Hash, MapPin, Phone, CheckCircle2, Loader2, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_ICONS = {
	'Oila': '👶', 'Семья': '👶', 'Family': '👶', 'Отбасы': '👶',
	'Pensiya': '👴', 'Пенсия': '👴', 'Pension': '👴', 'Зейнетақы': '👴',
	'Transport': '🚗', 'Транспорт': '🚗', 'Көлік': '🚗',
	"Ta'lim": '🎓', 'Образование': '🎓', 'Education': '🎓', 'Білім': '🎓',
	'Soliq': '📊', 'Налог': '📊', 'Tax': '📊', 'Салық': '📊',
	"Ko'chmas": '🏠', 'Недвижим': '🏠', 'Real Estate': '🏠',
	'Mehnat': '💼', 'Труд': '💼', 'Labour': '💼',
	"Sog'liq": '🏥', 'Здравоо': '🏥', 'Healthcare': '🏥', 'Денсаулық': '🏥',
	'Fuqarolik': '🪪', 'Гражданство': '🪪', 'Citizenship': '🪪',
	'Kommunal': '🔌', 'Коммунал': '🔌', 'Utilities': '🔌',
	'Ijtimoiy': '🤝', 'Социальная': '🤝', 'Social': '🤝', 'Әлеуметтік': '🤝',
	'Subsidiya': '💰', 'Субсидия': '💰', 'Subsidy': '💰',
	'Iqtisodiyot': '📈', 'Экономика': '📈', 'Economy': '📈',
};

function getCategoryIcon(category) {
	if (!category) return '📄';
	for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
		if (category.includes(key)) return icon;
	}
	return '📄';
}

const SUCCESS_TEXT = {
	uz: { title: 'Ariza muvaffaqiyatli yuborildi!', sub: 'Xizmat 3-5 ish kuni ichida ko\'rib chiqiladi. Natija SMS va email orqali yuboriladi.', ref: 'Ariza raqami' },
	ru: { title: 'Заявление успешно подано!', sub: 'Ваше заявление будет рассмотрено в течение 3–5 рабочих дней. Результат придёт по SMS и email.', ref: 'Номер заявки' },
	en: { title: 'Application submitted!', sub: 'Your application will be reviewed within 3–5 business days. Result will be sent via SMS and email.', ref: 'Reference number' },
	kk: { title: 'Өтінім сәтті жіберілді!', sub: 'Өтініміңіз 3-5 жұмыс күні ішінде қаралады. Нәтиже SMS және email арқылы жіберіледі.', ref: 'Өтінім нөмірі' },
};

export default function ServiceModal({ service, open, onClose }) {
	const { lang, t } = useLanguage();
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [phone, setPhone] = useState('+998901234567');

	const icon = getCategoryIcon(service?.category);
	const refNumber = `GOV-${Date.now().toString().slice(-7)}`;
	const successMsg = SUCCESS_TEXT[lang] || SUCCESS_TEXT.en;

	const handleClose = () => {
		setSubmitted(false);
		setLoading(false);
		onClose();
	};

	const handleSubmit = async () => {
		setLoading(true);
		await new Promise(r => setTimeout(r, 1400));
		setLoading(false);
		setSubmitted(true);
	};

	if (!service) return null;

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-lg rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-0 shadow-hover">
				<AnimatePresence mode="wait">
					{submitted ? (
						<motion.div
							key="success"
							initial={{ opacity: 0, scale: 0.97 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							className="flex flex-col items-center gap-4 px-8 py-10 text-center"
						>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
								<PartyPopper className="h-9 w-9 text-[var(--color-primary)]" />
							</div>
							<h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{successMsg.title}</h2>
							<p className="text-sm text-[var(--color-text-secondary)]">{successMsg.sub}</p>
							<div className="rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] px-5 py-3">
								<p className="text-[11px] text-[var(--color-text-secondary)]">{successMsg.ref}</p>
								<p className="font-mono text-sm font-semibold text-[var(--color-text-primary)]">{refNumber}</p>
							</div>
							<Button onClick={handleClose} className="w-full rounded-[var(--radius-sm)] font-semibold">
								{t.close || 'Close'}
							</Button>
						</motion.div>
					) : (
						<motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<div className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-6 pb-4 pt-6">
								<div className="flex items-start gap-4">
									<div className="text-4xl">{icon}</div>
									<div className="flex-1">
										<DialogHeader>
											<DialogTitle className="text-base font-semibold text-[var(--color-text-primary)]">
												{service.name}
											</DialogTitle>
											<DialogDescription className="text-xs text-[var(--color-text-secondary)]">
												{service.org}
											</DialogDescription>
										</DialogHeader>
									</div>
								</div>
							</div>

							<div className="space-y-3 px-6 py-5">
								<div className="space-y-1.5">
									<Label className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
										<User className="mr-1 inline h-3 w-3" /> {t.fullName}
									</Label>
									<Input value="Alisher Toshmatov" readOnly className="rounded-[var(--radius-md)] bg-[var(--color-surface-alt)]" />
								</div>
								<div className="space-y-1.5">
									<Label className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
										<Hash className="mr-1 inline h-3 w-3" /> {t.pinfl}
									</Label>
									<Input value="32405680100234" readOnly className="rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] font-mono" />
								</div>
								<div className="space-y-1.5">
									<Label className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
										<MapPin className="mr-1 inline h-3 w-3" /> {t.address}
									</Label>
									<Input value={t.addressVal} readOnly className="rounded-[var(--radius-md)] bg-[var(--color-surface-alt)]" />
								</div>
								<div className="space-y-1.5">
									<Label className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
										<Phone className="mr-1 inline h-3 w-3" /> {t.phone}
									</Label>
									<Input value={phone} onChange={e => setPhone(e.target.value)} className="rounded-[var(--radius-md)]" />
								</div>

								<div className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] px-4 py-2 text-xs font-semibold text-[var(--color-primary-dark)]">
									<CheckCircle2 className="h-4 w-4" />
									{t.autoFilled}
								</div>
							</div>

							<div className="flex gap-2 px-6 pb-6">
								<Button variant="secondary" onClick={handleClose} className="rounded-[var(--radius-sm)] px-5" disabled={loading}>
									{t.cancel}
								</Button>
								<Button onClick={handleSubmit} className="flex-1 rounded-[var(--radius-sm)]" disabled={loading}>
									{loading
										? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												{lang === 'ru' ? 'Отправка...' : lang === 'en' ? 'Sending...' : lang === 'kk' ? 'Жиберилуде...' : 'Yuborilmoqda...'}
											</>
										)
										: t.submit
									}
								</Button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
}
