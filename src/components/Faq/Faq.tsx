import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/faq';
import styles from './Faq.module.css';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(
    FAQ_ITEMS.find((item) => item.defaultOpen)?.id || null
  );

  const handleToggle = (id: string, isOpen: boolean) => {
    if (isOpen) {
      setOpenId(id);
    } else if (openId === id) {
      setOpenId(null);
    }
  };

  return (
    <section className={`section ${styles.faqSec}`} id="faq">
      <div className={`wrap ${styles.wrap}`}>
        <div>
          <h2 className="display">
            Fair <em className="serif">questions.</em>
          </h2>
        </div>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <details
                key={item.id}
                name="faq"
                open={isOpen}
                onToggle={(e) => {
                  const target = e.currentTarget;
                  handleToggle(item.id, target.open);
                }}
              >
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};
