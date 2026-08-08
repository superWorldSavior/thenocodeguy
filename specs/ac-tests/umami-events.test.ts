import { afterEach, describe, expect, it, vi } from 'vitest';

import { trackUmamiEvent } from '../../lib/umami';

describe('trackUmamiEvent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false when Umami is unavailable', () => {
    vi.stubGlobal('window', {});

    expect(trackUmamiEvent('booking_opened')).toBe(false);
  });

  it('sends the event name and payload when window.umami.track exists', () => {
    const track = vi.fn();
    vi.stubGlobal('window', {
      umami: {
        track,
      },
    });

    expect(
      trackUmamiEvent('contact_form_submit', {
        formId: 'contact',
        locale: 'fr',
      })
    ).toBe(true);

    expect(track).toHaveBeenCalledWith('contact_form_submit', {
      formId: 'contact',
      locale: 'fr',
    });
  });
});
