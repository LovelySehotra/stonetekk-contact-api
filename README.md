# Email Service for Contact Picker API

This repository contains an email service built using Node.js, Express, and Nodemailer. The service is designed for use cases involving the **Contact Picker API** in web applications. It supports sending emails with customized templates and attachments, and includes proper validation and error handling.

---

## Features

- **Customizable Email Templates**: Easily modify email templates, including the footer section.
- **HTML Email Support**: Allows sending rich HTML emails with inline styles and embedded images.
- **Attachments**: Supports adding multiple attachments to emails.
- **Secure Email Delivery**: Configured to use Gmail's SMTP server with TLS.
- **Validation**: Validates essential fields like recipient email (`to`) and subject.
- **Error Handling**: Comprehensive error handling for better debugging and reliability.

---

## Prerequisites

1. Node.js installed on your system.
2. A Gmail account for sending emails.
3. Ensure less secure apps access is enabled for the Gmail account or configure an app password.

---

## Setup

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <repository_name>
