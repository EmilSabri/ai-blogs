//  Adding pages is super easy
//  Simply create the name and link, then associate a page component with it.
const nav_links = [
    { link: 'brain-fog', text: 'Brain Fog' },
    { link: 'supplements', text: 'Supplements' },
    { link: 'lifestyle-factors', text: 'Lifestyle Factors' },
    { link: 'user-stories', text: 'User Stories' },
    { link: 'causes', text: 'Causes' },
]

const footer_links = [
    { link: 'about', text: 'About' },
    { link: 'contact', text: 'Contact' },
    { link: 'privacy-policy', text: 'Privacy Policy' },
    { link: 'terms-of-service', text: 'Terms of Service' },
]

const combined = [...nav_links, ...footer_links]

export const siteLinks = {
    nav: nav_links,
    footer: footer_links,
    combined: combined,
}