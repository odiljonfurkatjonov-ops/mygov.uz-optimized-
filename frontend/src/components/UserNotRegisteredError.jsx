import React from 'react';

const UserNotRegisteredError = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
			<div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 shadow-card">
				<div className="text-center">
					<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
						<svg className="h-8 w-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
					</div>
					<h1 className="font-display text-2xl font-semibold text-[var(--color-text-primary)]">Access Restricted</h1>
					<p className="mt-3 text-sm text-[var(--color-text-secondary)]">
						You are not registered to use this application. Please contact the app administrator to request access.
					</p>
					<div className="mt-6 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] p-4 text-left text-sm text-[var(--color-text-secondary)]">
						<p className="font-semibold text-[var(--color-text-primary)]">If you believe this is an error:</p>
						<ul className="mt-2 list-disc space-y-1 pl-5">
							<li>Verify you are logged in with the correct account</li>
							<li>Contact the app administrator for access</li>
							<li>Try logging out and back in again</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserNotRegisteredError;
