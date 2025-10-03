import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Input } from 'components/Input';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useEffect, useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from 'utils/style';
import styles from './Contact.module.css';

export const Contact = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState('');
  const turnstileRef = useRef(null);
  const initDelay = tokens.base.durationS;

  // Load & render Turnstile widget (manual render to avoid duplicate auto-renders / error 600010)
  const widgetIdRef = useRef(null);
  useEffect(() => {
    const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    const envSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const fallbackKey = '0x4AAAAAAB4knujxF877PWoI';

    const renderWidget = () => {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      try {
        // Prefer explicit data-sitekey on the element (string), fallback to env or fallbackKey
        let siteKey =
          turnstileRef.current.getAttribute('data-sitekey') || envSiteKey || fallbackKey;
        if (typeof siteKey !== 'string') {
          console.warn('Turnstile siteKey not a string, coercing to string', siteKey);
          siteKey = String(siteKey);
        }

        // debug
        // console.debug('Initializing Turnstile with siteKey:', typeof siteKey, siteKey);

        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          theme: 'auto',
          callback: token => {
            setTurnstileToken(token);
            console.log('Verification completed ✅');
          },
          'error-callback': () => {
            console.log('Turnstile failed to load. Please reload the page.');
          },
          'expired-callback': () => {
            setTurnstileToken('');
            console.log('Verification expired. Please verify again.');
          },
        });
      } catch (err) {
        console.error('Turnstile render error', err);
        console.log('Unable to initialize verification.');
      }
    };

    // If script already present, just render
    if (document.querySelector(`script[src="${TURNSTILE_SRC}"]`)) {
      if (window.turnstile) {
        renderWidget();
      } else {
        // Wait a bit for script parse
        const id = setInterval(() => {
          if (window.turnstile) {
            clearInterval(id);
            renderWidget();
          }
        }, 50);
        setTimeout(() => clearInterval(id), 5000);
      }
      return;
    }

    // Inject script
    const script = document.createElement('script');
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    script.onerror = () => setStatus('Failed to load Turnstile script.');
    document.head.appendChild(script);

    // No cleanup removing script to allow caching across navigations
  }, []);

  // Reset Turnstile widget after successful submission
  useEffect(() => {
    if (complete && window.turnstile && widgetIdRef.current !== null) {
      try {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken('');
        setStatus('');
      } catch (e) {
        console.warn('Unable to reset Turnstile widget', e);
      }
    }
  }, [complete]);

  const onSubmit = async event => {
    event.preventDefault();
    console.log('Form submitted:', formData, turnstileToken);

    if (sending) return;

    if (!turnstileToken) {
      setStatus('Please complete the Turnstile verification.');
      console.log('Please complete the Turnstile verification.');
      return;
    }

    try {
      setSending(true);
      console.log('Submitting...');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const result = await response.json();

      if (response.ok) {
        setComplete(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus('Message sent successfully!');
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  const handleNameChange = e => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
  };
  const handleSubjectChange = e => {
    setFormData(prev => ({ ...prev, subject: e.target.value }));
  };
  const handleEmailChange = e => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  };
  const handleMessageChange = e => {
    setFormData(prev => ({ ...prev, message: e.target.value }));
  };

  return (
    <Section id="contact" className={styles.contact}>
      <Meta
        title="Contact"
        description="Reach out to us for inquiries, collaborations, or support."
      />
      <Transition unmount in={!complete} timeout={1600}>
        {(visible, status) => (
          <form className={styles.form} ref={form} onSubmit={onSubmit}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Get in Touch" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              name="name"
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="name"
              label="Your Name"
              type="text"
              maxLength={100}
              value={formData.name}
              onChange={handleNameChange}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              name="subject"
              style={getDelay(tokens.base.durationXS, initDelay, 0.05)}
              autoComplete="off"
              label="Subject"
              type="text"
              maxLength={200}
              value={formData.subject}
              onChange={handleSubjectChange}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              name="email"
              style={getDelay(tokens.base.durationS, initDelay, 0.1)}
              autoComplete="email"
              label="Your Email"
              type="email"
              maxLength={512}
              value={formData.email}
              onChange={handleEmailChange}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay, 0.2)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={4096}
              value={formData.message}
              onChange={handleMessageChange}
            />
            <br />
            <br />
            <div
              ref={turnstileRef}
              data-turnstile="true"
              data-sitekey={
                process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAB4knujxF877PWoI'
              }
            />
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send Message
            </Button>
          </form>
        )}
      </Transition>
      <Transition unmount in={complete}>
        {(visible, status) => (
          <div className={styles.complete} aria-live="polite">
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              Thank you for reaching out! We'll get back to you as soon as possible.
            </Text>
          </div>
        )}
      </Transition>
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
