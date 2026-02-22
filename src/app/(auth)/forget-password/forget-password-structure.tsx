'use client';

import React, { useState } from 'react';
import EmailStep from './_components/email-step';
import VerifyStep from './_components/verify-step';
import ResetPasswordStep from './_components/reset-password-step';

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>('');
  const [step, setStep] = useState<'email' | 'verify' | 'createPassword'>('email');
  return (
    <>
      {step == 'email' && <EmailStep setEmail={setEmail} setStep={setStep} />}
      {step == 'verify' && <VerifyStep setStep={setStep} email={email} />}
      {step == 'createPassword' && <ResetPasswordStep email={email} />}
    </>
  );
}
