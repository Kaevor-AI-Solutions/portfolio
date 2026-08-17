/**
 * Shape of the contact form's result state.
 *
 * Kept out of ./actions.ts on purpose: that file carries the `use server` directive, and
 * such a file may only export async functions — a constant exported from it is registered
 * as a server action and blows up at module evaluation.
 */
export type EnquiryState = {
  status: 'idle' | 'ok' | 'error';
  message: string;
};

export const INITIAL_ENQUIRY_STATE: EnquiryState = { status: 'idle', message: '' };
