import { Schema } from '@/hooks/useSchema';

export function getTemplates(): Record<string, Schema> {
  return {
    form: {
      type: 'form',
      title: 'Contact Form',
      fields: [
        {
          label: 'Name',
          type: 'text',
          name: 'name',
          required: true,
          placeholder: 'Enter your name'
        },
        {
          label: 'Email',
          type: 'email',
          name: 'email',
          required: true,
          placeholder: 'your@email.com'
        },
        {
          label: 'Message',
          type: 'textarea',
          name: 'message',
          required: true,
          placeholder: 'Enter your message...'
        }
      ],
      submitText: 'Send Message',
      onSubmit: "if (!values.name || !values.email || !values.message) return 'All fields are required'; return 'success';"
    },
    text: {
      type: 'text',
      title: 'About Us',
      content: 'This is a sample text block with rich content. You can customize the title and content through the JSON schema.\n\nThis component supports multiple paragraphs and maintains proper typography and spacing.'
    },
    image: {
      type: 'image',
      title: 'Feature Image',
      src: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
      alt: 'Modern workspace setup',
      caption: 'A clean and organized workspace setup that promotes productivity and creativity.'
    }
  };
}
