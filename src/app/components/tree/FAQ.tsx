import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: 'How do I know my tree was actually planted?',
    answer: 'Every tree gets a unique GPS coordinate and QR code. You can track it on your personal dashboard with monthly photo updates, AI verification, and field reports.'
  },
  {
    question: 'When will I receive my certificate?',
    answer: 'Your digital certificate is sent instantly to your email after successful payment. It includes your tree details, GPS location, and 80G tax benefit information.'
  },
  {
    question: 'How do I claim the 80G tax benefit?',
    answer: 'EcoTree is registered under Section 80G. Your certificate serves as proof for claiming tax deductions. Simply submit it while filing your income tax returns to claim up to 80% deduction.'
  },
  {
    question: 'Can I gift a tree to someone in another city?',
    answer: 'Yes! You can gift a tree to anyone, anywhere. The tree will be planted in our verified sites in Bangalore, and the recipient will get the certificate and tracking access via email.'
  },
  {
    question: 'What is the Miyawaki Mini Forest option?',
    answer: 'Miyawaki is a Japanese technique that creates dense, native forests 10x faster. Our mini forest includes 30+ native species planted in a small area, creating a biodiverse ecosystem that grows rapidly.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-16 max-w-3xl mx-auto">
      <div className="text-center mb-3">
        <p className="text-[#2C5F2D] text-sm font-semibold uppercase tracking-wide mb-2">
          Q&A
        </p>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        Questions about donating
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
              <span className="text-[#2C5F2D] text-2xl font-light flex-shrink-0">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
