
export const genearetGeneralJSONLD = () => (`
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Person",
    "name":"amir houieh",
    "born": "1987-03-22",
    "email": "mailto:amir.houieh@gmail.com",
    "image": "https://lh6.googleusercontent.com/-jHCMXjVi6KQ/AAAAAAAAAAI/AAAAAAAAAAA/DjqELgbiOuo/s128-c-k/photo.jpg",
    "jobTitle": "Design Technologist",
    "contactPoint": {
      "@type": "ContactPoint",
      "availableLanguage": ["English"]
    },
      "sameAs": [
          "https://www.linkedin.com/in/amirhouieh",
          "https://github.com/amirhouieh",
          "https://vimeo.com/user13046302",
          "https://twitter.com/amirhouieh"
    ]
  }
</script>`);
