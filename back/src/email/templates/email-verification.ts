export const registerVerificationTemplate = (name: string, url: string) => {
  return `<p>Hey ${name},</p>
    <p>Please click below to confirm your email</p>
    <p>
    <a href="${url}">Confirm</a>
    </p>

    <p>If you did not request this email you can safely ignore it.</p>`;
};
