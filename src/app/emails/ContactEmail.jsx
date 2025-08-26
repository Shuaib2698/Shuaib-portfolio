// emails/ContactEmail.jsx
import * as React from "react";
import { Html, Body, Container, Text } from "@react-email/components";

export default function ContactEmail({ email, subject, message }) {
  return (
    <Html>
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            New Portfolio Message
          </Text>
          <Text><strong>From:</strong> {email}</Text>
          <Text><strong>Subject:</strong> {subject}</Text>
          <Text><strong>Message:</strong></Text>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
