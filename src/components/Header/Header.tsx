import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLenisContext } from '../../hooks/useLenis';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Header.module.css';

const SECTION_IDS = ['how', 'planner', 'route', 'prices', 'mumbai', 'faq'];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollTo, stop, start } = useLenisContext();
  const activeSection = useActiveSection(SECTION_IDS);

  // Scroll direction detection for show/hide header
  useEffect(() => {
    const SCROLL_THRESHOLD = 24; // Threshold to prevent micro-jitters / clicks from toggling header

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isOpen) return; // Keep visible if menu is open

      if (currentScrollY <= 80) {
        setHidden(false);
      } else if (
        currentScrollY > 100 &&
        currentScrollY > lastScrollYRef.current + SCROLL_THRESHOLD
      ) {
        setHidden(true);
      } else if (currentScrollY < lastScrollYRef.current - SCROLL_THRESHOLD) {
        setHidden(false);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Mobile menu open / close handling
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove('menu-open');
    start();
  }, [start]);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('menu-open');
        stop();
        setTimeout(() => {
          navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
        }, 50);
      } else {
        document.body.classList.remove('menu-open');
        start();
      }
      return next;
    });
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();
    const isMobile = window.innerWidth <= 680;
    const offset = isMobile ? -72 : -86;
    scrollTo(targetId, offset);
  };

  return (
    <header className={`${styles.siteNav} ${hidden ? styles.siteNavHidden : ''}`} id="top">
      <div className={`wrap ${styles.navInner}`}>
        <a
          className={styles.brand}
          href="#top"
          aria-label="PEG home"
          onClick={(e) => handleNavClick(e, '#top')}
        >
          <span className={styles.brandMark} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M7 19V5h6.1c3.2 0 5.1 1.6 5.1 4.3s-1.9 4.4-5.1 4.4H9.9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
          PEG <small>THE NIGHT GUIDE · WORKING TITLE</small>
        </a>

        <button
          ref={menuButtonRef}
          className={styles.menuToggle}
          id="menu-toggle"
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="primary-nav"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {isOpen ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        <nav
          ref={navRef}
          className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}
          id="primary-nav"
          aria-label="Primary navigation"
        >
          <a
            href="#how"
            aria-current={activeSection === 'how' ? 'true' : undefined}
            onClick={(e) => handleNavClick(e, '#how')}
          >
            How it works
          </a>
          <a
            href="#planner"
            aria-current={activeSection === 'planner' ? 'true' : undefined}
            onClick={(e) => handleNavClick(e, '#planner')}
          >
            Plan a night
          </a>
          <a
            href="#route"
            aria-current={activeSection === 'route' ? 'true' : undefined}
            onClick={(e) => handleNavClick(e, '#route')}
          >
            The route
          </a>
          <a
            href="#prices"
            aria-current={activeSection === 'prices' ? 'true' : undefined}
            onClick={(e) => handleNavClick(e, '#prices')}
          >
            Prices
          </a>
          <a
            href="#mumbai"
            aria-current={activeSection === 'mumbai' ? 'true' : undefined}
            onClick={(e) => handleNavClick(e, '#mumbai')}
          >
            Mumbai
          </a>
          <a
            href="#faq"
            aria-current={activeSection === 'faq' ? 'true' : undefined}
            onClick={(e) => handleNavClick(e, '#faq')}
          >
            FAQ
          </a>
          <a
            className={styles.navButton}
            href="#planner"
            onClick={(e) => handleNavClick(e, '#planner')}
          >
            Explore a sample plan <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
