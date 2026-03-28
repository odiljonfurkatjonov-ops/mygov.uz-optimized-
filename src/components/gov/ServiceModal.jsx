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
	'Ko\'chmas': '🏠', 'Недвижим': '🏠', 'Real Estate': '🏠',
	'Mehnat': '💼', 'Труд': '💼', 'Labour': '💼',
	'Sog\'liq': '🏥', 'Здравоохр': '🏥', 'Healthcare': '🏥', 'Денсаулық': '🏥',
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
	uz: { title: "Ariza muvaffaqiyatli yuborildi!", sub: "Xizmat 3-5 ish kuni ichida ko'rib chiqiladi. Natija SMS va email orqali yuboriladi.", ref: "Ariza raqami" },
	ru: { title: "Заявление успешно подано!", sub: "Ваше заявление будет рассмотрено в течение 3–5 рабочих дней. Результат придёт по SMS и email.", ref: "Номер заявки" },
	en: { title: "Application submitted!", sub: "Your application will be reviewed within 3–5 business days. Result will be sent via SMS and email.", ref: "Reference number" },
	kk: { title: "Өтінім сәтті жіберілді!", sub: "Өтініміңіз 3-5 жұмыс күні ішінде қаралады. Нәтиже SMS және email арқылы жіберіледі.", ref: "Өтінім нөмірі" },
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
			<DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
				<AnimatePresence mode="wait">
					{submitted ? (
						<motion.div
							key="success"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							className="flex flex-col items-center text-center px-8 py-12 gap-4"
						>
							<div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
								<PartyPopper className="w-9 h-9 text-emerald-500" />
							</div>
							<h2 className="text-xl font-extrabold text-foreground">{successMsg.title}</h2>
							<p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{successMsg.sub}</p>
							<div className="bg-muted rounded-2xl px-5 py-3 mt-2">
								<p className="text-[11px] text-muted-foreground mb-0.5">{successMsg.ref}</p>
								<p className="font-mono font-bold text-foreground">{refNumber}</p>
							</div>
							<Button onClick={handleClose} className="rounded-full w-full mt-2 font-bold">
								{t.cancel === 'Bekor qilish' ? 'Yopish' : t.cancel === 'Отмена' ? 'Закрыть' : t.cancel === 'Болдырмау' ? 'Жабу' : 'Close'}
							</Button>
						</motion.div>
					) : (
						<motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							{/* Header */}
							<div className="px-6 pt-6 pb-4 border-b border-border bg-gradient-to-br from-accent/60 to-white">
								<div className="flex items-start gap-4">
									<div className="text-4xl mt-0.5">{icon}</div>
									<div className="flex-1">
										<DialogHeader>
											<DialogTitle className="text-base font-bold text-foreground leading-tight text-left">
												{service.name}
											</DialogTitle>
											<DialogDescription className="text-xs text-muted-foreground text-left mt-1 font-medium">
												{service.org}
											</DialogDescription>
										</DialogHeader>
									</div>
								</div>
							</div>

							{/* Form */}
							<div className="px-6 py-5 space-y-3.5">
								<div className="space-y-1.5">
									<Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
										<User className="w-3 h-3" /> {t.fullName}
									</Label>
									<Input
										value="Alisher Toshmatov"
										className="rounded-2xl bg-muted/60 border-transparent font-medium text-sm"
										readOnly
									/>
								</div>
								<div className="space-y-1.5">
									<Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
										<Hash className="w-3 h-3" /> {t.pinfl}
									</Label>
									<Input
										value="32405680100234"
										className="rounded-2xl bg-muted/60 border-transparent font-medium text-sm font-mono"
										readOnly
									/>
								</div>
								<div className="space-y-1.5">
									<Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
										<MapPin className="w-3 h-3" /> {t.address}
									</Label>
									<Input
										value={t.addressVal}
										className="rounded-2xl bg-muted/60 border-transparent font-medium text-sm"
										readOnly
									/>
								</div>
								<div className="space-y-1.5">
									<Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
										<Phone className="w-3 h-3" /> {t.phone}
									</Label>
									<Input
										value={phone}
										onChange={e => setPhone(e.target.value)}
										className="rounded-2xl font-medium text-sm"
									/>
								</div>

								<div className="bg-emerald-50 rounded-2xl px-4 py-2.5 flex items-center gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
									<span className="text-xs font-medium text-emerald-700">{t.autoFilled}</span>
								</div>
							</div>

							{/* Footer */}
							<div className="px-6 pb-6 pt-1 flex gap-2">
								<Button
									variant="secondary"
									onClick={handleClose}
									className="rounded-full font-semibold px-5"
									disabled={loading}
								>
									{t.cancel}
								</Button>
								<Button
									onClick={handleSubmit}
									className="rounded-full font-bold flex-1"
									disabled={loading}
								>
									{loading
										? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {lang === 'ru' ? 'Отправка...' : lang === 'en' ? 'Sending...' : lang === 'kk' ? 'Жіберілуде...' : 'Yuborilmoqda...'}</>
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