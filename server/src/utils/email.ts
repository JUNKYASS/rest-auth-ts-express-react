const sendEmailConfirmation = (toEmail: string, link: string) => {
  try {
    return { message: `We sent confirmation to ${toEmail}, please check your inbox` };
  } catch (e) {
    return { message: 'email is not sent', error: e };
  }
};