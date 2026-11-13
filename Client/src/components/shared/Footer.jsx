import React from 'react';
import { Link } from 'react-router-dom';
import { footerColumns } from '@/data/infoPages';
import { SITE_NAME, SOCIAL_LINKS } from '@/data/siteConfig';
import { AvailableBadge } from '../services/ServiceList';
import Logo from './Logo';

const socialIcons = [
    {
        key: 'facebook',
        label: 'Facebook',
        path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94z',
    },
    {
        key: 'instagram',
        label: 'Instagram',
        path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
    },
    {
        key: 'x',
        label: 'X (Twitter)',
        path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z',
    },
    {
        key: 'linkedin',
        label: 'LinkedIn',
        path: 'M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z',
    },
];

const scrollTop = () => window.scrollTo(0, 0);

const Footer = () => {
    return (
        <footer className="border-t border-t-gray-200 dark:border-t-white/10 bg-white dark:bg-[oklch(0.12_0.02_278)] pt-12 pb-4 mt-10">
            <div className="container mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_3fr]">

                    {/* brand + social */}
                    <div>
                        <Link to="/" onClick={scrollTop} className="inline-flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
                            <Logo size="lg" />
                        </Link>
                        <p className="mt-3 max-w-xs text-sm text-gray-600 dark:text-gray-400">
                            Search, apply and get your dream job. Free resume samples and career services in one place.
                        </p>

                        <h3 className="mt-6 font-semibold">Connect with us</h3>
                        <div className="mt-3 flex items-center gap-4">
                            {
                                socialIcons
                                    .filter((icon) => SOCIAL_LINKS[icon.key])
                                    .map((icon) => (
                                        <a
                                            key={icon.key}
                                            href={SOCIAL_LINKS[icon.key]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={icon.label}
                                            title={icon.label}
                                            className="text-slate-500 transition-colors hover:text-[#6A38C2] dark:text-gray-400 dark:hover:text-[#a78bfa]"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={icon.path} /></svg>
                                        </a>
                                    ))
                            }
                        </div>
                    </div>

                    {/* link columns */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                        {
                            footerColumns.map((column, index) => (
                                <ul key={index} className="flex flex-col gap-3.5">
                                    {
                                        column.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    to={link.to}
                                                    onClick={scrollTop}
                                                    className={
                                                        link.available
                                                            ? 'inline-flex flex-wrap items-center gap-1.5 font-bold text-foreground hover:text-[#6A38C2] dark:hover:text-[#a78bfa]'
                                                            : 'text-gray-800 transition-colors hover:text-[#6A38C2] dark:text-gray-300 dark:hover:text-[#a78bfa]'
                                                    }
                                                >
                                                    {link.label}
                                                    {link.available && <AvailableBadge />}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ))
                        }
                    </div>
                </div>

                <div className='mt-10 border-t border-gray-200 pt-4 text-center dark:border-white/10'>
                    <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} {SITE_NAME} -  Made with Love ❤️. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
